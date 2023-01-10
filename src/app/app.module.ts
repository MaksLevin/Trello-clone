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
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from '@app/auth/auth.module';
import { SharedModule } from '@app/shared/shared.module';
import { UserAuthStoreModule } from '@app/store/user-auth';
import { environment } from '../environments/environment';
import { RouterSerializer } from '@app/store/router-serializer';
import { DashboardModule } from '@app/dashboard/dashboard.module';
import { HeaderModule } from '@app/header/header.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    AuthModule,
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
  bootstrap: [AppComponent],
})
export class AppModule {}
