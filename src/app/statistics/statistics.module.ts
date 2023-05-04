import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsComponent } from './statistics.component';
import { BarComponent } from './bar/bar.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { ScatterPlotComponent } from './scatter-plot/scatter-plot.component';

@NgModule({
  declarations: [StatisticsComponent, BarComponent, ScatterPlotComponent],
  imports: [CommonModule, StatisticsRoutingModule],
})
export class StatisticsModule {}
