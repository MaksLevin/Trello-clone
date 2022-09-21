import { createReducer, on } from '@ngrx/store';

import { IUserAuthState } from '@app/core/models/user-auth-state';
import * as authAction from '@app/store/user-auth/user-auth.action';

export const initialState: IUserAuthState = {
  user: {
    username: '',
    email: '',
    id: '',
    createdOn: new Date(),
  },
};

export const USER_AUTH_FEATURE_NAME: string = 'user-auth';

export const userAuthReducer = createReducer(
  initialState,
  on(
    authAction.getAuthUser,
    (state, user): IUserAuthState => ({
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
