import { Component, OnInit } from '@angular/core';
import { VideoCapturePlus, VideoCapturePlusOptions, MediaFile } from '@ionic-native/video-capture-plus/ngx';

@Component({
  selector: 'app-video-capture',
  templateUrl: './video-capture.component.html',
  styleUrls: ['./video-capture.component.scss'],
})

/** not working**/
export class VideoCaptureComponent implements OnInit {

  constructor(private videoCapturePlus: VideoCapturePlus) { }

  ngOnInit() {

    const options: VideoCapturePlusOptions = {
      limit: 1,
      highquality: true,
      portraitOverlay: 'assets/img/portrait.jpg',
      landscapeOverlay: 'assets/img/landscape.jpg'
   }
   
   this.videoCapturePlus.captureVideo(options).then(mediafile =>{
    console.log(mediafile)
   },
   error => {
     console.error(error)
    console.log('Something went wrong')
   }
    )
   }
    

  

}
