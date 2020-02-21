import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { VideoCaptureComponent } from "./video-capture/video-capture.component";
import { VideoCapturePlus } from "@ionic-native/video-capture-plus/ngx";
import { SimonVideoStreamWithStorageComponent } from "./simon-video-stream-with-storage/simon-video-stream-with-storage.component";
import { LoginComponent } from "./login/login.component"
import { RegisterComponent } from "./register/register.component"
import { AuthGuardService } from "./services/auth-guard.service"


const routes: Routes = [
  //{ path: '', component :SimonVideoStreamWithStorageComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "", redirectTo: "main", pathMatch: "full" },
  {
    path: "main",
    canActivate: [AuthGuardService], // all these subpath will now need to require login
    loadChildren: () => import("./home/home.module").then(m => m.HomePageModule)
  },
  // { path: "second", component: VideoCaptureComponent },
  // { path: "third", component: SimonVideoStreamWithStorageComponent },
  // { path: "", redirectTo: "main", pathMatch: "full" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule],
  providers: [VideoCapturePlus]
})
export class AppRoutingModule { }
