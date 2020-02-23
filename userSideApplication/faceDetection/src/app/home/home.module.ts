import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MatDialogModule } from "@angular/material/dialog";
import { HomePage } from "./home.page";
import { ActualTensorFlowComponent } from "./actual-tensor-flow/actual-tensor-flow.component";
import { VideoInputComponent } from "./video-input/video-input.component";
import { CameraPreview } from "@ionic-native/camera-preview/ngx";
import { Diagnostic } from "@ionic-native/diagnostic/ngx";
import { RegisterFacesComponent } from "./register-faces/register-faces.component";
import { TrackActivitiesComponent } from "./track-activities/track-activities.component";
import { DialogOverviewExampleDialog } from "./register-and-track/register-and-track.component";
import { MatButtonModule } from "@angular/material/button";
import { ApisService } from "../services/apis.service"
import { RegisterAndTrackComponent } from "./register-and-track/register-and-track.component"
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatDialogModule,
    MatButtonModule,
    RouterModule.forChild([
      {
        path: "",
        component: HomePage,
        children: [
          {
            path: "",
            redirectTo: "registerTrack",
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
            path: "registerTrack",
            component: RegisterAndTrackComponent
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
    TrackActivitiesComponent,
    RegisterAndTrackComponent,
    DialogOverviewExampleDialog
  ],
  providers: [CameraPreview, Diagnostic, ApisService],
  entryComponents: [DialogOverviewExampleDialog]
})
export class HomePageModule { }
