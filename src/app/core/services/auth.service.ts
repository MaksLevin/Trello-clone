import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { IUser } from '@app/core/models/user';
import { ErrorService } from './error.service';

import { DatabaseService } from '@app/core/services/database.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private db: DatabaseService,
    private error: ErrorService
  ) {}

  async signIn(email: string, password: string): Promise<boolean> {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
      return true;
    } catch (err) {
      this.error.showError(err);
      return false;
    }
  }

  async signUp(user: IUser, password: string): Promise<boolean> {
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
      return true;
    } catch (err) {
      this.error.showError(err);
      return false;
    }
  }

  async signOut(): Promise<void> {
    await this.auth.signOut();
  }
}
