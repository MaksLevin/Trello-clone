import { createFeatureSelector, createSelector } from '@ngrx/store';

import { USER_AUTH_FEATURE_NAME } from '@app/store/user-auth/userAuth.reducer';
import { IUserAuthState } from '@app/core/models/user-auth-state';

const selectGetFeature = createFeatureSelector<IUserAuthState>(
  USER_AUTH_FEATURE_NAME
);

export const selectGetUserAuth = createSelector(
  selectGetFeature,
  (state) => state.user
);
