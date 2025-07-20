import { Component, OnInit } from '@angular/core';
import { DiagnosticService } from '../../service/diagnostic.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-diagnostic',
  imports: [CommonModule],
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.css']
})
export class DiagnosticComponent implements OnInit {
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  isLoading = false;
  history: any[] = [];
  showModal = false;
  currentResult: any = null;

  constructor(private diagnosticService: DiagnosticService) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  analyzeImage(): void {
    if (!this.selectedFile) return;
    
    this.isLoading = true;
    this.diagnosticService.analyzeImage(this.selectedFile).subscribe({
      next: (result) => {
        console.log(result);
        
        this.currentResult = result;
        this.showModal = true;
        this.loadHistory();
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  loadHistory(): void {
    this.diagnosticService.getHistory().subscribe(history => {
      this.history = history;
    });
  }

  closeModal(): void {
    this.showModal = false;
    this.currentResult = null;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  getSeverityColor(severity: string): string {
    switch(severity) {
      case 'HIGH': return 'bg-red-100 text-red-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'LOW': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  translateSeverity(severity: string): string {
    switch(severity) {
      case 'HIGH': return 'Élevée';
      case 'MEDIUM': return 'Moyenne';
      case 'LOW': return 'Faible';
      default: return severity;
    }
  }

viewDetails(item: any): void {
  // Transforme l'item historique en format compatible avec le modal
  this.currentResult = {
    analysisResult: {
      subject: {
        description: item.type,
        confidence: item.detections[0]?.precision || 0
      },
      detections: item.detections.map((detection: any) => ({
        severity: this.getSeverityFromType(item.type),
        details: {
          description: `Détection de ${item.type}`,
          recommendations: this.getDefaultRecommendations(item.type)
        }
      }))
    }
  };
  this.showModal = true;
}

private getSeverityFromType(type: string): string {
  // Logique pour déterminer la sévérité basée sur le type
  switch(type) {
    case 'PEST': return 'MEDIUM';
    case 'FUNGUS': return 'HIGH';
    default: return 'LOW';
  }
}

private getDefaultRecommendations(type: string): any {
  // Recommandations par défaut selon le type
  const base = {
    biological: [],
    chemical: [],
    cultural: []
  };

  switch(type) {
    case 'PEST':
      return {
        biological: [
          { solution: 'Prédateurs naturels', details: 'Introduire des insectes bénéfiques' }
        ],
        chemical: [
          { solution: 'Insecticide', details: 'Utiliser un insecticide approprié', dosage: 'Suivre instructions du produit' }
        ],
        cultural: [
          { solution: 'Rotation des cultures', details: 'Alterner avec des cultures non-hôtes' }
        ]
      };
    case 'PLANT':
      return {
        cultural: [
          { solution: 'Fertilisation', details: 'Apporter des nutriments adaptés' }
        ]
      };
    default:
      return base;
  }
}


}