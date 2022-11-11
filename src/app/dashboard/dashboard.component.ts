import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { MainBoard } from '@app/core/models';
import { userAuthSelector } from '@app/store/user-auth';
import { MainBoardsService } from '@app/core/services';
import { boardTitleValidationErrors } from '@app/core/constants';
import { DialogModalComponent } from '@app/shared/dialog-modal/dialog-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  boards$!: Observable<MainBoard[]>;

  mainBoardsForm!: FormGroup;
  titleError: { isRequired: string } = boardTitleValidationErrors;

  constructor(
    private store: Store,
    private router: Router,
    private mainBoardsService: MainBoardsService,
    private dialog: MatDialog
  ) {}

  isRequired(field: string): boolean | undefined {
    return this.mainBoardsForm.get(field)?.hasError('required');
  }

  saveEditableBoardTitle({ id, title }: Partial<MainBoard>): Promise<void> {
    if (!id) {
      return Promise.resolve();
    }
    return this.mainBoardsService.updateMainBoardTitle(id, title);
  }

  saveEditableBoardDescription({ id, description }: Partial<MainBoard>): Promise<void> {
    if (!id) {
      return Promise.resolve();
    }
    return this.mainBoardsService.updateMainBoardDescription(id, description);
  }

  openConfirmationDialog(
    boardId: string,
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
        return this.mainBoardsService.deleteMainBoard(boardId);
      }
      return;
    });
  }

  deleteBoard(boardId: string): void {
    return this.openConfirmationDialog(boardId, '300ms', '150ms');
  }

  switchToBoard(boardId: string): void {
    this.router.navigate(['/board', boardId]);
  }

  async createNewBoard(): Promise<void> {
    const userId: string = await firstValueFrom(
      this.store.select(userAuthSelector.selectGetUserAuthId)
    );
    const pushId = this.mainBoardsService.getPushId();

    const mainBoard: MainBoard = {
      id: pushId,
      userUid: userId,
      title: this.mainBoardsForm.get('title')!.value,
      description: this.mainBoardsForm.get('description')?.value,
      createdOn: new Date(),
    };

    await this.mainBoardsService.createNewMainBoards(mainBoard, pushId);

    this.mainBoardsForm.reset();
  }

  async getBoards(): Promise<void> {
    const userId: string = await firstValueFrom(
      this.store.select(userAuthSelector.selectGetUserAuthId)
    );

    this.boards$ = this.mainBoardsService.getMainBoards(userId);
  }

  ngOnInit(): void {
    this.getBoards();
    this.initMainBoardsForm();
  }

  private initMainBoardsForm(): void {
    this.mainBoardsForm = new FormGroup(
      {
        title: new FormControl('', [Validators.required]),
        description: new FormControl(''),
      },
      { updateOn: 'blur' }
    );
  }
}
