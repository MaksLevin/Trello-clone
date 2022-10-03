import { createAction, props } from '@ngrx/store';

import { IUser } from '@app/core/models/user';

export const getAuthUser = createAction(
  '[Get Auth User] getting',
  props<{ userUid: string | undefined; user?: Partial<IUser> }>()
);

export const getAuthUserSuccess = createAction(
  '[Get Auth User] success',
  props<{ user: IUser }>()
);

export const getAuthUserError = createAction(
  '[Get Auth User] Error',
  props<{ error: string }>()
);

export const removeAuthUser = createAction('[Remove Auth User] start');

export const removeAuthUserSuccess = createAction('[Remove Auth User] success');
