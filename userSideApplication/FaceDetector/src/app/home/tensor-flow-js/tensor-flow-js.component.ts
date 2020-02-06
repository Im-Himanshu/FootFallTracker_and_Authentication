import { Component, OnInit, AfterViewInit, ElementRef,Renderer2} from '@angular/core';
import { ViewChild } from '@angular/core';
import * as faceapi from "face-api.js"
@Component({
  selector: 'app-tensor-flow-js',
  templateUrl: './tensor-flow-js.component.html',
  styleUrls: ['./tensor-flow-js.component.scss'],
})
export class TensorFLowJsComponent implements OnInit {
  
  @ViewChild('videoElement', {static:true}) videoElement: any;  
  video: any;
  imageUpload :any;
  isPlaying = false;

  displayControls = true;
   image;
   canvas;
   container;
   faceMatcher;
   labeledFaceDescriptors;

  constructor(private renderer: Renderer2){

  }

  ngAfterViewInit(){
    this.video = document.getElementById('videoElement');
    this.imageUpload =document.getElementById('imageUpload');
    this.loadModel();

  }



  async loadModel() {
    Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromUri('../../../assets/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('../../../assets/models'),
      faceapi.nets.ssdMobilenetv1.loadFromUri('../../../assets/models')
    ]).then(data=>{
      this.start2();
    }

    )
  }

  async imageChanged(){
    if(!this.faceMatcher) {
      this.faceMatcher = new faceapi.FaceMatcher(this.labeledFaceDescriptors, 0.6);
      document.body.append('Loaded');
    }
    if (this.image) this.image.remove()
    if (this.canvas) this.canvas.remove()
    this.image = await faceapi.bufferToImage(this.imageUpload.files[0])
    this.container.append(this.image)
    this.canvas = faceapi.createCanvasFromMedia(this.image)
    this.container.append(this.canvas)
    const displaySize = { width: this.image.width, height: this.image.height }
    faceapi.matchDimensions(this.canvas, displaySize)
    const detections = await faceapi.detectAllFaces(this.image).withFaceLandmarks().withFaceDescriptors()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    const results = resizedDetections.map(d => this.faceMatcher.findBestMatch(d.descriptor))
    results.forEach((result, i) => {
      const box = resizedDetections[i].detection.box
      const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
      drawBox.draw(this.canvas)
    })
  

  }

  async  start2() {
    this.container = document.createElement('div')
    this.container.style.position = 'relative'
    document.body.append(this.container)
    this.loadLabeledImages().then(labeledFaceDescriptors =>{
      console.log("event Published");
      this.faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
      document.body.append('Loaded')
 
    })


  }
  
  loadLabeledImages() {
    const labels = ['Black Widow', 'Captain America', 'Captain Marvel', 'Hawkeye', 'Jim Rhodes', 'Thor', 'Tony Stark']
    return Promise.all(
      labels.map(async label => {
        const descriptions = []
        for (let i = 1; i <= 2; i++) {
          const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/WebDevSimplified/Face-Recognition-JavaScript/master/labeled_images/${label}/${i}.jpg`)
          const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
          descriptions.push(detections.descriptor)
        }
  
        this.labeledFaceDescriptors = new faceapi.LabeledFaceDescriptors(label, descriptions);
        this.faceMatcher = new faceapi.FaceMatcher(this.labeledFaceDescriptors, 0.6);
        document.body.append('Loaded');
        return this.labeledFaceDescriptors;
      })
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
