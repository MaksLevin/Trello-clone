import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';

import { MainBoard } from '@src/app/core/models/mainBoard.model';
import { selectGetUserAuthId } from '@app/store/user-auth/user-auth.selector';
import { MainBoardsService } from '@app/core/services';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @Input() boards$!: Observable<MainBoard[]>;

  mainBoardsForm!: FormGroup;

  constructor(private store: Store, private mainBoardsService: MainBoardsService) {}

  saveEditableBoardTitle({
    boardId,
    titleValue,
  }: {
    boardId: string;
    titleValue: string;
  }): Promise<void> {
    return this.mainBoardsService.updateMainBoardTitle(boardId, titleValue);
  }

  saveEditableBoardDescription({
    boardId,
    descriptionValue,
  }: {
    boardId: string;
    descriptionValue: string;
  }): Promise<void> {
    return this.mainBoardsService.updateMainBoardDescription(boardId, descriptionValue);
  }

  deleteBoard(boardId: string): Promise<void> {
    return this.mainBoardsService.deleteMainBoard(boardId);
  }

  async createNewBoard(): Promise<void> {
    const userId: string = await firstValueFrom(this.store.select(selectGetUserAuthId));
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
    const userId$: string = await firstValueFrom(this.store.select(selectGetUserAuthId));

    this.boards$ = this.mainBoardsService.getMainBoards(userId$);
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
