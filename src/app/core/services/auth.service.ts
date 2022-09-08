import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { IUser } from '@app/core/models/user';
import { ErrorService } from './error.service';

import { DatabaseService } from '@app/core/services/database.service';
import { Store } from '@ngrx/store';
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



  async signIn(email: string, password: string): Promise<void> {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
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

      await this.db.setCollection('users', userCredential.user!.uid, user);
    } catch (err) {
      this.error.showError(err);
    }
  }

  async signOut(): Promise<void> {
    await this.auth.signOut();
  }
}
