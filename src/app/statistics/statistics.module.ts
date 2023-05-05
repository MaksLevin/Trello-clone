import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsComponent } from './statistics.component';
import { BarComponent } from './bar/bar.component';
import { StatisticsRoutingModule } from './statistics-routing.module';

@NgModule({
  declarations: [StatisticsComponent, BarComponent],
  imports: [CommonModule, StatisticsRoutingModule],
})
export class StatisticsModule {}
