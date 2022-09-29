import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, filter, map, switchMap, take } from 'rxjs/operators';

import * as authActions from './user-auth.action';
import { AuthService } from '@app/core/services/auth.service';
import { from } from 'rxjs';

@Injectable()
export class UserAuthEffects {
  getAuthUser$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(authActions.getAuthUser),
      map(action => ({ actionUser: action.user })),
      switchMap(({ actionUser }) =>
        this.angularFireAuth.authState.pipe(
          filter(firebaseUser => !!firebaseUser),
          map(firebaseUser => ({ actionUser, firebaseUser })),
          take(1),
        ),
      ),
      switchMap(({ actionUser, firebaseUser }) => {
        return this.authService.addAuthUser().pipe(
          take(1),
          map((user) => {
            return authActions.getAuthUserSuccess({ user });
          })
        );
      })
    );
  });

  logoutAuthUser$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(authActions.removeAuthUser),
      exhaustMap(() =>
        from(this.authService.removeUser()).pipe(
          map(() => authActions.removeAuthUserSuccess())
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private angularFireAuth: AngularFireAuth
  ) { }
}
