import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AccessPage } from '../pages/access/access';
import { AccountPage } from '../pages/account/account';
import { UserPage } from '../pages/user/user';
import { TabsPage } from '../pages/tabs/tabs';
import { ServerPage } from '../pages/server/server';

import { KeycloakService } from '../services/keycloak.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AccessPage,
    AccountPage,
    UserPage,
    TabsPage,
    ServerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccessPage,
    AccountPage,
    UserPage,
    TabsPage,
    ServerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    KeycloakService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
