import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormControl, FormGroup } from '@angular/forms';

import { List, Task } from '@app/core/models';
import { DialogService, ListService } from '@app/core/services';
import { deleteMessage } from '@app/core/constants';
import { DialogModalComponent } from '@app/shared';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() listId!: string;
  @Input() listsId!: string[];
  @Input() listTitle!: string;
  @Input() isTitleEditMode!: boolean;

  @Output() deleteList = new EventEmitter<string>();
  @Output() getlistsId = new EventEmitter<string[]>();
  @Output() saveEditableListTitle = new EventEmitter<Partial<List>>();
  @Output() setTitleEditMode = new EventEmitter<string>();

  @ViewChild('inputTitle') inputTitle!: ElementRef<HTMLInputElement>;
  @ViewChild('inputTaskTitle') inputTaskTitle!: ElementRef<HTMLInputElement>;

  tasks$!: Observable<Task[]>;

  taskForm!: FormGroup;

  constructor(private listService: ListService, private dialogService: DialogService) {}

  toggleTitleEditMode(listId: string): void {
    this.setTitleEditMode.emit(listId);

    setTimeout(() => {
      this.inputTitle.nativeElement.focus();
    }, 0);
  }

  sendEditableListTitle(id: string, title: string): void {
    this.setTitleEditMode.emit('');
    this.saveEditableListTitle.emit({ id, title });
  }

  deleteListDumb(listId: string): void {
    this.deleteList.emit(listId);
  }

  cancelListEdit(): void {
    this.setTitleEditMode.emit('');
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.listService.updateTaskListId(event.item.data.id, event.container.id);
    }
  }

  async createNewTask(listId: string, title: string): Promise<void> {
    const pushId = this.listService.getPushId();

    if (!listId || !title) {
      return Promise.resolve();
    }

    const task: Task = {
      id: pushId,
      listId: listId,
      title: title,
      createdOn: new Date(),
    };

    await this.listService.createNewTask(listId, task);

    this.taskForm.reset();
  }

  async getTasks(listId: string): Promise<void> {
    await this.listService.fetchTasks();
    this.tasks$ = await this.listService.getTasks(listId);
  }

  async deleteTask({ listId, id }: Partial<Task>): Promise<void> {
    const resultDialog = this.dialogService.openConfirmationDialog({
      typeDialog: DialogModalComponent,
      message: deleteMessage,
    });
    const result = await firstValueFrom(resultDialog);

    if (result) {
      this.listService.deleteList(listId as string, id as string);
    }
  }

  ngOnInit() {
    this.getTasks(this.listId);
    this.initTaskForm();
  }

  private initTaskForm(): void {
    this.taskForm = new FormGroup(
      {
        taskTitle: new FormControl(''),
      },
      { updateOn: 'blur' }
    );
  }
}
