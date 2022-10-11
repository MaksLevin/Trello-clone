import { Component, Input, OnInit, Output } from '@angular/core';
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
  @Output() boards$!: Observable<IMainBoard[]>;
  mainBoardsForm!: FormGroup;
  mainBoard!: FormGroup;
  @Input() titleBoard!: FormControl;
  @Input() descriptionBoard!: FormControl;

  constructor(private store: Store, private mainBoardsService: MainBoardsService) {}

  saveEditBoard(idBoard: string, title: string, description: string | undefined): Promise<void> {
    return this.mainBoardsService.updateMainBoard(idBoard, title, description);
  }

  cancelEditBoard(idBoard: string, title: string, description: string | undefined): void {
    console.log(idBoard, title, description);
  }

  deleteBoard(idBoard: string): Promise<void> {
    return this.mainBoardsService.deleteMainBoard(idBoard);
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
    this.titleBoard = new FormControl('');
    this.descriptionBoard = new FormControl('');
  }

  private initMainBoardsForm(): void {
    this.mainBoardsForm = new FormGroup(
      {
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
      },
      { updateOn: 'blur' }
    );
    this.mainBoard = new FormGroup(
      {
        titleBoard: this.titleBoard,
        descriptionBoard: this.descriptionBoard,
      },
      { updateOn: 'submit' }
    );
  }
}
