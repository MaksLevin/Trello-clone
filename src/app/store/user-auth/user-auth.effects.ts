import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, filter, map, switchMap, take } from 'rxjs/operators';
import { from } from 'rxjs';

import * as authActions from './user-auth.action';
import { AuthService } from '@app/core/services';

@Injectable()
export class UserAuthEffects {
  getAuthUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.getAuthUser),
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
      ofType(authActions.logoutAuthUser),
      exhaustMap(() => {
        return from(this.authService.logoutUser()).pipe(
          take(1),
          map(() => authActions.logoutAuthUserSuccess())
        );
      })
    );
  });

  constructor(private actions$: Actions, private authService: AuthService) {}
}
