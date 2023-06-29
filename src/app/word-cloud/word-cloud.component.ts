import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';

import {
  scaleLinear,
  scaleOrdinal,
  schemeBlues,
  schemeCategory10,
  schemeGreens,
  schemePastel1,
  schemePastel2,
} from 'd3';

import { WordCloudService } from '@app/core/services/wordcloud.service';
import { userAuthSelector } from '@app/store/user-auth';
import { WordCloudData, WordCloudOptions, WordCloudSchemas } from '@app/core/models';
import { collectionsPaths } from '@app/core/constants';

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.scss'],
})
export class WordCloudComponent implements OnInit {
  userId$ = this.store.select(userAuthSelector.selectGetUserAuthId);

  wordCloudData!: WordCloudData[];

  public rotateScale = scaleLinear().range([-90, 90]).domain([0, 1]);

  public rotate: any = () => {
    return this.rotateScale(Math.random());
  };

  public fillMapper: any = (datum: any, index: number) => {
    return this.fillFx(index.toString());
  };

  public schemas: WordCloudSchemas[] = [
    { id: 0, name: 'Category10', schema: schemeCategory10 },
    { id: 1, name: 'Blues', schema: schemeBlues[9] },
    { id: 2, name: 'Greens', schema: schemeGreens[9] },
    { id: 3, name: 'Pastel1', schema: schemePastel1 },
    { id: 4, name: 'Pastel2', schema: schemePastel2 },
  ];

  public wordCloudOptions: WordCloudOptions = {
    rotate: this.rotate,
    fillMapper: this.fillMapper,
    fillScheme: 0,
    animations: true,
    autoFill: true,
    width: 1100,
    height: 350,
    padding: 5,
    font: 'Arial',
  };

  public fillFx: any = scaleOrdinal(this.schemas[this.wordCloudOptions.fillScheme!].schema);

  constructor(private store: Store, private wordCloudService: WordCloudService) {}

  async getData(): Promise<void> {
    const userId = await firstValueFrom(this.userId$);

    this.wordCloudData = await this.wordCloudService.getData(collectionsPaths.mainBoards, userId);
  }

  ngOnInit(): void {
    this.getData();
  }
}
