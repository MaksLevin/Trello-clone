import { Component, Input, OnChanges } from '@angular/core';
import * as d3 from 'd3';

import { StatisticsData } from '@app/core/models';

@Component({
  selector: 'app-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.scss'],
})
export class ScatterPlotComponent implements OnChanges {
  @Input() mainBoardsByDate!: StatisticsData[];

  ngOnChanges(): void {
    setTimeout(() => {
      this.createSvg();
      this.drawPlot(this.mainBoardsByDate);
    }, 150);
  }

  private svg: any;
  //chart sizes
  private margin = 50;
  private width = 750 - this.margin * 2;
  private height = 400 - this.margin * 2;

  private createSvg(): void {
    this.svg = d3
      .select('figure#scatter')
      .append('svg')
      .attr('width', this.width + this.margin * 2)
      .attr('height', this.height + this.margin * 2)
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private drawPlot(data: StatisticsData[]): void {
    // Add X axis
    const x = d3.scaleLinear().domain([0, 20]).range([0, this.width]);
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x).tickFormat(d3.format('d')));

    // Add Y axis
    const y = d3.scaleLinear().domain([0, 20]).range([this.height, 0]);
    this.svg.append('g').call(d3.axisLeft(y));

    // Add dots
    const dots = this.svg.append('g');
    dots
      .selectAll('dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (item: StatisticsData) => x(item.dataIds.length))
      .attr('cy', (item: StatisticsData) => y(item.dataIds.length))
      .attr('r', 7)
      .style('opacity', 0.5)
      .style('fill', '#69b3a2');

    // Add labels
    dots
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text((item: StatisticsData) => item.date)
      .attr('x', (item: StatisticsData) => x(item.dataIds.length))
      .attr('y', (item: StatisticsData) => y(item.dataIds.length));
  }
}
