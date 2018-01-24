import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { AdMobFree } from '@ionic-native/admob-free';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RulesPage } from '../pages/rules/rules';
import { PlayPage } from '../pages/play/play';
import { ThemesPage } from '../pages/themes/themes';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { XpProvider } from '../providers/xp/xp';
import { LevelProvider } from '../providers/level/level';


const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '56a735d9'
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RulesPage,
    PlayPage,
    ThemesPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: false } ),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RulesPage,
    PlayPage,
    ThemesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    XpProvider,
    AdMobFree,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LevelProvider
  ]
})
export class AppModule {}
