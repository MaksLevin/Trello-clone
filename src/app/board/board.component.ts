import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { BoardsService, DialogService } from '@app/core/services';
import { List, Task } from '@app/core/models';
import { deleteMessage, listTitleValidationErrors } from '@app/core/constants';
import { DialogModalComponent } from '@app/shared';
import { trackById } from '@app/core/utils';
import { userAuthSelector } from '@app/store/user-auth';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  mainBoardId!: string;
  currentTitleId!: string;
  listsId!: string[];

  trackById = trackById;
  routeSubscription: Subscription;

  userLists$!: Observable<List[]>;
  tasks$!: Observable<Task[]>;

  listForm!: FormGroup;
  titleError: { isRequired: string } = listTitleValidationErrors;

  userId$ = this.store.select(userAuthSelector.selectGetUserAuthId);

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardsService,
    private dialogService: DialogService,
    private store: Store
  ) {
    this.routeSubscription = this.route.params.subscribe(
      (params) => (this.mainBoardId = params['id'])
    );
  }

  isRequired(field: string): boolean | undefined {
    return this.listForm.get(field)?.hasError('required');
  }

  setTitleEditMode(boardId: string): string {
    return (this.currentTitleId = boardId);
  }

  saveEditableListTitle({ id, title }: Partial<List>): Promise<void> {
    if (!id) {
      return Promise.resolve();
    }
    return this.boardService.updateListTitle(id, title);
  }

  async getLists(): Promise<void> {
    await this.boardService.getLists(this.mainBoardId);

    this.userLists$ = this.boardService.lists$;
    this.listsId = this.boardService.listsId;
  }

  async createNewList(): Promise<void> {
    const pushId = this.boardService.getPushId();
    const list: List = {
      id: pushId,
      mainBoardId: this.mainBoardId,
      userUid: await firstValueFrom(this.userId$),
      title: this.listForm.get('title')!.value,
      createdOn: new Date(),
    };

    await this.boardService.createNewList(list);

    this.listForm.reset();

    this.listsId = this.boardService.listsId;
  }

  async deleteList(listId: string): Promise<void> {
    const resultDialog = this.dialogService.openConfirmationDialog({
      typeDialog: DialogModalComponent,
      message: deleteMessage,
    });
    const result = await firstValueFrom(resultDialog);

    if (result) {
      this.boardService.deleteList(listId);
    }
  }

  ngOnInit(): void {
    this.initMainBoardsForm();
    this.getLists();
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  private initMainBoardsForm(): void {
    this.listForm = new FormGroup(
      {
        title: new FormControl('', [Validators.required]),
      },
      { updateOn: 'blur' }
    );
  }
}
