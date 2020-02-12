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
  selector: "app-track-activities",
  templateUrl: "./track-activities.component.html",
  styleUrls: ["./track-activities.component.scss"]
})
export class TrackActivitiesComponent implements OnInit {
  @ViewChild("video", { static: true }) video: ElementRef; //canvas
  @ViewChild("canvas", { static: true }) canvas: ElementRef;
  model: any;
  loading = false;
  istoShowSpinner = true;
  constructor() {}
  async ngOnInit() {}

  async ngAfterViewInit() {
    Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromUri("assets/face-apiModel"),
      faceapi.nets.faceLandmark68Net.loadFromUri("assets/face-apiModel"),
      faceapi.nets.ssdMobilenetv1.loadFromUri("assets/face-apiModel"),
      faceapi.nets.tinyFaceDetector.loadFromUri("assets/face-apiModel"),
      faceapi.nets.faceLandmark68Net.loadFromUri("assets/face-apiModel"),
      faceapi.nets.faceRecognitionNet.loadFromUri("assets/face-apiModel"),
      faceapi.nets.faceExpressionNet.loadFromUri("assets/face-apiModel")
    ]).then(data => {
      this.startVideo();
    });
  }

  startVideo() {
    const vid = this.video.nativeElement; // feeding everytime in case firsttime it didn't worked
    if (navigator.mediaDevices.getUserMedia) {
      // this is only working for the local host if the ip is changed to the new one it will not work, see an alternative for this from     somewhere
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(stream => {
          vid.srcObject = stream;
        })
        .catch(error => {
          console.log("Something went wrong!");
        });
    }
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
