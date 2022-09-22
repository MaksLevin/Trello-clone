import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs/operators';
import { from } from 'rxjs';

import * as authActions from './user-auth.action';
import { AuthService } from '@app/core/services/auth.service';

@Injectable()
export class UserAuthEffects {
  getAuthUser$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(authActions.getAuthUser),
      exhaustMap(() =>
        from(this.authService.addAuthUser()).pipe(
          map(() => authActions.getAuthUserSuccess())
        )
      )
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

  constructor(private actions$: Actions, private authService: AuthService) {}
}
