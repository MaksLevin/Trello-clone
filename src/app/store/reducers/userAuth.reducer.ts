import { IUserAuthState } from '@app/core/models/user-auth-state';
import { IUser } from '@app/core/models/user';

import { createReducer, on } from '@ngrx/store';
import { Login } from '../actions/user-auth.action';

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
  on(Login, (state, user):IUserAuthState => ({
    ...state,
    user
  }))
);
