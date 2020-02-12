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
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  appTitle = "Foot-Fall Tracker";
  constructor() {}

  async ngOnInit() {}
}
