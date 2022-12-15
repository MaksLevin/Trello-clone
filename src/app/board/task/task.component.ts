import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Task } from '@app/core/models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() listId!: string;
  @Input() taskId!: string;
  @Input() taskTitle!: string;

  @Output() deleteTask = new EventEmitter<Partial<Task>>();

  constructor() {}

  deleteTaskDumb(listId: string, id: string): void {
    this.deleteTask.emit({ listId, id });
  }
}
