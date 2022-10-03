import { createReducer, on } from '@ngrx/store';

import { IUserAuthState } from '@app/core/models/user-auth-state';
import * as authAction from '@app/store/user-auth/user-auth.action';
import { IUser } from '@src/app/core/models/user';

export const initialState: IUserAuthState = {
  user: {} as IUser,
  error: '',
};

export const USER_AUTH_FEATURE_NAME: string = 'user-auth';

export const userAuthReducer = createReducer(
  initialState,
  on(authAction.getAuthUser, (): IUserAuthState => initialState),
  on(
    authAction.getAuthUserSuccess,
    (state, { user }): IUserAuthState => ({
      ...state,
      user,
    })
  ),
  on(
    authAction.getAuthUserError,
    (state, { error }): IUserAuthState => ({
      ...state,
      error,
    })
  ),
  on(
    authAction.removeAuthUser,
    (state): IUserAuthState => ({
      ...state,
    })
  ),
  on(authAction.removeAuthUserSuccess, (): IUserAuthState => initialState)
);
