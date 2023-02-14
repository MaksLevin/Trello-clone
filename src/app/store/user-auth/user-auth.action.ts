import { createAction, props } from '@ngrx/store';

import { User } from '@app/core/models/user.model';

export const getAuthUser = createAction(
  '[Get Auth User] getting',
  props<{ userUid: string | undefined; user?: Partial<User> }>()
);

export const getAuthUserSuccess = createAction('[Get Auth User] success', props<{ user: User }>());

export const getAuthUserError = createAction('[Get Auth User] Error', props<{ error: string }>());

export const updateProfilePhoto = createAction(
  '[Update Profile Photo] updating',
  props<{ profilePhoto: string; user?: Partial<User> }>()
);

export const updateProfilePhotoSuccess = createAction(
  '[Update Profile Photo] success',
  props<{ user: User }>()
);

export const updateProfilePhotoError = createAction(
  '[Update Profile Photo] Error',
  props<{ error: string }>()
);

export const logoutAuthUser = createAction('[Logout Auth User] start');

export const logoutAuthUserSuccess = createAction('[Logout Auth User] success');
