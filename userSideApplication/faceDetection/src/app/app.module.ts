import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';



import { AppRoutingModule } from './app-routing.module';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/File/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { Media } from '@ionic-native/media/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { VideoCaptureComponent } from "./video-capture/video-capture.component"
import { SimonVideoStreamWithStorageComponent } from "./simon-video-stream-with-storage/simon-video-stream-with-storage.component"
import { AppComponent } from './app.component';
import { LoginComponent } from "./login/login.component"
import { RegisterComponent } from "./register/register.component"

import { AuthService } from "./auth.service"
import { AuthGuardService } from "./auth-guard.service"

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";

var firebaseConfig = {
  apiKey: "AIzaSyCoSbA7gr4PCa4FOZdXLWwHzwabL3HMe2w",
  authDomain: "footfalltracker-cc13e.firebaseapp.com",
  databaseURL: "https://footfalltracker-cc13e.firebaseio.com",
  projectId: "footfalltracker-cc13e",
  storageBucket: "footfalltracker-cc13e.appspot.com",
  messagingSenderId: "547144083590",
  appId: "1:547144083590:web:96d99c2020a02ca51b0907",
  measurementId: "G-YF5RVVQF0D"
}
@NgModule({
  declarations: [AppComponent, VideoCaptureComponent, SimonVideoStreamWithStorageComponent, RegisterComponent, LoginComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    MediaCapture,
    Media,
    File,
    ImagePicker,
    StreamingMedia,
    PhotoViewer,
    AuthService,
    AuthGuardService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
