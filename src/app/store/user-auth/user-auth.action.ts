import { createAction, props } from '@ngrx/store';

import { IUser } from '@app/core/models/user';

export const getAuthUser = createAction(
  '[Get Auth User] getting',
  props<IUser>()
);

export const getAuthUserSuccess = createAction('[Get Auth User] success');

export const removeAuthUser = createAction('[Remove Auth User] start');

export const removeAuthUserSuccess = createAction('[Remove Auth User] success');
