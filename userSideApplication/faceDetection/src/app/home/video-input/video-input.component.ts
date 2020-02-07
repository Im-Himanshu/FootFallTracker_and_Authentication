import { Component, OnInit } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { ToastController, NavController } from '@ionic/angular';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-video-input',
  templateUrl: './video-input.component.html',
  styleUrls: ['./video-input.component.scss'],
})
export class VideoInputComponent implements OnInit {
  picture;
  pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 85
  }
  constructor(private cameraPreview: CameraPreview,public navCtrl: NavController, 
    public toastCtrl: ToastController,private diagnostic: Diagnostic) {
    
   }
  ngOnInit(){
    this.checkPermissions();

  }

  async checkPermissions(){
    //isCameraAvailable() -- for checking if camera is there or not
    this.diagnostic.isCameraAuthorized().then((authorized) => {
      if(authorized){
        console.log("entered camera mode")
        this.startCamera();
      }
      else {
        this.diagnostic.requestCameraAuthorization().then(async (status) => {
              if(status == this.diagnostic.permissionStatus.GRANTED)
                  this.startCamera();
              else {
                  // Permissions not granted
                  // Therefore, create and present toast
                  const toast = await this.toastCtrl.create(
                      {
                          message: "Cannot access camera", 
                          position: "bottom",
                          duration: 5000
                      }
                  );
                  toast.present();
                  
              }
          });
      }
  });
  }

  changeEffect() {
    // Create an array with 5 effects
    let effects: any = ['none', 'negative','mono', 'aqua', 'sepia'];
 
    let randomEffect: string = effects[Math.floor(
                                Math.random() * effects.length)];
    this.cameraPreview.setColorEffect(randomEffect);
}
 
  // camera options (Size and location). In the following example, the preview uses the rear camera and display the preview in the back of the webview
   cameraPreviewOpts: CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: window.screen.width,
    height: window.screen.height,
    camera: 'rear',
    tapPhoto: true,
    previewDrag: true,
    toBack: true,
    alpha: 1
  }
  
  // start camera
startCamera(){
  this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
    (res) => {
      console.log("starting camera");
      console.log(res)
    },
    (err) => {
      console.log(err)
    });
}
  
handleCamera(){
    // Set the handler to run every time we take a picture
    // this.cameraPreview.takePicture
    
}

takePicture(){
    // picture options

    // take a picture
    this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
      this.picture = 'assets/img/test.jpg';
    });
    
}
onScreenShot(){
    // take a snap shot
    this.cameraPreview.takeSnapshot(this.pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
      this.picture = 'assets/img/test.jpg';
    });
}
  
  
switchCamera(){
    // Switch camera
    this.cameraPreview.switchCamera();
  
}

setColorEffect(){
    // set color effect to negative
    this.cameraPreview.setColorEffect('negative');
  
}
stopCamera(){
    // Stop the camera preview
    this.cameraPreview.stopCamera();
}

}
