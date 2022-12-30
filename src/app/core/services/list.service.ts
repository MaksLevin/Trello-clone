import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, map, Observable } from 'rxjs';
import { groupBy } from 'lodash';

import { HttpService } from '@app/core/services';
import { Task } from '@app/core/models';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private sourceTasks = new BehaviorSubject<{ [listId: string]: Task[] }>({});

  tasks$ = this.sourceTasks.asObservable();

  constructor(private httpService: HttpService) {}

  async createNewTask(listId: string, task: Task): Promise<void> {
    const tasks = await firstValueFrom(this.tasks$);
    const newTasks = [...(tasks[listId] ?? []), task];

    tasks[listId] = newTasks;

    this.sourceTasks.next(tasks);

    this.httpService.setCollection('tasks', task);
  }

  async fetchTasks(): Promise<void> {
    const tasks: Task[] = await firstValueFrom(this.httpService.getCollection('tasks'));

    const result = groupBy(tasks, 'listId');

    this.sourceTasks.next(result);
  }

  getTasks(listId: string): Observable<Task[]> {
    const result = this.tasks$.pipe(map((dataObject) => dataObject[listId]));
    return result;
  }

  async deleteList(listId: string, taskId: string): Promise<void> {
    const tasks = await firstValueFrom(this.tasks$);
    const newTasks = tasks[listId].filter((task) => task.id !== taskId);

    tasks[listId] = newTasks;

    this.sourceTasks.next(tasks);

    this.httpService.deleteDocument('tasks', taskId);
  }

  getPushId(): string {
    return this.httpService.createId();
  }
}
