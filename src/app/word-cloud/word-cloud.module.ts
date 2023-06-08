import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordCloudComponent } from './word-cloud.component';
import { WordCloudChartComponent } from './word-cloud-chart/word-cloud-chart.component';
import { WordCloudRoutingModule } from './word-cloud-routing.module';

@NgModule({
  declarations: [WordCloudComponent, WordCloudChartComponent],
  imports: [CommonModule, WordCloudRoutingModule],
})
export class WordCloudModule {}
