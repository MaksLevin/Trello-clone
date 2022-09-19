import { createReducer, on } from '@ngrx/store';

import { IUserAuthState } from '@app/core/models/user-auth-state';
import { getAuthUser } from '@app/store/user-auth/user-auth.action';

const initialState: IUserAuthState = {
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
    getAuthUser,
    (state, user): IUserAuthState => ({
      ...state,
      user,
    })
  )
);
