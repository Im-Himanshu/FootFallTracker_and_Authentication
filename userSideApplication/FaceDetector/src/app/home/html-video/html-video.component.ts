import { Component, OnInit, AfterViewInit, ElementRef,Renderer2} from '@angular/core';
import { ViewChild } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as faceapi from "face-api.js"
@Component({
  selector: 'app-html-video',
  templateUrl: './html-video.component.html',
  styleUrls: ['./html-video.component.scss'],
})
export class HtmlVideoComponent implements OnInit,AfterViewInit {
  
  @ViewChild('videoElement', {static:true}) videoElement: any;  
  video: any;
  isPlaying = false;

  displayControls = true;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;

  constructor(private renderer: Renderer2){
    

  }
  ngOnInit() {
    
  }

  onPlayVideo(){
    console.log("playing video")
  }

  async loadModel() {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('../../../assets/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('../../../assets/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('../../../assets/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/../../../assets/models')
    ]).then(data=>{
      this.start();
    }

    )
  }

  

  // async predict(imageData: ImageData) {

  //   await tf.tidy(() => {
  
  //     // Convert the canvas pixels to a Tensor of the matching shape
  //     let img = tf.fromPixels(imageData, 1);
  //     img = img.reshape([1, 28, 28, 1]);
  //     img = tf.cast(img, 'float32');
  
  //     // Make and format the predications
  //     const output = this.model.predict(img) as any;
  
  //     // Save predictions on the component
  //     this.predictions = Array.from(output.dataSync()); 
  //   });
  
  // }



// control for video input


  ngAfterViewInit(){
    this.video = this.videoElement.nativeElement;

  }

  start() {
    this.initCamera({ video: true, audio: false });
  }
   sound() {
    this.initCamera({ video: true, audio: true });
  }

  capture(){

    let videoHeight = this.video.videoHeight;
    let videoWidth = this.video.videoWidth;

    this.renderer.setProperty(this.canvas.nativeElement, 'width', videoWidth);
    this.renderer.setProperty(this.canvas.nativeElement, 'height', videoHeight);
    console.log(JSON.stringify(this.videoElement.nativeElement));
    console.log(this.videoElement.nativeElement);
    this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);

  }
  
  initCamera(config:any) {
    var browser = <any>navigator;

    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);

    browser.mediaDevices.getUserMedia(config).then(stream => {
       // this stream could be a media source as well......
      // const mediaStream = new MediaStream(); // in our case this is the browser media for source could be a local file as well
      
      // const video = document.getElementById('video-player');
      // video.srcObject = mediaStream;
      console.log(JSON.stringify(stream))
      this.video.srcObject = stream;
      this.video.play();
      this.onPlayVideo();
    });
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
