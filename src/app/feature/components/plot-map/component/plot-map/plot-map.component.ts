import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import 'leaflet-draw';

interface Parcelle {
  id: number;
  nom: string;
  culture: string;
  surface?: number;
  dateCreation: string;
  historique: HistoriqueItem[];
  geometry: any;
}

interface HistoriqueItem {
  date: string;
  type: 'incident' | 'action' | 'observation';
  description: string;
  image?: string;
}

@Component({
  selector: 'app-plot-map',
  templateUrl: './plot-map.component.html',
  styleUrls: ['./plot-map.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PlotMapComponent implements OnInit, AfterViewInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  map: any;
  drawnItems: any;
  parcelles: Parcelle[] = [];
  selectedParcelle: Parcelle | null = null;

  // État du formulaire
  showForm = false;
  isDrawingMode = false;
  currentDrawnShape: any = null;

  // Nouvelle: Mode d'ajout
  modeAjout: 'manuel' | 'dessin' | 'coordonnees' | 'rectangle' = 'manuel';

  // Formulaire nouvelle parcelle
  nouvelleParcelle = {
    nom: '',
    culture: '',
    surface: 0,
    coordinates: [] as number[][][],
    // Coordonnées manuelles
    latitude: 14.692,
    longitude: -17.446,
    largeur: 100, // en mètres
    hauteur: 100  // en mètres
  };

  // Coordonnées textuelles
  coordonneesTexte = '';

  cultures = ['Mil', 'Riz', 'Arachide', 'Maïs', 'Tomate', 'Oignon', 'Autre'];

  ngOnInit(): void {
    this.parcelles = [
      {
        id: 1,
        nom: 'Parcelle A',
        culture: 'Mil',
        surface: 2.5,
        dateCreation: '2024-01-15',
        historique: [
          { date: '2024-03-10', type: 'observation', description: 'Croissance normale' },
          { date: '2024-02-20', type: 'action', description: 'Fertilisation effectuée' }
        ],
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [-17.455, 14.705], [-17.450, 14.705],
            [-17.450, 14.700], [-17.455, 14.700], [-17.455, 14.705]
          ]]
        }
      },
      {
        id: 2,
        nom: 'Parcelle B',
        culture: 'Riz',
        surface: 3.8,
        dateCreation: '2024-02-01',
        historique: [
          { date: '2024-03-15', type: 'incident', description: 'Ravageurs détectés - traitement appliqué' }
        ],
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [-17.460, 14.690], [-17.455, 14.690],
            [-17.455, 14.685], [-17.460, 14.685], [-17.460, 14.690]
          ]]
        }
      }
    ];
  }

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([14.692, -17.446], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    this.drawnItems = new L.FeatureGroup();
    this.map.addLayer(this.drawnItems);

    this.afficherParcelles();
    this.configurerDessin();

    // Géolocalisation de l'utilisateur
    this.map.on('click', (e: any) => {
      if (this.showForm && this.modeAjout === 'manuel') {
        this.nouvelleParcelle.latitude = e.latlng.lat;
        this.nouvelleParcelle.longitude = e.latlng.lng;
      }
    });
  }

  configurerDessin(): void {
    const drawControl = new L.Control.Draw({
      draw: {
        polygon: {
          shapeOptions: {
            color: '#3b82f6',
            weight: 3,
            fillOpacity: 0.3
          }
        },
        rectangle: {
          shapeOptions: {
            color: '#3b82f6',
            weight: 3,
            fillOpacity: 0.3
          }
        },
        marker: false,
        circle: false,
        circlemarker: false,
        polyline: false
      },
      edit: {
        featureGroup: this.drawnItems,
        remove: true
      }
    });

    this.map.addControl(drawControl);

    this.map.on(L.Draw.Event.CREATED, (event: any) => {
      const layer = event.layer;
      this.currentDrawnShape = layer;

      const geojson = layer.toGeoJSON();
      this.nouvelleParcelle.coordinates = geojson.geometry.coordinates;

      const surface = this.calculerSurface(geojson.geometry.coordinates[0]);
      this.nouvelleParcelle.surface = surface;

      this.drawnItems.addLayer(layer);
      this.modeAjout = 'dessin';
      this.showForm = true;
      this.isDrawingMode = true;
    });

    this.map.on(L.Draw.Event.EDITED, (event: any) => {
      const layers = event.layers;
      layers.eachLayer((layer: any) => {
        const geojson = layer.toGeoJSON();
        console.log('Parcelle modifiée:', geojson);
      });
    });
  }

  afficherParcelles(): void {
    this.drawnItems.clearLayers();

    this.parcelles.forEach(parcelle => {
      const layer = L.geoJSON(parcelle.geometry, {
        style: {
          color: this.getCouleurCulture(parcelle.culture),
          weight: 3,
          fillOpacity: 0.4
        }
      });

      layer.bindPopup(this.creerPopupHTML(parcelle));

      layer.on('click', () => {
        this.selectedParcelle = parcelle;
      });

      layer.addTo(this.drawnItems);
    });
  }

  getCouleurCulture(culture: string): string {
    const couleurs: {[key: string]: string} = {
      'Mil': '#f59e0b',
      'Riz': '#10b981',
      'Arachide': '#8b5cf6',
      'Maïs': '#fbbf24',
      'Tomate': '#ef4444',
      'Oignon': '#a855f7'
    };
    return couleurs[culture] || '#3b82f6';
  }

  creerPopupHTML(parcelle: Parcelle): string {
    return `
      <div style="font-family: sans-serif;">
        <h3 style="margin: 0 0 8px 0; color: #1f2937;">${parcelle.nom}</h3>
        <p style="margin: 4px 0;"><strong>Culture:</strong> ${parcelle.culture}</p>
        <p style="margin: 4px 0;"><strong>Surface:</strong> ${parcelle.surface} ha</p>
        <p style="margin: 4px 0;"><strong>Créée le:</strong> ${new Date(parcelle.dateCreation).toLocaleDateString('fr-FR')}</p>
      </div>
    `;
  }

  calculerSurface(coords: number[][]): number {
    let surface = 0;
    for (let i = 0; i < coords.length - 1; i++) {
      surface += coords[i][0] * coords[i + 1][1] - coords[i + 1][0] * coords[i][1];
    }
    return Math.abs(surface * 6378 / 2) / 10000;
  }

  // ========== NOUVELLES MÉTHODES D'AJOUT ==========

  ouvrirFormulaire(): void {
    this.showForm = true;
    this.modeAjout = 'manuel';
    this.isDrawingMode = false;
    this.resetFormulaire();
  }

  changerModeAjout(mode: 'manuel' | 'dessin' | 'coordonnees' | 'rectangle'): void {
    this.modeAjout = mode;

    if (mode === 'manuel' || mode === 'rectangle') {
      // Obtenir la position actuelle de la carte
      const center = this.map.getCenter();
      this.nouvelleParcelle.latitude = center.lat;
      this.nouvelleParcelle.longitude = center.lng;
      this.previsualiserParcelle();
    }
  }

  previsualiserParcelle(): void {
    // Supprimer l'ancienne prévisualisation
    if (this.currentDrawnShape) {
      this.drawnItems.removeLayer(this.currentDrawnShape);
    }

    if (this.modeAjout === 'manuel' || this.modeAjout === 'rectangle') {
      const coords = this.creerRectangleCoords(
        this.nouvelleParcelle.latitude,
        this.nouvelleParcelle.longitude,
        this.nouvelleParcelle.largeur,
        this.nouvelleParcelle.hauteur
      );

      this.nouvelleParcelle.coordinates = [coords];
      this.nouvelleParcelle.surface = (this.nouvelleParcelle.largeur * this.nouvelleParcelle.hauteur) / 10000;

      const layer = L.polygon(coords.map(c => [c[1], c[0]]), {
        color: '#3b82f6',
        weight: 3,
        fillOpacity: 0.3,
        dashArray: '5, 5'
      });

      this.currentDrawnShape = layer;
      layer.addTo(this.drawnItems);

      // Centrer la carte sur la nouvelle parcelle
      this.map.setView([this.nouvelleParcelle.latitude, this.nouvelleParcelle.longitude], 15);
    }
  }

  creerRectangleCoords(lat: number, lng: number, largeur: number, hauteur: number): number[][] {
    // Conversion approximative: 1 degré ≈ 111 km
    const latOffset = (hauteur / 2) / 111000;
    const lngOffset = (largeur / 2) / (111000 * Math.cos(lat * Math.PI / 180));

    return [
      [lng - lngOffset, lat + latOffset], // Nord-Ouest
      [lng + lngOffset, lat + latOffset], // Nord-Est
      [lng + lngOffset, lat - latOffset], // Sud-Est
      [lng - lngOffset, lat - latOffset], // Sud-Ouest
      [lng - lngOffset, lat + latOffset]  // Fermeture
    ];
  }

  utiliserPositionActuelle(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.nouvelleParcelle.latitude = position.coords.latitude;
          this.nouvelleParcelle.longitude = position.coords.longitude;
          this.previsualiserParcelle();
          this.showSuccessMessage('Position GPS obtenue !');
        },
        (error) => {
          alert('Impossible d\'obtenir votre position GPS');
        }
      );
    } else {
      alert('La géolocalisation n\'est pas supportée par votre navigateur');
    }
  }

  cliquerSurCarte(): void {
    alert('Cliquez maintenant sur la carte pour sélectionner la position centrale de votre parcelle');
  }

  // Méthode pour coordonnées textuelles (copier-coller)
  traiterCoordonneesTexte(): void {
    try {
      // Format attendu: lat1,lng1 lat2,lng2 lat3,lng3...
      // Ou: [[lng1,lat1],[lng2,lat2]...]

      let coords: number[][] = [];

      // Essayer de parser comme JSON
      if (this.coordonneesTexte.trim().startsWith('[')) {
        const parsed = JSON.parse(this.coordonneesTexte);
        coords = parsed;
      } else {
        // Parser format texte simple
        const points = this.coordonneesTexte.trim().split(/\s+/);
        coords = points.map(point => {
          const [lat, lng] = point.split(',').map(Number);
          return [lng, lat];
        });
      }

      if (coords.length < 3) {
        alert('Il faut au moins 3 points pour créer une parcelle');
        return;
      }

      // Fermer le polygone si nécessaire
      if (coords[0][0] !== coords[coords.length - 1][0] ||
        coords[0][1] !== coords[coords.length - 1][1]) {
        coords.push([...coords[0]]);
      }

      this.nouvelleParcelle.coordinates = [coords];
      this.nouvelleParcelle.surface = this.calculerSurface(coords);

      // Afficher sur la carte
      const layer = L.polygon(coords.map(c => [c[1], c[0]]), {
        color: '#3b82f6',
        weight: 3,
        fillOpacity: 0.3
      });

      if (this.currentDrawnShape) {
        this.drawnItems.removeLayer(this.currentDrawnShape);
      }

      this.currentDrawnShape = layer;
      layer.addTo(this.drawnItems);

      // Centrer la carte
      const bounds = layer.getBounds();
      this.map.fitBounds(bounds);

      this.showSuccessMessage('Coordonnées chargées avec succès !');

    } catch (error) {
      alert('Format de coordonnées invalide. Exemples:\n\n' +
        '14.705,-17.455 14.705,-17.450 14.700,-17.450\n\n' +
        'ou\n\n' +
        '[[-17.455,14.705],[-17.450,14.705],[-17.450,14.700]]');
    }
  }

  fermerFormulaire(): void {
    this.showForm = false;
    this.isDrawingMode = false;
    if (this.currentDrawnShape) {
      this.drawnItems.removeLayer(this.currentDrawnShape);
      this.currentDrawnShape = null;
    }
    this.resetFormulaire();
  }

  resetFormulaire(): void {
    this.nouvelleParcelle = {
      nom: '',
      culture: '',
      surface: 0,
      coordinates: [],
      latitude: 14.692,
      longitude: -17.446,
      largeur: 100,
      hauteur: 100
    };
    this.coordonneesTexte = '';
  }

  ajouterParcelle(): void {
    if (!this.nouvelleParcelle.nom || !this.nouvelleParcelle.culture) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (this.nouvelleParcelle.coordinates.length === 0) {
      alert('Veuillez définir la zone de la parcelle (via un des modes disponibles)');
      return;
    }

    const nouvelleParcelle: Parcelle = {
      id: this.parcelles.length + 1,
      nom: this.nouvelleParcelle.nom,
      culture: this.nouvelleParcelle.culture,
      surface: this.nouvelleParcelle.surface,
      dateCreation: new Date().toISOString(),
      historique: [{
        date: new Date().toISOString(),
        type: 'observation',
        description: 'Parcelle créée'
      }],
      geometry: {
        type: 'Polygon',
        coordinates: this.nouvelleParcelle.coordinates
      }
    };

    this.parcelles.push(nouvelleParcelle);
    this.afficherParcelles();
    this.fermerFormulaire();
    this.showSuccessMessage('Parcelle ajoutée avec succès !');
  }

  supprimerParcelle(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette parcelle ?')) {
      this.parcelles = this.parcelles.filter(p => p.id !== id);
      this.afficherParcelles();
      this.selectedParcelle = null;
      this.showSuccessMessage('Parcelle supprimée');
    }
  }

  ajouterHistorique(type: 'incident' | 'action' | 'observation'): void {
    if (!this.selectedParcelle) return;

    const description = prompt(`Ajouter un(e) ${type}:`);
    if (description) {
      this.selectedParcelle.historique.unshift({
        date: new Date().toISOString(),
        type: type,
        description: description
      });
      this.showSuccessMessage('Historique mis à jour');
    }
  }

  importerFichier(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.type === 'FeatureCollection') {
          this.importerGeoJSON(data);
        }
      } catch (error) {
        alert('Erreur lors de l\'importation du fichier');
      }
    };
    reader.readAsText(file);
  }

  importerGeoJSON(geojson: any): void {
    geojson.features.forEach((feature: any, index: number) => {
      const parcelle: Parcelle = {
        id: this.parcelles.length + index + 1,
        nom: feature.properties?.nom || `Parcelle ${this.parcelles.length + index + 1}`,
        culture: feature.properties?.culture || 'Non défini',
        surface: feature.properties?.surface || 0,
        dateCreation: new Date().toISOString(),
        historique: [],
        geometry: feature.geometry
      };
      this.parcelles.push(parcelle);
    });
    this.afficherParcelles();
    this.showSuccessMessage(`${geojson.features.length} parcelle(s) importée(s)`);
  }

  exporterGeoJSON(): void {
    const geojson = {
      type: 'FeatureCollection',
      features: this.parcelles.map(p => ({
        type: 'Feature',
        properties: {
          id: p.id,
          nom: p.nom,
          culture: p.culture,
          surface: p.surface,
          dateCreation: p.dateCreation
        },
        geometry: p.geometry
      }))
    };

    const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `parcelles_${new Date().toISOString().split('T')[0]}.geojson`;
    a.click();
  }

  showSuccessMessage(message: string): void {
    const div = document.createElement('div');
    div.textContent = message;
    div.style.cssText = `
      position: fixed; top: 20px; right: 20px; z-index: 10000;
      background: #10b981; color: white; padding: 16px 24px;
      border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      animation: slideIn 0.3s ease-out;
    `;
    document.body.appendChild(div);
    setTimeout(() => {
      div.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => div.remove(), 300);
    }, 3000);
  }
}
