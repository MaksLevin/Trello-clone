import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { select, Store } from '@ngrx/store';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { combineLatest, Observable, takeWhile, tap } from 'rxjs';

import * as authActions from '@app/store/user-auth/user-auth.action';
import * as authSelectors from '@app/store/user-auth/user-auth.selector';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './auth/login/login.module';
import { SharedModule } from './shared/shared.module';
import { UserAuthStoreModule } from './store/user-auth/user-auth-store.module';
import { environment } from '../environments/environment';
import { RouterSerializer } from '@app/store/routerSerializer';
import { DashboardModule } from './dashboard/dashboard.module';
import { HeaderModule } from './header/header.module';

const APP_INITIALIZER = (store: Store, auth: AngularFireAuth): Observable<any>  => {
  return combineLatest([
    auth.user ,
    store.pipe(select(authSelectors.selectGetUserAuth)),
  ]).pipe(
    takeWhile(([user, dbUser]) => !!user?.uid && Object.keys(dbUser || {}).length === 0),
    tap(([user, dbUser]) => {
      if (user && Object.keys(dbUser || {}).length === 0) {
        store.dispatch(authActions.getAuthUserSuccess(dbUser));
      }
    })
  );
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    SharedModule,
    LoginModule,
    DashboardModule,
    HeaderModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      serializer: RouterSerializer,
    }),
    UserAuthStoreModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  exports: [SharedModule],
  providers: [{provide: APP_INITIALIZER, useFactory: APP_INITIALIZER}],
  bootstrap: [AppComponent],
})
export class AppModule {}
