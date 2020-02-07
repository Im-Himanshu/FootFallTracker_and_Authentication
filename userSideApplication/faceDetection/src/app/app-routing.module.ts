import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {VideoCaptureComponent} from "./video-capture/video-capture.component"
import { VideoCapturePlus} from '@ionic-native/video-capture-plus/ngx';
import {SimonVideoStreamWithStorageComponent} from "./simon-video-stream-with-storage/simon-video-stream-with-storage.component"


const routes: Routes = [
  //{ path: '', component :SimonVideoStreamWithStorageComponent },
  { path: 'second', component :VideoCaptureComponent },
  { path: 'third', component :SimonVideoStreamWithStorageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers :[VideoCapturePlus]
})
export class AppRoutingModule { }
