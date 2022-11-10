import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import firebase from 'firebase/compat/app';
import { firstValueFrom, Observable } from 'rxjs';

import { User } from '@app/core/models';
import { FireAuthErrorService } from '@app/core/services';
import { FirestoreService } from '@app/core/services';
import { userAuthAction } from '@app/store/user-auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private firestoreService: FirestoreService,
    private fireAuthErrorService: FireAuthErrorService,
    private store: Store
  ) {}

  getAuthUser(): Observable<User> {
    const currentUserUid = firebase.auth().currentUser?.uid;
    const userAuth = this.firestoreService.getFromCollection(
      'users/',
      currentUserUid as string
    ) as Observable<User>;

    return userAuth;
  }

  async logoutUser(): Promise<void> {
    this.store.dispatch(userAuthAction.logoutAuthUser());
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);

      this.store.dispatch(
        userAuthAction.getAuthUserSuccess({
          user: await firstValueFrom(this.getAuthUser()),
        })
      );
    } catch (err) {
      this.fireAuthErrorService.showFireAuthErrors(err);
    }
  }

  async signUp(user: User, password: string): Promise<void> {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(
        user.email as string,
        password
      );

      const userUid = (userCredential.user as firebase.User).uid;

      this.firestoreService.setCollection('users', userUid, { ...user, id: userUid });

      this.store.dispatch(
        userAuthAction.getAuthUserSuccess({
          user: await firstValueFrom(this.getAuthUser()),
        })
      );
    } catch (err) {
      this.fireAuthErrorService.showFireAuthErrors(err);
    }
  }

  async signOut(): Promise<void> {
    await this.auth.signOut();
    this.logoutUser();
  }
}
