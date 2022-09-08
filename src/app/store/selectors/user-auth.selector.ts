import { createFeatureSelector, createSelector } from '@ngrx/store';

import { USER_AUTH_FEATURE_NAME } from '@app/store/reducers/userAuth.reducer';
import { IUserAuthState } from '@app/core/models/user-auth-state';

const getFeature = createFeatureSelector<IUserAuthState>(
  USER_AUTH_FEATURE_NAME
);

export const getUserAuth = createSelector(getFeature, (state) => state.user);

export const getUserAuthId = createSelector(getUserAuth, (user) =>user && user.id);
