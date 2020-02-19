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
import { RegisteredUserService } from "./registered-user.service";
import { DialogOverviewExampleDialog } from "./register-faces/register-faces.component";
import { MatButtonModule } from "@angular/material/button";
import { HttpClientModule } from '@angular/common/http';
import { ApisService } from "./services/apis.service"
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
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
    TrackActivitiesComponent,
    DialogOverviewExampleDialog
  ],
  providers: [CameraPreview, Diagnostic, RegisteredUserService, ApisService],
  entryComponents: [DialogOverviewExampleDialog]
})
export class HomePageModule { }
