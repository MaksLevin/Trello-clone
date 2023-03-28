import { createReducer, on } from '@ngrx/store';

import { UserAuthState } from '@app/core/models';
import * as authActions from './user-auth.action';
import { User } from '@app/core/models';

export const initialState: UserAuthState = {
  user: {} as User,
  error: '',
};

export const USER_AUTH_FEATURE_NAME: string = 'user-auth';

export const userAuthReducer = createReducer(
  initialState,
  on(authActions.getAuthUser, (): UserAuthState => initialState),
  on(
    authActions.getAuthUserSuccess,
    (state, { user }): UserAuthState => ({
      ...state,
      user,
    })
  ),
  on(
    authActions.getAuthUserError,
    (state, { error }): UserAuthState => ({
      ...state,
      error,
    })
  ),
  on(authActions.updateProfilePhoto, (): UserAuthState => initialState),
  on(
    authActions.updateProfilePhotoSuccess,
    (state, { user }): UserAuthState => ({
      ...state,
      user,
    })
  ),
  on(
    authActions.updateProfilePhotoError,
    (state, { error }): UserAuthState => ({
      ...state,
      error,
    })
  ),
  on(
    authActions.logoutAuthUser,
    (state): UserAuthState => ({
      ...state,
    })
  ),
  on(authActions.logoutAuthUserSuccess, (): UserAuthState => initialState)
);
