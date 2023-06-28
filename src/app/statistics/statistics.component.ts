import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';

import { StatisticsService } from '@app/core/services/statistics.service';
import { userAuthSelector } from '@app/store/user-auth';
import { MainBoard, StatisticsData } from '@app/core/models';
import { collectionsPaths } from '@app/core/constants';

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

    this.mainBoards = await this.statisticsService.getData(collectionsPaths.mainBoards, userId);

    this.getModifiedData(this.mainBoards);
  }

  getModifiedData(data: MainBoard[]): void {
    const dataByDate = data.reduce((acc: any, data: MainBoard) => {
      const dateString = new Date(data.createdOn).toLocaleDateString();

      if (!Object.hasOwn(acc, dateString)) {
        acc[dateString] = [];
      }

      acc[dateString].push(data.id);

      return acc;
    }, {});

    Object.keys(dataByDate).map((key) =>
      this.mainBoardsByDate.push({ date: key, dataIds: dataByDate[key] })
    );
  }

  ngOnInit(): void {
    this.getData();
  }
}
