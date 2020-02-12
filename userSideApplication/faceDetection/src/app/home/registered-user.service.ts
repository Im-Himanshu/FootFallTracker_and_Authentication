import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";
declare var faceapi: any;
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class RegisteredUserService {
  appLoader: any;
  isModelLoaded = false;

  constructor(
    public loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  async presentLoading(message: string) {
    this.appLoader = await this.loadingController.create({
      message: message,
      spinner: "dots"
    });
    await this.appLoader.present();
  }

  async dismissLoader() {
    this.appLoader.dismiss();
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  LoadModels() {
    if (this.isModelLoaded) {
      return Promise.resolve();
    }
    this.presentLoading("Loading Models...Please wait");
    return Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromUri("assets/face-apiModel"),
      faceapi.nets.faceLandmark68Net.loadFromUri("assets/face-apiModel"),
      faceapi.nets.ssdMobilenetv1.loadFromUri("assets/face-apiModel"),
      faceapi.nets.tinyFaceDetector.loadFromUri("assets/face-apiModel"),
      faceapi.nets.faceLandmark68Net.loadFromUri("assets/face-apiModel"),
      faceapi.nets.faceRecognitionNet.loadFromUri("assets/face-apiModel"),
      faceapi.nets.faceExpressionNet.loadFromUri("assets/face-apiModel")
    ]).then(data => {
      this.isModelLoaded = true;
      this.dismissLoader();
      this.presentToast("Model loaded Successfully");
    });
  }
}
