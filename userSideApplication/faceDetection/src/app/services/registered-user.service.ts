import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";
declare var faceapi: any;
import { ToastController } from "@ionic/angular";
import { PhotoViewer } from "@ionic-native/photo-viewer/ngx";
import { Subject } from "rxjs";
import { AuthService } from "./auth.service"
import { ApisService, GymMember, Gym, FootFall } from "./apis.service"

@Injectable({
  providedIn: "root"
})
export class RegisteredUserService {
  appLoader: any;
  isModelLoaded = false;
  labeledFaceDescriptors: any[];
  private faceMatcher: any;
  onTabChangeEvent: Subject<any> = new Subject();
  maxDistanceAllowed = 0.6;
  index = 1;
  exsistingLabel = {};
  gymDetails: Gym;

  constructor(
    public loadingController: LoadingController,
    private toastController: ToastController,
    private apiService: ApisService
  ) {
    this.labeledFaceDescriptors = [];
    // this.faceMatcher = new faceapi.FaceMatcher(
    //   this.labeledFaceDescriptors,
    //   0.6
    // ); // not allowed
  }



  async addNonIdentifiedUser(name, descriptions) {
    if (this.exsistingLabel[name]) {
      this.presentToast("label already Exist!!");
      return;
    }
    const data = new faceapi.LabeledFaceDescriptors(name, descriptions);
    this.exsistingLabel[name] = descriptions;
    this.labeledFaceDescriptors.push(data);
    this.faceMatcher = await new faceapi.FaceMatcher(
      this.labeledFaceDescriptors,
      this.maxDistanceAllowed // greater than this will be rejected
    );
  }

  addIfNotMatching(data, description) {
    if (data.distance && data.distance > this.maxDistanceAllowed + 0.2) {
      let descriptions = [description];
      this.addNonIdentifiedUser("unknown-" + this.index, descriptions); // if it is the first one add it as a entry
      this.index++;
    }
  }

  async findMatcher(description) {
    // if does not exsist start with unknown
    if (!this.faceMatcher) {
      let descriptions = [description]; // array of description
      await this.addNonIdentifiedUser("unknown-" + this.index, descriptions); // if it is the first one add it as a entry
      this.index = this.index + 1;
    }

    let matcher = this.faceMatcher.findBestMatch(description); // everytime a new label is added this is retrained so no need to retrain this one
    this.addIfNotMatching(matcher, description);
    return matcher;
  }


  async saveUserActivity() {
    let footFall = {} as FootFall;
    footFall.GYM_ID = this.gymDetails.GYM_ID;
    footFall.MEMBER_ID = 3;
    footFall.FOOTFALL_TIMESTAMP = new Date().toISOString().slice(0, 19).replace('T', ' '); // will give the current date and time
    footFall.ENTRY_EXIT = "entry"; // has to be < 5 letter
    footFall.X_COORD_FRAC = .3;
    footFall.Y_COORD_FRAC = .3;
    this.apiService.addNewfootFall(footFall);
  }

  // 

  registerNewUser(name, descriptions) {
    if (this.exsistingLabel[name]) {
      this.presentToast("label already Exist!! Using a modified one!!");
      name = name + "-" + Math.random() * 100; // addign a random string
    }
    const data = new faceapi.LabeledFaceDescriptors(name, descriptions);
    this.exsistingLabel[name] = descriptions;
    this.labeledFaceDescriptors.push(data);
    this.faceMatcher = new faceapi.FaceMatcher(
      this.labeledFaceDescriptors,
      this.maxDistanceAllowed // greater than this will be rejected
    );
    let newGymMember = {} as GymMember
    newGymMember.GYM_ID = this.gymDetails.GYM_ID;
    newGymMember.MEMBER_NAME = name;
    newGymMember.ENCODINGS = descriptions;
    this.apiService.addNewGymMember(newGymMember); // persist in database
  }

  // load the previously registered user in the ram
  LoadExistingGymMemberDataFromBackEnd() {
    return new Promise((resolve) => {
      this.apiService.getGymMemberofOneGym(this.gymDetails.GYM_ID).subscribe(async data => {
        let allMember: any = data;
        for (let oneMember of allMember) {
          let name = oneMember.MEMBER_NAME;
          let descriptions = [];
          for (let encoding of oneMember.ENCODINGS) {
            let keys = Object.keys(encoding);
            let description = [] // because description was saving as an json not as a array
            for (let key of keys) {
              description.push(encoding[key]);
            }
            descriptions.push(Float32Array.from(description));
          }
          this.exsistingLabel[name] = [oneMember.MEMBER_ID, descriptions]; // to save this label exist
          await this.labeledFaceDescriptors.push(new faceapi.LabeledFaceDescriptors(name, descriptions));
        }
        if (this.labeledFaceDescriptors.length > 0) {
          this.faceMatcher = await new faceapi.FaceMatcher(
            this.labeledFaceDescriptors,
            this.maxDistanceAllowed // greater than this will be rejected or consider unknown
          );
        }
        resolve("done");
      })
    })
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
      faceapi.nets.faceExpressionNet.loadFromUri("assets/face-apiModel"),
      this.LoadExistingGymMemberDataFromBackEnd()
    ]).then(data => {
      this.isModelLoaded = true;
      this.dismissLoader();
      this.presentToast("Model loaded Successfully");
    });
  }

  // helper functions
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
}
