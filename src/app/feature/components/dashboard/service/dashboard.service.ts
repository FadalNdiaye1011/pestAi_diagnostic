import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ParentService } from '../../../../core/services/parent.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends ParentService {
  getDashboardData(): Observable<any> {
    // TODO: Remplacer par l'appel API réel quand disponible
    return this.getData('dashboard/summary');
    
    // Simulation des données
    // return of({
    //   kpi: {
    //     totalDiagnostics: 4,
    //     cropDistribution: [
    //       { cropType: "PEST", count: 1, percentage: 25 },
    //       { cropType: "PLANT", count: 1, percentage: 25 },
    //       { cropType: "UNKNOWN", count: 2, percentage: 50 }
    //     ],
    //     analysisHistory: [
    //       { date: "2025-07-19", count: 3, detectionTypes: { PEST: 1 } },
    //       { date: "2025-07-20", count: 1, detectionTypes: { PLANT: 1 } }
    //     ],
    //     treatmentStats: [
    //       { cropType: "PEST", recommendedTreatments: 52, appliedTreatments: 32, efficacyRate: 83 },
    //       { cropType: "UNKNOWN", recommendedTreatments: 39, appliedTreatments: 7, efficacyRate: 93 },
    //       { cropType: "PLANT", recommendedTreatments: 17, appliedTreatments: 11, efficacyRate: 87 }
    //     ]
    //   },
    //   stats: {
    //     diseaseDistribution: [
    //       { type: "PEST", name: "PEST", count: 1, percentage: 50, averageSeverity: "HIGH" },
    //       { type: "PLANT", name: "PLANT", count: 1, percentage: 50, averageSeverity: "HIGH" }
    //     ],
    //     monthlyTrends: [
    //       { date: "2025-07", count: 4, detectionTypes: { PEST: 1, PLANT: 1 } }
    //     ],
    //     seasonalTrends: [
    //       { date: "Été", count: 4, detectionTypes: { PEST: 1, PLANT: 1 } }
    //     ],
    //     performanceMetrics: [
    //       { metric: "Précision moyenne", currentValue: 92.5, previousValue: 87.9, evolution: 5.3, unit: "%" },
    //       { metric: "Temps moyen", currentValue: 2.3, previousValue: 2.8, evolution: -17.9, unit: "min" },
    //       { metric: "Satisfaction", currentValue: 92, previousValue: 89, evolution: 3.4, unit: "%" }
    //     ]
    //   },
    //   alerts: [
    //     {
    //       id: "1",
    //       type: "WEATHER",
    //       title: "Risque de pluie intense",
    //       description: "Précipitations importantes prévues",
    //       priority: "HIGH",
    //       createdAt: "2025-07-20T02:23:06.860Z"
    //     },
    //     {
    //       id: "2",
    //       type: "DISEASE_OUTBREAK",
    //       title: "Épidémie détectée",
    //       description: "Augmentation des cas de mildiou",
    //       priority: "CRITICAL",
    //       createdAt: "2025-07-20T00:23:06.860Z"
    //     }
    //   ],
    //   weather: {
    //     temperature: 28,
    //     humidity: 75,
    //     windSpeed: 12,
    //     conditions: "Partiellement nuageux",
    //     forecast: [
    //       { date: "2024-01-20", temperature: { min: 22, max: 30 }, conditions: "Ensoleillé" },
    //       { date: "2024-01-21", temperature: { min: 24, max: 32 }, conditions: "Nuageux" },
    //       { date: "2024-01-22", temperature: { min: 20, max: 28 }, conditions: "Pluvieux" }
    //     ]
    //   }
    // }).pipe(delay(800)); 
  }
}