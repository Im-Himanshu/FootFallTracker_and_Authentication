import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { HomePage } from "./home.page";
import { ActualTensorFlowComponent } from "./actual-tensor-flow/actual-tensor-flow.component";
import { VideoInputComponent } from "./video-input/video-input.component";
import { CameraPreview } from "@ionic-native/camera-preview/ngx";
import { Diagnostic } from "@ionic-native/diagnostic/ngx";
import { RegisterFacesComponent } from "./register-faces/register-faces.component";
import { TrackActivitiesComponent } from "./track-activities/track-activities.component";
import { RegisteredUserService } from "./registered-user.service";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: "",
        component: HomePage,
        children: [
          {
            path: "",
            redirectTo: "register",
            pathMatch: "full"
          },
          {
            path: "register",
            component: RegisterFacesComponent
          },
          {
            path: "track",
            component: TrackActivitiesComponent
          },
          {
            path: "actual",
            component: ActualTensorFlowComponent
          },
          {
            path: "videoInput",
            component: VideoInputComponent
          }
        ]
      }
    ])
  ],
  declarations: [
    HomePage,
    ActualTensorFlowComponent,
    VideoInputComponent,
    RegisterFacesComponent,
    TrackActivitiesComponent
  ],
  providers: [CameraPreview, Diagnostic, RegisteredUserService]
})
export class HomePageModule {}
