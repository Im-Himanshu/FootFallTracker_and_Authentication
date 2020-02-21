import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Inject
} from "@angular/core";
import { RegisteredUserService } from "../../services/registered-user.service";
declare var faceapi: any;
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { ApisService } from "../../services/apis.service"
@Component({
  selector: 'app-register-and-track',
  templateUrl: './register-and-track.component.html',
  styleUrls: ['./register-and-track.component.scss'],
})
export class RegisterAndTrackComponent implements OnInit {
  @ViewChild("video", { static: true }) video: ElementRef; //canvas
  @ViewChild("canvas", { static: true }) canvas: ElementRef;
  @ViewChild("canvas3", { static: true }) canvas2: ElementRef;

  videoNativeElement: any;
  canvasnativeElement;
  model: any;
  loading = false;
  trackingProcess: any;
  registrationProcess: any;
  liveMessages: string;
  public captures;
  public allDetection;
  registrationProcesStatus = 0; // 0-notstarted, 1- running, 2- completed
  istrackingProcessRunning = false;
  threshold = 6;
  isCameraOpen = false;
  constructor(
    private appService: RegisteredUserService,
    public dialog: MatDialog,
    private apiService: ApisService

  ) {
    this.captures = [];
    this.allDetection = [];
  }
  async ngOnInit() {
  }



  triggerService() {
    let formData = {
      "GYM_ID": "10",
      "GYM_NAME": "ABS-UI",
      "AUTH_METHOD": "gmail",
      "PASSWD": "random"
    }
    this.apiService.addNewGym(formData);
    this.apiService.getAllGyms();

  }

  async ngOnDestroy() {
    this.closeCameraStream();
    this.stopAllProcess()

  }

  createAndSetCanvas() {
    if (this.canvasnativeElement) return; // if exist return else create and push it
    this.canvasnativeElement = faceapi.createCanvasFromMedia(this.video.nativeElement)
    const can = this.canvas.nativeElement; //reference to the div
    can.append(this.canvasnativeElement); // inserting into the div
    return;
  }


  changeCamera() {
    if (this.isCameraOpen) { //was the camera closed...
      this.openCameraStream();
    }
    else {
      this.closeCameraStream();
    }

  }
  saveActivity() {
    this.appService.saveUserActivity();
  }


  closeCameraStream() {
    const vid = this.video.nativeElement;
    let stream = vid.srcObject;
    if (stream) {
      vid.srcObject = null;
      let tracks = stream.getTracks();
      tracks.forEach(function (track) {
        track.stop();
      });
      this.appService.presentToast("Camera was closed!!");
    }
  }

  openCameraStream() {
    const vid = this.video.nativeElement; // feeding everytime in case firsttime it didn't worked
    this.videoNativeElement = vid;
    if (navigator.mediaDevices.getUserMedia) {
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
      const video = this.video.nativeElement;
      await this.createAndSetCanvas();
      const canvas = this.canvasnativeElement
      const displaySize = {
        width: video.clientWidth,
        height: video.clientHeight
      };
      faceapi.matchDimensions(canvas, displaySize);
      this.trackingProcess = setInterval(async () => {
        //if (canvas) canvas.remove();
        this.istrackingProcessRunning = true;
        if (!this.isCameraOpen) {
          this.appService.presentToast("Camera Was closed during Tracking Process");
          this.stopTracking();
        }
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
      }, 1000); // every
      //this.appService.dismissLoader();
    });
  }

  stopTracking() {
    clearInterval(this.trackingProcess); // stop the tracking process
    this.trackingProcess = null;
    this.istrackingProcessRunning = false;
    let canvas = this.canvasnativeElement; // clear the canvas after the draw
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    this.liveMessages = null;
  }



  // entry point for control-2 start registration
  registerUserFromVideo() {
    //this.stopAllProcess(); // first stop all the process then only start this...
    this.appService.LoadModels().then(async data => {
      const video = this.video.nativeElement;
      await this.createAndSetCanvas();
      const canvas = this.canvasnativeElement // initialize in the constructor
      const canvasForImage = faceapi.createCanvasFromMedia(video); // canvas for saving the photos
      const displaySize = {
        width: video.clientWidth,
        height: video.clientHeight
      };
      const displaySize2 = {
        width: video.videoWidth,
        height: video.videoHeight
      };
      faceapi.matchDimensions(canvas, displaySize);
      faceapi.matchDimensions(canvasForImage, displaySize2);
      this.registrationProcesStatus = 1;
      this.registrationProcess = setInterval(async () => {
        if (!this.isCameraOpen) {
          this.appService.presentToast("Camera Was closed during registration Process..");
          this.registrationProcesStatus = 0;
          this.afterRegistrationEnd();
          return;
        }
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        this.performSanityCheck(resizedDetections);

        // draw detection
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        /// save detections
        if (resizedDetections.length != 0 && resizedDetections.length < 2) {
          var context = canvasForImage
            .getContext("2d")
            .drawImage(
              this.video.nativeElement,
              0,
              0,
              video.videoWidth,
              video.videoHeight
            );
          this.allDetection.push(resizedDetections[0].descriptor);
          this.captures.push(canvasForImage.toDataURL("image/png"));
        }
        if (this.allDetection.length >= 6) {
          this.afterRegistrationEnd();
          this.registrationProcesStatus = 2;
          this.appService.presentToast("Captured Images");
          this.submitDetails();
        }
      }, 1000);
    });
  }


  afterRegistrationEnd() {
    clearInterval(this.registrationProcess);
    this.registrationProcesStatus = 0;
    this.registrationProcess = null;
    let canvas = this.canvasnativeElement; // clear the canvas after the draw
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    this.liveMessages = null;

  }
  toggleProcess() {
    if (this.registrationProcess) {
      this.afterRegistrationEnd();
    }
    else {
      this.registerUserFromVideo();
    }
  }

  reDoCapturing() {
    this.afterRegistrationEnd();
    this.allDetection = [];
    this.captures = [];
    this.registerUserFromVideo();
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


  stopAllProcess() {
    clearInterval(this.trackingProcess);
    clearInterval(this.registrationProcess);
    this.registrationProcess = null;
    this.trackingProcess = null;
  }





  removeImage(i) {
    this.captures.splice(i, 1);
    this.allDetection.splice(i, 1);
    this.appService.presentToast("Image removed!!");
  }

  submitDetails(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: "250px",
      data: this.captures
    });

    dialogRef.afterClosed().subscribe(result => {
      this.saveData(result);
    });
  }

  saveData(name) {
    this.appService.registerNewUser(name, this.allDetection);
    this.captures = [];
    this.allDetection = [];
    this.registrationProcesStatus = 0;
    this.appService.presentToast("Successfully Added!!!");
  }
}

@Component({
  selector: "confirmationDialog",
  templateUrl: "confirmationDialog.html"
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }





}
