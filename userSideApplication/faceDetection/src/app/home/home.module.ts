import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import {ActualTensorFlowComponent} from "./actual-tensor-flow/actual-tensor-flow.component"
import {VideoInputComponent} from "./video-input/video-input.component"
import {CameraPreview} from '@ionic-native/camera-preview/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      },
      {
        path: 'actual',
        component: ActualTensorFlowComponent
      },
      {
        path: 'videoInput',
        component: VideoInputComponent
      }
    ])
  ],
  declarations: [HomePage,ActualTensorFlowComponent,VideoInputComponent],
  providers:[CameraPreview,Diagnostic]
})
export class HomePageModule {}
