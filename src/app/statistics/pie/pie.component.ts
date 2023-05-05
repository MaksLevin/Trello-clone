import { Component, Input, OnChanges } from '@angular/core';
import * as d3 from 'd3';

import { StatisticsData } from '@app/core/models';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss'],
})
export class PieComponent implements OnChanges {
  @Input() mainBoardsByDate!: StatisticsData[];

  private svg: any;
  private margin = 50;
  private width = 750;
  private height = 600;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors: any;

  ngOnChanges(): void {
    setTimeout(() => {
      this.createSvg();
      this.createColors();
      this.drawChart(this.mainBoardsByDate);
    }, 150);
  }

  private createSvg(): void {
    this.svg = d3
      .select('figure#pie')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
  }

  private createColors(): void {
    this.colors = d3
      .scaleOrdinal()
      .domain(this.mainBoardsByDate.map((data: StatisticsData) => data.dataIds.length.toString()))
      .range(['#c7d3ec', '#a5b8db', '#879cc4', '#677795', '#5a6782']);
  }

  private drawChart(data: StatisticsData[]): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((data: StatisticsData) => data.dataIds.length);

    // Build the pie chart
    this.svg
      .selectAll('pieces')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', d3.arc().innerRadius(0).outerRadius(this.radius))
      .attr('fill', (i: number) => this.colors(i))
      .attr('stroke', '#121926')
      .style('stroke-width', '1px');

    // Add labels
    const labelLocation = d3.arc().innerRadius(100).outerRadius(this.radius);

    this.svg
      .selectAll('pieces')
      .data(pie(data))
      .enter()
      .append('text')
      .text((text: any) => text.data.date)
      .attr(
        'transform',
        (object: d3.DefaultArcObject) => 'translate(' + labelLocation.centroid(object) + ')'
      )
      .style('text-anchor', 'middle')
      .style('font-size', 15);
  }
}
