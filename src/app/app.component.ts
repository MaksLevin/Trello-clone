import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, takeWhile, tap } from 'rxjs';

import * as authActions from '@app/store/user-auth/user-auth.action';
import * as authSelectors from '@app/store/user-auth/user-auth.selector';
import { User, UserAuthState } from '@app/core/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Trello-clone';

  constructor(private store: Store<UserAuthState>, private auth: AngularFireAuth) {}

  addUserInStore(): Observable<User | {}> {
    return combineLatest([
      this.auth.user,
      this.store.pipe(select(authSelectors.selectGetUserAuth)),
    ]).pipe(
      takeWhile(([user, dbUser]) => !!user?.uid && Object.keys(dbUser || {}).length === 0),
      tap(([user, dbUser]) => {
        if (user && Object.keys(dbUser || {}).length === 0) {
          this.store.dispatch(authActions.getAuthUser({ userUid: user.uid }));
        }
      })
    );
  }

  isUserLoggedIn$ = this.store.select(authSelectors.selectGetUserAuthId);

  ngOnInit(): void {
    this.addUserInStore().subscribe({
      error: (err) => console.log('Error:', err),
      complete: () => console.log('User logged in'),
    });
  }
}
