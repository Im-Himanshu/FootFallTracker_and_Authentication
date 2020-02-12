import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";
import { RegisteredUserService } from "../registered-user.service";
declare var faceapi: any;
@Component({
  selector: "app-register-faces",
  templateUrl: "./register-faces.component.html",
  styleUrls: ["./register-faces.component.scss"]
})
export class RegisterFacesComponent implements OnInit {
  @ViewChild("video", { static: true }) video: ElementRef; //canvas
  @ViewChild("canvas", { static: true }) canvas: ElementRef;
  @ViewChild("canvas2", { static: true }) public canvas2: ElementRef;

  videoNativeElement: any;
  canvasnativeElement;
  model: any;
  loading = false;
  faceDetectionProcess: any;
  isCameraClosed = true;
  liveMessages: string;
  isLiveDetectionRunning: boolean;
  public captures: Array<any>;
  public allDetection: Array<any>;
  isImageCapturingCompleted = false;
  constructor(private appService: RegisteredUserService) {
    this.captures = [];
    this.allDetection = [];
  }
  async ngOnInit() {}

  async ngAfterViewInit() {
    this.toggleCamera();
  }

  toggleCamera() {
    const vid = this.video.nativeElement;
    let stream = vid.srcObject;
    if (stream) {
      vid.srcObject = null;
      let tracks = stream.getTracks();
      tracks.forEach(function(track) {
        track.stop();
      });
      this.appService.presentToast("Camera was closed!!");
      this.stopDetectingPersonInFrame();
    } else {
      this.startVideo();
    }
    this.isCameraClosed = !this.isCameraClosed;
  }
  startVideo() {
    this.appService.presentLoading("Loading Camera....");
    const vid = this.video.nativeElement; // feeding everytime in case firsttime it didn't worked
    this.videoNativeElement = vid;
    if (navigator.mediaDevices.getUserMedia) {
      // this is only working for the local host if the ip is changed to the new one it will not work, see an alternative for this from     somewhere
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(stream => {
          vid.srcObject = stream;
          vid.play();
          this.appService.dismissLoader();
          this.appService.presentToast("Camera opened...");
        })
        .catch(error => {
          console.log("Something went wrong!");
        });
    }
  }

  // this will be to show
  liveDetectPersoninFrame() {
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
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      this.performSanityCheck(resizedDetections);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      // faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    }, 1000); // every
    //this.appService.dismissLoader();
  }
  performSanityCheck(resizedDetections: any) {
    if (resizedDetections.length > 1) {
      this.liveMessages = "More than one person in frame.";
    } else if (resizedDetections.length == 0) {
      this.liveMessages =
        "No Person Detected!! this may be due to bad camera quality";
    } else {
      this.liveMessages = "Detection started!!";
    }
  }
  stopDetectingPersonInFrame() {
    if (this.faceDetectionProcess) {
      clearInterval(this.faceDetectionProcess); // this will kill the loop of liveDetection
      let canvas = this.canvasnativeElement; // clear the canvas after the draw
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      this.liveMessages = "";
    }
  }

  registerUserFromPhoto() {
    this.liveDetectPersoninFrame();
  }

  registerUserFromVideo() {
    this.appService.LoadModels().then(async data => {
      if (!this.isLiveDetectionRunning) {
        this.liveDetectPersoninFrame();
      }

      const process = setInterval(async () => {
        this.saveImageFromCurrentFrame();
        if (this.allDetection.length > 6) {
          // if the detected image size is greater then 6 exit the process.
          clearInterval(process);
          clearInterval(this.faceDetectionProcess);
          this.isLiveDetectionRunning = false;
          this.appService.presentToast("Captured Images");
          this.isImageCapturingCompleted = true;
        }
      }, 1000);
    });
  }

  reDoCapturing() {}

  async saveImageFromCurrentFrame() {
    const video = this.video.nativeElement;
    // create a canvas of size of video
    const displaySize = {
      width: video.videoWidth,
      height: video.videoHeight
    };
    faceapi.matchDimensions(this.canvas2.nativeElement, displaySize);
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    // this resize calculate the x,y cordinate of features after compresign the photo to a certain width and height

    if (resizedDetections.length != 0 && resizedDetections.length < 2) {
      var context = this.canvas2.nativeElement
        .getContext("2d")
        .drawImage(
          this.video.nativeElement,
          0,
          0,
          video.videoWidth,
          video.videoHeight
        );
      this.allDetection.push(resizedDetections);
      this.captures.push(this.canvas2.nativeElement.toDataURL("image/png"));
      let oneDetection = detections[0].detection._box;
      //not working properly as of now
      // var context = this.canvas2.nativeElement.getContext("2d").drawImage(
      //   this.video.nativeElement, // this could be a problem because the algo take some time to make prediction in that case canvas would have already moved
      //   oneDetection._x,
      //   oneDetection._y,
      //   oneDetection._width,
      //   oneDetection._y + oneDetection._height
      // );
      // this.allDetection.push(resizedDetections);
      // this.captures.push(this.canvas2.nativeElement.toDataURL("image/png"));
    }
  }
}
