import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import {
  USER_AUTH_FEATURE_NAME,
  userAuthReducer,
} from './reducers/userAuth.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(USER_AUTH_FEATURE_NAME, userAuthReducer),
  ],
})
export class UserAuthStoreModule {}
