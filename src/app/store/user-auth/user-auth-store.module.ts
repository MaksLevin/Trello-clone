import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { USER_AUTH_FEATURE_NAME, userAuthReducer } from './userAuth.reducer';
import { UserAuthEffects } from './user-auth.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(USER_AUTH_FEATURE_NAME, userAuthReducer),
    EffectsModule.forFeature([UserAuthEffects]),
  ],
})
export class UserAuthStoreModule {}
