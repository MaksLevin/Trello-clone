import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import firebase from 'firebase/compat/app';
import { firstValueFrom } from 'rxjs';

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

  async addAuthUser(): Promise<void> {
    if (firebase.auth().currentUser) {
      const currentUserUid = firebase.auth().currentUser?.uid;
      const userAuth = this.db.getFromCollection(
        'users/',
        currentUserUid as string
      );
      let userAuthData: IUser;

      userAuthData = (await firstValueFrom(userAuth)) as IUser;

      this.store.dispatch(authActions.getAuthUser(userAuthData));
    }
  }

  async removeUser(): Promise<void> {
    this.store.dispatch(authActions.removeAuthUser());
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
      this.addAuthUser();
    } catch (err) {
      this.error.showError(err);
    }
  }

  async signUp(user: IUser, password: string): Promise<void> {
    try {
      let userCredential = await this.auth.createUserWithEmailAndPassword(
        user.email,
        password
      );
      user.createdOn = new Date();
      if (userCredential.user?.uid) {
        user.id = userCredential.user.uid;
      }
      this.db.setCollection('users', userCredential.user!.uid, user);
      this.addAuthUser();
    } catch (err) {
      this.error.showError(err);
    }
  }

  async signOut(): Promise<void> {
    await this.auth.signOut();
    this.removeUser();
  }
}
