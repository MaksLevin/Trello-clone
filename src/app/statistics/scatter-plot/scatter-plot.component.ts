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
      .select('#scatter')
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

    ///Add tolltips
    const tooltip = d3
      .select('#scatter')
      .append('div')
      .attr('class', 'tooltip-scatter')
      .style('position', 'absolute')
      .style('opacity', 0);

    // Add dots
    this.svg
      .append('g')
      .selectAll('dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (item: StatisticsData) => x(item.dataIds.length))
      .attr('cy', (item: StatisticsData) => y(item.dataIds.length))
      .attr('r', 7)
      .style('opacity', 0.5)
      .style('fill', '#69b3a2')
      .on('mouseover', (event: any, item: StatisticsData) => {
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip
          .html(`Date: ${item.date}</span>`)
          .style('left', `${event.pageX}px`)
          .style('top', `${event.pageY + 25}px`);
      })
      .on('mouseout', () => tooltip.transition().duration(500).style('opacity', 0));
  }
}
