import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ParentService } from '../../../../core/services/parent.service';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticService extends ParentService {

  // analyzeImage(image: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('image', image);
    
  //   // Simulation de réponse complète
  //   return of({
  //     id: "f2eba6ee-56fd-4bcd-9a3f-f07c0941b2cb",
  //     imageId: "f2eba6ee-56fd-4bcd-9a3f-f07c0941b2cb",
  //     userId: "3474057e-36a3-4f3e-af18-1ec8cef13a41",
  //     analysisResult: {
  //       subject: {
  //         subjectType: "PEST",
  //         description: "Punaise grise",
  //         confidence: 0.95
  //       },
  //       detections: [
  //         {
  //           className: "Punaise grise",
  //           confidenceScore: 0.9,
  //           severity: "MEDIUM",
  //           boundingBox: {
  //             x_min: 0.25,
  //             y_min: 0.2,
  //             x_max: 0.75,
  //             y_max: 0.8
  //           },
  //           details: {
  //             description: "La punaise grise est un insecte suceur de sève qui peut causer des dommages importants aux cultures.",
  //             impact: "Dommages aux cultures, transmission potentielle de maladies.",
  //             recommendations: {
  //               biological: [
  //                 {
  //                   solution: "Introduction de prédateurs naturels",
  //                   details: "Certaines espèces de guêpes parasitoïdes peuvent aider à contrôler les populations de punaises grises.",
  //                   source: "https://www.example.com/predateurs"
  //                 },
  //                 {
  //                   solution: "Pièges à phéromones",
  //                   details: "Installation de pièges pour surveiller et réduire la population.",
  //                   source: "https://www.example.com/pheromones"
  //                 }
  //               ],
  //               chemical: [
  //                 {
  //                   solution: "Application d'insecticides",
  //                   details: "Utiliser des produits à base de deltaméthrine ou de lambda-cyhalothrine.",
  //                   dosage: "2.5 ml/L d'eau",
  //                   precautions: "Portez des équipements de protection. Ne pas appliquer pendant la floraison.",
  //                   source: "https://www.example.com/insecticides"
  //                 }
  //               ],
  //               cultural: [
  //                 {
  //                   solution: "Rotation des cultures",
  //                   details: "Alterner avec des cultures non-hôtes pour briser le cycle de reproduction.",
  //                   source: "https://www.example.com/rotation"
  //                 },
  //                 {
  //                   solution: "Nettoyage des résidus",
  //                   details: "Éliminer les débris végétaux après récolte pour réduire les sites d'hivernage.",
  //                   source: "https://www.example.com/nettoyage"
  //                 }
  //               ]
  //             },
  //             knowledgeBaseTags: [
  //               "punaise grise",
  //               "insecte",
  //               "ravageur",
  //               "agriculture",
  //               "culture",
  //               "dommages",
  //               "contrôle biologique",
  //               "insecticides",
  //               "prédateurs naturels",
  //               "rotation des cultures"
  //             ]
  //           }
  //         }
  //       ]
  //     },
  //     createdAt: "2025-07-19T22:20:28.855Z",
  //     detections: [
  //       {
  //         id: "a3a1d334-9269-4f5f-a95a-7f84f3b065ff",
  //         bbox: {
  //           x_max: 0.75,
  //           x_min: 0.25,
  //           y_max: 0.8,
  //           y_min: 0.2
  //         },
  //         precision: 0.9,
  //         type: "PEST",
  //         date: "2025-07-19T22:20:30.479Z"
  //       }
  //     ]
  //   }).pipe(delay(2000)); // Simulation de délai réseau
  // }

    analyzeImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', image);


    return this.postData('analyseImage/analyze', formData);
  }

  // getHistory(): Observable<any[]> {
  //   return of([
  //     {
  //       id: "f2eba6ee-56fd-4bcd-9a3f-f07c0941b2cb",
  //       url: "assets/images/sample-pest.jpg", // Chemin vers une image d'exemple
  //       timestamp: "2025-07-19T22:20:28.855Z",
  //       type: "PEST",
  //       detections: [
  //         {
  //           id: "a3a1d334-9269-4f5f-a95a-7f84f3b065ff",
  //           bbox: {
  //             x_max: 0.75,
  //             x_min: 0.25,
  //             y_max: 0.8,
  //             y_min: 0.2
  //           },
  //           precision: 0.9,
  //           type: "PEST",
  //           date: "2025-07-19T22:20:30.479Z",
  //           diseaseName: "Punaise grise",
  //           severity: "MEDIUM"
  //         }
  //       ],
  //       analysisResult: { // Ajout pour cohérence avec le modal
  //         subject: {
  //           description: "Punaise grise",
  //           confidence: 0.9
  //         },
  //         detections: [{
  //           severity: "MEDIUM",
  //           details: {
  //             description: "Insecte suceur de sève affectant les cultures",
  //             recommendations: {
  //               biological: [{
  //                 solution: "Prédateurs naturels",
  //                 details: "Utiliser des guêpes parasitoïdes"
  //               }],
  //               chemical: [{
  //                 solution: "Insecticide",
  //                 details: "Deltaméthrine 2.5ml/L",
  //                 dosage: "2.5 ml par litre d'eau"
  //               }],
  //               cultural: [{
  //                 solution: "Rotation des cultures",
  //                 details: "Alterner avec des cultures non-hôtes"
  //               }]
  //             }
  //           }
  //         }]
  //       }
  //     },
  //     {
  //       id: "b3ccb6ee-12fd-4acd-8b2f-g07d0941c3db",
  //       url: "assets/images/sample-fungus.jpg",
  //       timestamp: "2025-07-18T15:30:12.123Z",
  //       type: "FUNGUS",
  //       detections: [
  //         {
  //           id: "b4dd1e44-8379-5g6f-b95b-8g94f4c065gg",
  //           bbox: {
  //             x_max: 0.8,
  //             x_min: 0.3,
  //             y_max: 0.7,
  //             y_min: 0.1
  //           },
  //           precision: 0.85,
  //           type: "FUNGUS",
  //           date: "2025-07-18T15:32:45.321Z",
  //           diseaseName: "Mildiou",
  //           severity: "HIGH"
  //         }
  //       ],
  //       analysisResult: {
  //         subject: {
  //           description: "Mildiou",
  //           confidence: 0.85
  //         },
  //         detections: [{
  //           severity: "HIGH",
  //           details: {
  //             description: "Champignon affectant les feuilles et fruits",
  //             recommendations: {
  //               biological: [{
  //                 solution: "Bouillie bordelaise",
  //                 details: "Application préventive"
  //               }],
  //               chemical: [{
  //                 solution: "Fongicide systémique",
  //                 details: "Application curative",
  //                 dosage: "3 ml par litre d'eau"
  //               }],
  //               cultural: [{
  //                 solution: "Espacement des plants",
  //                 details: "Améliorer la circulation d'air"
  //               }]
  //             }
  //           }
  //         }]
  //       }
  //     }
  //   ]);
  // }

  getHistory(): Observable<any[]> {
    return this.getData('analyseImage/history');
  }
}