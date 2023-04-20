import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsComponent } from './statistics.component';
import { BarComponent } from './bar/bar.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { PieComponent } from './pie/pie.component';

@NgModule({
  declarations: [StatisticsComponent, BarComponent, PieComponent],
  imports: [CommonModule, StatisticsRoutingModule],
})
export class StatisticsModule {}
