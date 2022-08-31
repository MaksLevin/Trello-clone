import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';


import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IUser } from '../../../models/user';

@Injectable({
  providedIn: 'root',
})

//FIXME
export class UserService {
  // user: Observable<IUser>;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    // this.user = this.auth.user.pipe(
    //   switchMap((user) =>(!user) ? null : this.db.collection('Users').doc<IUser>(user.uid).valueChanges()
    //   )
    // );
  }
}
