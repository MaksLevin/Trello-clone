import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

import { IUser } from '@app/core/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {}

  async signIn(email: string, password: string): Promise<void> {
    let result = await this.auth.signInWithEmailAndPassword(email, password);
    this.router.navigate(['/board']);
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

    await this.db.collection('users').doc(userCredential.user?.uid).set(user);
    this.router.navigate(['/board']);
  }

  async signOut(): Promise<void> {
    let result = await this.auth.signOut();
    this.router.navigate(['/login']);
  }
}
