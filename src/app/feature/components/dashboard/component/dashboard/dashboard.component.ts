import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

// Enregistrer tous les composants Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('cropChart') cropChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('trendChart') trendChartRef!: ElementRef<HTMLCanvasElement>;

  dashboardData: any;
  isLoading = true;
  cropChart: Chart | null = null;
  trendChart: Chart | null = null;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  // ngAfterViewInit(): void {
  //   if (this.dashboardData && !this.isLoading) {
  //     this.createCharts();
  //   }
  // }

  loadDashboardData(): void {
    this.dashboardService.getDashboardData().subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.isLoading = false;

        // Créer les graphiques après que les données soient chargées
        setTimeout(() => {
          this.createCharts();
        }, 100);
      },
      error: (err) => {
        console.error('Error loading dashboard data', err);
        this.isLoading = false;
      }
    });
  }

  createCharts(): void {
    this.createCropDistributionChart();
    this.createTrendChart();
  }

  createCropDistributionChart(): void {
    if (this.cropChart) {
      this.cropChart.destroy();
    }

    const ctx = this.cropChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const cropData = this.dashboardData.kpi.cropDistribution;

    this.cropChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: cropData.map((item: any) => item.cropType),
        datasets: [{
          data: cropData.map((item: any) => item.percentage),
          backgroundColor: [
            'rgba(239, 68, 68, 0.8)',   // Rouge pour PEST
            'rgba(34, 197, 94, 0.8)',   // Vert pour PLANT
            'rgba(156, 163, 175, 0.8)'  // Gris pour UNKNOWN
          ],
          borderColor: [
            'rgba(239, 68, 68, 1)',
            'rgba(34, 197, 94, 1)',
            'rgba(156, 163, 175, 1)'
          ],
          borderWidth: 2,
          hoverOffset: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              font: {
                size: 14
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: 'white',
            bodyColor: 'white',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            borderWidth: 1,
            cornerRadius: 8,
            callbacks: {
              label: function(context) {
                return context.label + ': ' + context.parsed + '%';
              }
            }
          }
        }
      }
    });
  }

  createTrendChart(): void {
    if (this.trendChart) {
      this.trendChart.destroy();
    }

    const ctx = this.trendChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    // Données simulées pour les derniers mois
    const monthlyData = [
      { month: 'Mars', analyses: 15, detections: 8 },
      { month: 'Avril', analyses: 22, detections: 12 },
      { month: 'Mai', analyses: 28, detections: 18 },
      { month: 'Juin', analyses: 35, detections: 22 },
      { month: 'Juillet', analyses: this.dashboardData.kpi.totalDiagnostics, detections: 2 }
    ];

    this.trendChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: monthlyData.map(item => item.month),
        datasets: [
          {
            label: 'Analyses totales',
            data: monthlyData.map(item => item.analyses),
            borderColor: 'rgba(59, 130, 246, 1)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: 'rgba(59, 130, 246, 1)',
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 6
          },
          {
            label: 'Détections positives',
            data: monthlyData.map(item => item.detections),
            borderColor: 'rgba(16, 185, 129, 1)',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: 'rgba(16, 185, 129, 1)',
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              padding: 20,
              font: {
                size: 14
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: 'white',
            bodyColor: 'white',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            borderWidth: 1,
            cornerRadius: 8
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              font: {
                size: 12
              }
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              font: {
                size: 12
              }
            }
          }
        }
      }
    });
  }

  getPriorityColor(priority: string): string {
    switch(priority) {
      case 'CRITICAL': return 'bg-red-100 text-red-800';
      case 'HIGH': return 'bg-orange-100 text-orange-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  }

  getWeatherIcon(conditions: string): string {
    switch(conditions.toLowerCase()) {
      case 'ensoleillé': return '☀️';
      case 'pluvieux': return '🌧️';
      case 'nuageux': return '☁️';
      case 'partiellement nuageux': return '⛅';
      default: return '🌤️';
    }
  }

  getAverageEfficacy(): number {
    if (!this.dashboardData?.kpi?.treatmentStats) return 0;
    const stats = this.dashboardData.kpi.treatmentStats;
    const total = stats.reduce((sum: number, stat: any) => sum + stat.efficacyRate, 0);
    return Math.round(total / stats.length);
  }

  getRandomGrowth(): number {
    return Math.floor(Math.random() * 20) + 5; // Entre 5% et 25%
  }

  Math = Math;
}
