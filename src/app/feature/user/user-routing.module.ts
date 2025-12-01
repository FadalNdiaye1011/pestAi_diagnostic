import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'diagnostic',
        loadChildren: () => import('../components/diagnostic/diagnostic.module').then(m => m.DiagnosticModule)
      },

    ]
  },
    {
    path: '',
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../components/dashboard/dashboard.module').then(m => m.DashboardModule)
      },

    ]
  },
  {
    path: '',
    children: [
      {
        path: 'parcelles',
        loadChildren: () => import('../components/plot-map/plot-map.module').then(m => m.PlotMapModule)
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
