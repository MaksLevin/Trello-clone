import { Injectable } from '@angular/core';
import { DatabaseService } from '@app/core/services/database.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { selectGetUserAuth } from '@src/app/store/user-auth/user-auth.selector';
import { IUser } from '../models/user';
import { async } from '@angular/core/testing';
import { IMainBoard } from '../models/mainBoard';

@Injectable({
  providedIn: 'root',
})
export class MainBoardsService {
  user: Observable<IUser> | undefined = this.store.select(selectGetUserAuth);

  constructor(
    private auth: AngularFireAuth,
    private db: DatabaseService,
    private store: Store
  ) {}

  // async createNewMainBoards(mainboard: IMainBoard): Promise<void> {
  //   this.db.setCollection('mainBoards', this.user.id, mainboard);
  // }
}
