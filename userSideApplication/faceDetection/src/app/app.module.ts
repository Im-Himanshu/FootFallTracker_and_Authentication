import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import {VideoCaptureComponent} from "./video-capture/video-capture.component"
import {SimonVideoStreamWithStorageComponent} from "./simon-video-stream-with-storage/simon-video-stream-with-storage.component"
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MediaCapture} from '@ionic-native/media-capture/ngx';
import { Media } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';

@NgModule({
  declarations: [AppComponent,VideoCaptureComponent,SimonVideoStreamWithStorageComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    MediaCapture,
    Media,
    File
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
