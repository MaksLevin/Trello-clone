import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';

import { IUser } from '@app/core/models/user';
import { IMainBoard } from '@app/core/models/mainBoard';
import { selectGetUserAuth } from '@app/store/user-auth/user-auth.selector';
import { MainBoardsService } from '@app/core/services/main-boards.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  mainBoardsForm!: FormGroup;
  boards$!: Observable<any>;
  authUser: Promise<IUser> = this.getAuthUser();

  constructor(private store: Store, private service: MainBoardsService) {}

  async createNewBoard(): Promise<void> {
    const user: IUser = await firstValueFrom(
      this.store.select(selectGetUserAuth)
    );
    const pushId = this.service.pushId();

    const mainBoard: IMainBoard = {
      id: pushId,
      userUid: user.id,
      title: this.mainBoardsForm.get('title')!.value,
      description: this.mainBoardsForm.get('description')!.value,
      createdOn: new Date(),
    };

    await this.service.createNewMainBoards(mainBoard, pushId);

    this.mainBoardsForm.reset();
  }

  async getAuthUser(): Promise<IUser> {
    return await firstValueFrom(this.store.select(selectGetUserAuth));
  }

  async getBoards(): Promise<void> {
    const user: IUser = await firstValueFrom(
      this.store.select(selectGetUserAuth)
    );

    this.boards$ = await this.service.getMainBoards(user.id);
    console.log(await firstValueFrom(this.boards$));
    console.log((await this.authUser).id);
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
