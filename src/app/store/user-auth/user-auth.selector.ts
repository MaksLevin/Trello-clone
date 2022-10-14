import { createFeatureSelector, createSelector } from '@ngrx/store';

import { USER_AUTH_FEATURE_NAME } from '@app/store/user-auth/userAuth.reducer';
import { UserAuthState } from '@src/app/core/models/user-auth-state.model';

const selectGetFeature = createFeatureSelector<UserAuthState>(USER_AUTH_FEATURE_NAME);

export const selectGetUserAuth = createSelector(selectGetFeature, (state) => state.user);

export const selectGetUserAuthId = createSelector(selectGetUserAuth, (user) => user && user.id);
