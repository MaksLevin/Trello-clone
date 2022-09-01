import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { IUser } from '@app/core/models/user';
import { DatabaseService } from '@app/core/services/database.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private db: DatabaseService,
  ) {}

  async signIn(email: string, password: string): Promise<void> {
    await this.auth.signInWithEmailAndPassword(email, password);
  }

  async signUp(user: IUser, password: string): Promise<void> {
    let userCredential = await this.auth.createUserWithEmailAndPassword(
      user.email,
      password
    );

    user.createdOn = new Date();
    if (userCredential.user?.uid) {
      user.id = userCredential.user.uid;
    }

    await this.db.setCollection('users',userCredential.user!.uid, user);
  }

  async signOut(): Promise<void> {
    await this.auth.signOut();
  }
}
