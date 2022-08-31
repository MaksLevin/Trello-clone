import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

import { IUser } from '../../../models/user';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {}

  signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(['/board']);
    });
  }

  signUp(user: IUser, password: string) {
    return this.auth
      .createUserWithEmailAndPassword(user.email, password)
      .then((userCredential) => {
        user.createdOn = Date.now();
        if (userCredential.user?.uid) {
          user.id = userCredential.user.uid;
        }

        return this.db
          .collection('users')
          .doc(userCredential.user?.uid)
          .set(user)
          .then(() => {
            this.router.navigate(['/board']);
          });
      });
  }

  signOut() {
    return this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
