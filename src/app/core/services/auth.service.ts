import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import firebase from 'firebase/compat/app';
import { firstValueFrom, Observable } from 'rxjs';

import { IUser } from '@app/core/models/user';
import { ErrorService } from './error.service';
import { DatabaseService } from '@app/core/services/database.service';
import * as authActions from '@app/store/user-auth/user-auth.action';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private db: DatabaseService,
    private error: ErrorService,
    private store: Store
  ) {}

  getAuthUser(): Observable<IUser> {
    const currentUserUid = firebase.auth().currentUser?.uid;
    const userAuth = this.db.getFromCollection(
      'users/',
      currentUserUid as string
    ) as Observable<IUser>;

    return userAuth;
  }

  async removeUser(): Promise<void> {
    this.store.dispatch(authActions.removeAuthUser());
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);

      this.store.dispatch(
        authActions.getAuthUserSuccess({
          user: await firstValueFrom(this.getAuthUser()),
        })
      );
    } catch (err) {
      this.error.showError(err);
    }
  }

  async signUp(user: IUser, password: string): Promise<void> {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(
        user.email as string,
        password
      );

      const userUid = (userCredential.user as firebase.User).uid;

      this.db.setCollection('users', userUid, { ...user, id: userUid });

      this.store.dispatch(
        authActions.getAuthUserSuccess({
          user: await firstValueFrom(this.getAuthUser()),
        })
      );
    } catch (err) {
      this.error.showError(err);
    }
  }

  async signOut(): Promise<void> {
    await this.auth.signOut();
    this.removeUser();
  }
}
