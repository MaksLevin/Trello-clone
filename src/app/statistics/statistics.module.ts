import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsComponent } from './statistics.component';
import { BarComponent } from './bar/bar.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { ScatterPlotComponent } from './scatter-plot/scatter-plot.component';
import { PieComponent } from './pie/pie.component';

@NgModule({
  declarations: [StatisticsComponent, BarComponent, PieComponent, ScatterPlotComponent],
  imports: [CommonModule, StatisticsRoutingModule],
})
export class StatisticsModule {}
