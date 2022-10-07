import { Component, OnInit } from '@angular/core';
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
  mainBoardsForm!: FormGroup;
  boards$!: Observable<IMainBoard[]>;
  isEdit!: {};
  editBoardId!: string | undefined;

  constructor(private store: Store, private mainBoardsService: MainBoardsService) {}

  editBoard(boardId: string): void {
    this.isEdit = {
      [boardId]: true,
    };
    console.log(this.isEdit);
  }

  saveEditBoard(boardId: string, title: string, description: string | undefined): Promise<void> {
    this.editBoardId = undefined;
    this.isEdit = {
      [boardId]: false,
    };
    console.log(this.isEdit);
    return this.mainBoardsService.updateMainBoard(boardId, title, description);
  }

  deleteBoard(idBoard: string): Promise<void> {
    return this.mainBoardsService.deleteMainBoard(idBoard);
  }

  async createNewBoard(): Promise<void> {
    const userId$: string = await firstValueFrom(this.store.select(selectGetUserAuthId));
    const pushId = this.mainBoardsService.pushId();

    const mainBoard: IMainBoard = {
      id: pushId,
      userUid: userId$,
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
        description: new FormControl('', [Validators.required]),
      },
      { updateOn: 'blur' }
    );
  }
}
