import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, filter, map, switchMap, take } from 'rxjs/operators';
import { from } from 'rxjs';

import * as authActions from './user-auth.action';
import { AuthService } from '@app/core/services/auth.service';

@Injectable()
export class UserAuthEffects {
  getAuthUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.getAuthUser),
      map((action) => ({ actionUser: action.user })),
      switchMap(({ actionUser }) =>
        this.angularFireAuth.authState.pipe(
          filter((firebaseUser) => !!firebaseUser),
          map((firebaseUser) => ({ actionUser, firebaseUser })),
          take(1)
        )
      ),
      switchMap(() => {
        return this.authService.getAuthUser().pipe(
          take(1),
          map((user) => {
            if (!user) {
              return authActions.getAuthUserError({
                error: 'Failed to load user data',
              });
            }
            return authActions.getAuthUserSuccess({ user });
          })
        );
      })
    );
  });

  logoutAuthUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.removeAuthUser),
      exhaustMap(() => {
        return from(this.authService.removeUser()).pipe(
          take(1),
          map(() => authActions.removeAuthUserSuccess())
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private angularFireAuth: AngularFireAuth
  ) {}
}
