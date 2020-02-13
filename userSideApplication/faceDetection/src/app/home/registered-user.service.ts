import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";
declare var faceapi: any;
import { ToastController } from "@ionic/angular";
import { PhotoViewer } from "@ionic-native/photo-viewer/ngx";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RegisteredUserService {
  appLoader: any;
  isModelLoaded = false;
  labeledFaceDescriptors: any[];
  private faceMatcher: any;
  onTabChangeEvent: Subject<any> = new Subject();

  constructor(
    public loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.labeledFaceDescriptors = [];
    // this.faceMatcher = new faceapi.FaceMatcher(
    //   this.labeledFaceDescriptors,
    //   0.6
    // ); // not allowed
  }

  async addLabeledData(name, descriptions) {
    const data = new faceapi.LabeledFaceDescriptors(name, descriptions);
    this.labeledFaceDescriptors.push(data);
    this.faceMatcher = await new faceapi.FaceMatcher(
      this.labeledFaceDescriptors,
      0.6
    );
  }

  async findMatcher(description) {
    if (!this.faceMatcher) {
      let descriptions = [description]; // array of description
      await this.addLabeledData("unknown-1", descriptions); // if it is the first one add it as a entry
    }

    return this.faceMatcher.findBestMatch(description); // everytime a new label is added this is retrained so no need to retrain this one
  }

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
