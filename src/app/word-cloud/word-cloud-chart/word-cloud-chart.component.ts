import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';

import * as d3Cloud from 'd3-cloud';
import { select } from 'd3-selection';
import 'd3-transition';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

import { WordCloudData, WordCloudOptions } from '@app/core/models';

const fill = scaleOrdinal(schemeCategory10);
const defaultFontSizeMapper: any = (word: WordCloudData) => word.value;

@Component({
  selector: 'app-word-cloud-chart',
  templateUrl: './word-cloud-chart.component.html',
  styleUrls: ['./word-cloud-chart.component.scss'],
})
export class WordCloudChartComponent implements OnChanges {
  @ViewChild('wordCloud') wordCloud: ElementRef<HTMLDivElement> | undefined;

  @Input() data: d3Cloud.Word[] = [];
  @Input() fontSizeMapper?: (datum: d3Cloud.Word, index: number) => number = defaultFontSizeMapper;
  @Input() fontWeight: string | number = 'normal';
  @Input() wordCloudOptions!: WordCloudOptions;

  renderCloud(): void {
    select(this.wordCloud?.nativeElement!).selectAll('*').remove();
    const layout = d3Cloud()
      .size([this.wordCloudOptions.width!, this.wordCloudOptions.height!])
      .font(this.wordCloudOptions.font as any)
      .fontWeight(this.fontWeight)
      .words(this.data)
      .padding(this.wordCloudOptions.padding as any)
      .rotate(this.wordCloudOptions.rotate as any)
      .fontSize(this.fontSizeMapper!)
      .on('end', (words: any) => {
        this.renderText(words, layout);
      });
    layout.start();
  }

  renderText(words: any, layout: any): void {
    const texts = select(this.wordCloud?.nativeElement!)
      .append('svg')
      .attr('width', layout.size()[0])
      .attr('height', layout.size()[1])
      .append('g')
      .attr('transform', `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`)
      .selectAll('text')
      .data(words)
      .enter()
      .append('text')
      .style('font-family', this.wordCloudOptions.font as any)
      .style('font-weight', this.fontWeight)
      .style('fill', (word: any, i) => {
        if (this.wordCloudOptions.autoFill) {
          if (this.wordCloudOptions.fillMapper) return this.wordCloudOptions.fillMapper(word, i);
          else return fill(i.toString());
        } else {
          return null;
        }
      })
      .attr('text-anchor', 'middle')
      .text((d: any) => d.text);

    if (!this.wordCloudOptions.animations) {
      texts
        .attr('transform', (d: any) => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
        .style('font-size', (d: any) => `${d.size}px`)
        .style('fill-opacity', 1);
    } else {
      // Initial status
      texts
        .style('font-size', 1)
        .style('fill-opacity', 1e-6)
        .transition()
        .duration(600)
        .attr('transform', (d: any) => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
        .style('font-size', (d: any) => `${d.size}px`)
        .style('fill-opacity', 1);
    }
  }

  ngOnChanges(): void {
    if (this.wordCloud) {
      this.renderCloud();
    }
  }
}
