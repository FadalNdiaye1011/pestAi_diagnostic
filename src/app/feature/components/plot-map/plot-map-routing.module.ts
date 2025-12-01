import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlotMapComponent} from './component/plot-map/plot-map.component';

const routes: Routes = [
  {
    path:'',
    component:PlotMapComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlotMapRoutingModule { }
