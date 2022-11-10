import { createReducer, on } from '@ngrx/store';

import { UserAuthState } from '@app/core/models/user-auth-state.model';
import * as authAction from '@app/store/user-auth/user-auth.action';
import { User } from '@app/core/models/user.model';

export const initialState: UserAuthState = {
  user: {} as User,
  error: '',
};

export const USER_AUTH_FEATURE_NAME: string = 'user-auth';

export const userAuthReducer = createReducer(
  initialState,
  on(authAction.getAuthUser, (): UserAuthState => initialState),
  on(
    authAction.getAuthUserSuccess,
    (state, { user }): UserAuthState => ({
      ...state,
      user,
    })
  ),
  on(
    authAction.getAuthUserError,
    (state, { error }): UserAuthState => ({
      ...state,
      error,
    })
  ),
  on(
    authAction.logoutAuthUser,
    (state): UserAuthState => ({
      ...state,
    })
  ),
  on(authAction.logoutAuthUserSuccess, (): UserAuthState => initialState)
);
