import { Component, OnInit, AfterViewInit, ElementRef,Renderer2} from '@angular/core';
import { ViewChild } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as faceapi from "face-api.js"
@Component({
  selector: 'app-tensor-flow-js',
  templateUrl: './tensor-flow-js.component.html',
  styleUrls: ['./tensor-flow-js.component.scss'],
})
export class TensorFLowJsComponent implements OnInit {
  
  @ViewChild('videoElement', {static:true}) videoElement: any;  
  video: any;
  isPlaying = false;

  displayControls = true;
 
  constructor(private renderer: Renderer2){

  }




  async loadModel() {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('../../../assets/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('../../../assets/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('../../../assets/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/../../../assets/models')
    ]).then(data=>{
      this.onPlayVideo();
    }

    )
  }

  onPlayVideo(){
    const canvas = faceapi.createCanvasFromMedia(this.video)
    document.body.append(canvas)
    const displaySize = { width: this.video.width, height: this.video.height }
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(this.video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
      // console.log(detections);
      const resizedDetections = faceapi.resizeResults(detections, displaySize)
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
      faceapi.draw.drawDetections(canvas, resizedDetections)
      //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
      //faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    }, 100)

  }


  ngAfterViewInit(){
    this.video = document.getElementById('videoElement')
    this.start();

  }

  private start() {
    this.initCamera({ video: true, audio: false });
  }

  initCamera(config:any) {

    navigator.getUserMedia(
      { video: {} },
      stream => {this.video.srcObject = stream;this.video.play();},
      err => console.error(err)
    )

    
    // var browser = <any>navigator;

    // browser.getUserMedia = (browser.getUserMedia ||
    //   browser.webkitGetUserMedia ||
    //   browser.mozGetUserMedia ||
    //   browser.msGetUserMedia);

    // browser.mediaDevices.getUserMedia(config).then(stream => {
    //    // this stream could be a media source as well......
    //   // const mediaStream = new MediaStream(); // in our case this is the browser media for source could be a local file as well
      
    //   // const video = document.getElementById('video-player');
    //   // video.srcObject = mediaStream;
    //   console.log(JSON.stringify(stream))
    //   this.video.srcObject = stream;
    //   this.video.play();
    // });
  }




 


  ngOnInit() {
    
  }
 


   sound() {
    this.initCamera({ video: true, audio: true });
  }

  capture(){

    // let videoHeight = this.video.videoHeight;
    // let videoWidth = this.video.videoWidth;

    // this.renderer.setProperty(this.canvas.nativeElement, 'width', videoWidth);
    // this.renderer.setProperty(this.canvas.nativeElement, 'height', videoHeight);
    // console.log(JSON.stringify(this.videoElement.nativeElement));
    // console.log(this.videoElement.nativeElement);
    // this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);

  }
  
 

  pause() {
    this.video.pause();
  }

  toggleControls() {
    this.video.controls = this.displayControls;
    this.displayControls = !this.displayControls;
  }

  resume() {
    this.video.play();
  }

}
