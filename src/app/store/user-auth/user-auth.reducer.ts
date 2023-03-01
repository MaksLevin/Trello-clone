import { createReducer, on } from '@ngrx/store';

import { UserAuthState } from '@app/core/models';
import { userAuthAction } from '@app/store/user-auth';
import { User } from '@app/core/models';

export const initialState: UserAuthState = {
  user: {} as User,
  error: '',
};

export const USER_AUTH_FEATURE_NAME: string = 'user-auth';

export const userAuthReducer = createReducer(
  initialState,
  on(userAuthAction.getAuthUser, (): UserAuthState => initialState),
  on(
    userAuthAction.getAuthUserSuccess,
    (state, { user }): UserAuthState => ({
      ...state,
      user,
    })
  ),
  on(
    userAuthAction.getAuthUserError,
    (state, { error }): UserAuthState => ({
      ...state,
      error,
    })
  ),
  on(userAuthAction.updateProfilePhoto, (): UserAuthState => initialState),
  on(
    userAuthAction.updateProfilePhotoSuccess,
    (state, { user }): UserAuthState => ({
      ...state,
      user,
    })
  ),
  on(
    userAuthAction.updateProfilePhotoError,
    (state, { error }): UserAuthState => ({
      ...state,
      error,
    })
  ),
  on(
    userAuthAction.logoutAuthUser,
    (state): UserAuthState => ({
      ...state,
    })
  ),
  on(userAuthAction.logoutAuthUserSuccess, (): UserAuthState => initialState)
);
