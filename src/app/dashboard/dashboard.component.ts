import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';

import { IMainBoard } from '@app/core/models/mainBoard';
import { selectGetUserAuthId } from '@app/store/user-auth/user-auth.selector';
import { MainBoardsService } from '@app/core/services/main-boards.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @Input() boards$!: Observable<IMainBoard[]>;

  mainBoardsForm!: FormGroup;

  constructor(private store: Store, private mainBoardsService: MainBoardsService) {}

  saveEditBoard({
    boardId,
    element,
    elementValue,
  }: {
    boardId: string;
    element: string;
    elementValue: string;
  }): Promise<void> {
    return this.mainBoardsService.updateMainBoard(boardId, element, elementValue);
  }

  deleteBoard(boardId: string): Promise<void> {
    console.log(boardId);
    return this.mainBoardsService.deleteMainBoard(boardId);
  }

  async createNewBoard(): Promise<void> {
    const userId: string = await firstValueFrom(this.store.select(selectGetUserAuthId));
    const pushId = this.mainBoardsService.getPushId();

    const mainBoard: IMainBoard = {
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
