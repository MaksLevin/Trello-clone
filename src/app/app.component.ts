import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as authActions from '@app/store/user-auth/user-auth.action';
import * as authSelectors from '@app/store/user-auth/user-auth.selector';
import { AuthService } from './core/services/auth.service';
import { IUser } from './core/models/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { combineLatest, Observable, takeWhile, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Trello-clone';

  constructor(private store: Store, private auth: AngularFireAuth) {}
  appIni(): Observable<any> {
    return combineLatest([
      this.auth.user ,
      this.store.pipe(select(authSelectors.selectGetUserAuth)),
    ]).pipe(
      takeWhile(([user, dbUser]) => !!user?.uid && Object.keys(dbUser || {}).length === 0),
      tap(([user, dbUser]) => {
        if (user && Object.keys(dbUser || {}).length === 0) {
          this.store.dispatch(authActions.getAuthUserSuccess(dbUser));
        }
      })
    );
  }

  ngOnInit(): void {
    this.appIni();
  }
}
