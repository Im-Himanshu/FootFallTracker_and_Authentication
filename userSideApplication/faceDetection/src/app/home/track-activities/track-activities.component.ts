import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy
} from "@angular/core";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";
import { RegisteredUserService } from "../../services/registered-user.service";
declare var faceapi: any;

@Component({
  selector: "app-track-activities",
  templateUrl: "./track-activities.component.html",
  styleUrls: ["./track-activities.component.scss"]
})
export class TrackActivitiesComponent implements OnInit, OnDestroy {
  @ViewChild("video", { static: true }) video: ElementRef; //canvas
  @ViewChild("canvas", { static: true }) canvas: ElementRef;

  videoNativeElement: any;
  canvasnativeElement;
  model: any;
  loading = false;
  faceDetectionProcess: any;
  isCameraClosed = true;
  liveMessages: string;
  isLiveDetectionRunning: boolean;
  public captures;
  public allDetection;
  isImageCapturingCompleted = false;
  threshold = 6;
  numPersistedFrames: number = 10;
  currentPersistedFrames;


  fixedLengthQueue(length) {
    var array = new Array();

    // array.push = () => {
    //     if (this.length >= length) {
    //         this.shift();
    //     }
    //     return Array.prototype.push.apply(this,arguments);
    // }

    return array;
  }


  istoShowSpinner = true;
  constructor(private appService: RegisteredUserService) {
    this.appService.onTabChangeEvent.subscribe(data => {
      this.toggleCamera(); // either this or that
    });

    //this.currentPersistedFrames = fixedLengthQueue(this.faceDetectionFramesLength)	
  }

  async ngOnInit() {
  }

  async ngAfterViewInit() {
    this.toggleCamera();
  }

  async ngOnDestroy() {

    if (!this.isCameraClosed) {
      this.toggleCamera();
    }

  }

  toggleCamera() {
    const vid = this.video.nativeElement;
    let stream = vid.srcObject;
    if (stream) {
      vid.srcObject = null;
      let tracks = stream.getTracks();
      tracks.forEach(function (track) {
        track.stop();
      });
      this.appService.presentToast("Camera was closed!!");
    } else {
      this.startVideo();
    }
    this.isCameraClosed = !this.isCameraClosed;
  }

  startVideo() {
    //this.appService.presentLoading("Loading Camera....");
    const vid = this.video.nativeElement; // feeding everytime in case firsttime it didn't worked
    this.videoNativeElement = vid;
    if (navigator.mediaDevices.getUserMedia) {
      // this is only working for the local host if the ip is changed to the new one it will not work, see an alternative for this from     somewhere
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(stream => {
          vid.srcObject = stream;
          vid.play();
          this.appService.presentToast("Camera is now open!!");
        })
        .catch(error => {
          console.log("Something went wrong!");
        });
    }
  }

  startTracking() {
    this.appService.LoadModels().then(async data => {
      this.isLiveDetectionRunning = true;
      //this.appService.presentLoading("Starting Detection..Please wait");
      const video = this.video.nativeElement;
      const can = this.canvas.nativeElement;
      const canvas = faceapi.createCanvasFromMedia(video);
      this.canvasnativeElement = canvas;
      can.append(canvas);
      const displaySize = {
        width: video.clientWidth,
        height: video.clientHeight
      };
      faceapi.matchDimensions(canvas, displaySize);
      this.faceDetectionProcess = setInterval(async () => {
        //if (canvas) canvas.remove();
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height); // clear previous detections
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors();
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        let results = [];
        for (let d of resizedDetections) {
          await this.appService.findMatcher(d.descriptor).then(data => {
            results.push(data);
          });
        }

        results.forEach((result, i) => {
          const box = resizedDetections[i].detection.box;
          const drawBox = new faceapi.draw.DrawBox(box, {
            label: result.toString()
          });
          console.log("existing user detected :" + result.toString());
          drawBox.draw(canvas);
        });

        this.currentPersistedFrames.push(results)

        // faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      }, 1000); // every
      //this.appService.dismissLoader();
    });
  }

  onPlay() {
    const video = this.video.nativeElement;
    const can = this.canvas.nativeElement;
    const canvas = faceapi.createCanvasFromMedia(video);
    can.append(canvas);
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        //.withFaceExpression()
        .withFaceDescriptors(); // willl give a
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      let personsFeatureinFrame = [];
      for (let resizedDetection of resizedDetections) {
        let featureVector = resizedDetection.descriptor;
        personsFeatureinFrame.push(featureVector);
      }
      console.log(JSON.stringify(personsFeatureinFrame));

      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      // faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    }, 100);
  }
}
