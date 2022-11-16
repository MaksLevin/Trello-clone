import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, Observable, Subscription } from 'rxjs';

import { BoardsService, DialogService } from '@app/core/services';
import { List } from '@app/core/models';
import { deleteMessage, listTitleValidationErrors } from '@app/core/constants';
import { DialogModalComponent } from '@app/shared';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  mainBoardId!: string;

  routeSubscription: Subscription;

  lists$!: Observable<List[]>;

  listForm!: FormGroup;
  titleError: { isRequired: string } = listTitleValidationErrors;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardsService,
    private dialog: DialogService
  ) {
    this.routeSubscription = this.route.params.subscribe(
      (params) => (this.mainBoardId = params['id'])
    );
  }

  isRequired(field: string): boolean | undefined {
    return this.listForm.get(field)?.hasError('required');
  }

  async deleteList(listId: string): Promise<void> {
    const result = this.dialog.openConfirmationDialog({
      typeDialog: DialogModalComponent,
      message: deleteMessage,
    });
    if (await firstValueFrom(result)) {
      this.boardService.deleteList(listId);
    }
  }

  saveEditableListTitle({ id, title }: Partial<List>): Promise<void> {
    if (!id) {
      return Promise.resolve();
    }
    return this.boardService.updateListTitle(id, title);
  }

  async createNewList(): Promise<void> {
    const pushId = this.boardService.getPushId();

    const list: List = {
      id: pushId,
      mainBoardId: this.mainBoardId,
      title: this.listForm.get('title')!.value,
      createdOn: new Date(),
    };

    await this.boardService.createNewList(list, pushId);

    this.listForm.reset();
  }

  getLists(): void {
    this.lists$ = this.boardService.getLists(this.mainBoardId);
  }

  ngOnInit(): void {
    this.initMainBoardsForm();
    this.getLists();
  }

  private initMainBoardsForm(): void {
    this.listForm = new FormGroup(
      {
        title: new FormControl('', [Validators.required]),
      },
      { updateOn: 'blur' }
    );
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
