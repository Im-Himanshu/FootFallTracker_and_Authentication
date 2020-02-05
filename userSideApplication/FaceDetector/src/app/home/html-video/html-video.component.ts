import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
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

  ngOnInit() {
    
  }
  ngAfterViewInit(){
    this.video = this.videoElement.nativeElement;

  }

  start() {
    this.initCamera({ video: true, audio: false });
  }
   sound() {
    this.initCamera({ video: true, audio: true });
  }
  
    initCamera(config:any) {
    var browser = <any>navigator;

    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);

    browser.mediaDevices.getUserMedia(config).then(stream => {
      // this stream could be a media source as well......
      this.video.srcObject = stream;
      this.video.play();
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
