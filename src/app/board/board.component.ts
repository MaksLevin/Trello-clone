import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { BoardsService } from '@app/core/services';
import { List } from '@app/core/models';
import { listTitleValidationErrors } from '@app/core/constants';
import { MatDialog } from '@angular/material/dialog';
import { DialogModalComponent } from '@app/shared/dialog-modal/dialog-modal.component';

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
    private dialog: MatDialog
  ) {
    this.routeSubscription = this.route.params.subscribe(
      (params) => (this.mainBoardId = params['id'])
    );
  }

  isRequired(field: string): boolean | undefined {
    return this.listForm.get(field)?.hasError('required');
  }

  openConfirmationDialog(
    listId: string,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(DialogModalComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        message: 'Are you sure want to delete?',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        return this.boardService.deleteList(listId);
      }
      return;
    });
  }

  deleteList(listId: string): void {
    return this.openConfirmationDialog(listId, '300ms', '150ms');
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
