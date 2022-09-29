import { createReducer, on } from '@ngrx/store';

import { IUserAuthState } from '@app/core/models/user-auth-state';
import * as authAction from '@app/store/user-auth/user-auth.action';
import { IUser } from '@src/app/core/models/user';

export const initialState: IUserAuthState = {
  user: {} as IUser,
};

export const USER_AUTH_FEATURE_NAME: string = 'user-auth';

export const userAuthReducer = createReducer(
  initialState,
  on(
    authAction.getAuthUser, () => initialState
  ),
  on(
    authAction.getAuthUserSuccess,
    (state, { user }): IUserAuthState => ({
      ...state,
      user,
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
