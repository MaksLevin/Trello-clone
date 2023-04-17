import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';

import { StatisticsService } from '@app/core/services/statistics.service';
import { userAuthSelector } from '@app/store/user-auth';
import { MainBoard, StatisticsData } from '@app/core/models';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  userId$ = this.store.select(userAuthSelector.selectGetUserAuthId);

  mainBoards!: MainBoard[];

  mainBoardsByDate: StatisticsData[] = [];

  constructor(private store: Store, private statisticsService: StatisticsService) {}

  async getData(): Promise<void> {
    const userId = await firstValueFrom(this.userId$);

    this.mainBoards = await this.statisticsService.getData('mainBoards', userId);

    this.modifyingData(this.mainBoards);
  }

  reducingData = (acc: any, data: MainBoard) => {
    const dateString = new Date(data.createdOn).toLocaleDateString();

    if (!Object.hasOwn(acc, dateString)) {
      acc[dateString] = [];
    }
    acc[dateString].push(data.id);

    return acc;
  };

  modifyingData = (data: MainBoard[]): void => {
    const array = data.reduce(this.reducingData, {});
    const keys = Object.keys(array);
    keys.map((key) => this.mainBoardsByDate.push({ date: key, ids: array[key] }));
  };

  ngOnInit(): void {
    this.getData();
  }
}
