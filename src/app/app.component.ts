import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, takeWhile, tap } from 'rxjs';

import { userAuthSelector, userAuthAction } from '@app/store/user-auth';
import { AppStateStore, User } from '@app/core/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Trello-clone';

  constructor(private store: Store<AppStateStore>, private auth: AngularFireAuth) {}

  addUserInStore(): Observable<User | {}> {
    return combineLatest([
      this.auth.user,
      this.store.pipe(select(userAuthSelector.selectGetUserAuth)),
    ]).pipe(
      takeWhile(([user, dbUser]) => !!user?.uid && Object.keys(dbUser || {}).length === 0),
      tap(([user, dbUser]) => {
        if (user && Object.keys(dbUser || {}).length === 0) {
          this.store.dispatch(userAuthAction.getAuthUser({ userUid: user.uid }));
        }
      })
    );
  }

  isUserLoggedIn$ = this.store.select(userAuthSelector.selectGetUserAuthId);

  ngOnInit(): void {
    this.addUserInStore().subscribe({
      error: (err) => console.log('Error:', err),
      complete: () => console.log('User logged in'),
    });
  }
}
