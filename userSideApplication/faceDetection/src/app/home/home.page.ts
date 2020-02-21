import { Prediction } from "./../prediction";
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";
declare var faceapi: any;
import { RegisteredUserService } from "../services/registered-user.service";

import { AuthService } from "../services/auth.service"
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  appTitle = "Foot-Fall Tracker";
  constructor(private appService: RegisteredUserService, private authService: AuthService) { }

  async ngOnInit() { }

  tabsChanging() {
    this.appService.onTabChangeEvent.next("changing");
  }

  logOut() {
    this.authService.logout();
  }
}
