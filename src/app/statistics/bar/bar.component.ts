import { Component, Input, OnChanges } from '@angular/core';
import * as d3 from 'd3';

import { StatisticsData } from '@app/core/models';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent implements OnChanges {
  @Input() mainBoardsByDate!: StatisticsData[];

  ngOnChanges(): void {
    setTimeout(() => {
      this.createSvg();
      this.createColors();
      this.drawBars(this.mainBoardsByDate);
    }, 150);
  }

  private svg: any;
  private margin = 50;
  private width = 750 - this.margin * 2;
  private height = 400 - this.margin * 2;
  private colors: any;

  private createSvg(): void {
    this.svg = d3
      .select('figure#bar')
      .append('svg')
      .attr('width', this.width + this.margin * 2)
      .attr('height', this.height + this.margin * 2)
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private createColors(): void {
    this.colors = d3
      .scaleOrdinal()
      .domain(this.mainBoardsByDate.map((data: StatisticsData) => data.date.toString()))
      .range(['#c7d3ec', '#a5b8db', '#879cc4', '#677795', '#5a6782']);
  }

  private drawBars(data: StatisticsData[]): void {
    // Create the X-axis band scale
    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(data.map((item: StatisticsData) => item.date))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text');

    // Create the Y-axis band scale
    const y = d3.scaleLinear().domain([0, 20]).range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append('g').call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg
      .selectAll('bars')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (item: StatisticsData) => x(item.date))
      .attr('y', (item: StatisticsData) => y(item.ids.length))
      .attr('width', x.bandwidth())
      .attr('height', (item: StatisticsData) => this.height - y(item.ids.length))
      .attr('fill', this.colors);
  }
}
