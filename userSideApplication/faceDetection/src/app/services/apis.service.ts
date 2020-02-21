import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApisService {
  baseUrl = "http://localhost:5000/"

  private getAllgyms_subUrl = "getAllGyms"
  private getGymDetails_suburl = "getGymDetails/"; // requires <gym_id>
  private addNewGym_subUrl = "addNewGym"
  private updateGym_subUrl = "updateGym/"; // requires <gym_id>;
  // create one more url which will fire a given query provided from the UI directly

  private getAllGymMember_subUrl = "getAllGymMember";
  private getGymMemberDetails_subUrl = "getGymMemberDetails/";  // requires <Member_id>;
  private getGymMemberofOneGym_subUrl = "getGymMemberofOneGym/";  // requires <gym_id>;
  private addNewGymMember_subUrl = "addNewGymMember" //addNewGymMember
  private updateGymMember_subUrl = "updateGymMember/"

  private getAllfootFalls_subUrl = "getAllfootFalls";
  private getfootFallDetails_subUrl = "getfootFallDetails/"; // requires <footFall_id>;
  private addNewfootFall_subUrl = "addNewfootFall";
  private updatefootFall_subUrl = "updatefootFall/" //requires <footFall_id>;
  constructor(private http: HttpClient) { }


  public getAllGyms() {
    this.getRequest(this.getAllgyms_subUrl).subscribe(data => {
      console.log(JSON.stringify(data));
    }
    )
  }
  public getOneGym(gym_id) {
    return this.getRequest(this.getGymDetails_suburl + gym_id)
  }
  public addNewGym(formData: any) {
    this.postRequest(this.addNewGym_subUrl, formData).subscribe(data => {
      console.log(data);
    })
  }
  public updateGym(gym_id, formData) {
    this.postRequest(this.updatefootFall_subUrl + gym_id, formData).subscribe(data => {
      console.log(data);
    })
  }


  public getfootFalls() {
    this.getRequest(this.getAllfootFalls_subUrl).subscribe(data => {
      console.log(JSON.stringify(data));
    }
    )
  }
  public getOnefootFall(footFall_id) {
    this.getRequest(this.getfootFallDetails_subUrl + footFall_id).subscribe(data => {
      console.log(JSON.stringify(data));
    }
    )
  }
  public addNewfootFall(formData: any) {
    this.postRequest(this.addNewfootFall_subUrl, formData).subscribe(data => {
      console.log(data);
    })
  }
  public updatefootFall(footFall_id, formData) {
    this.postRequest(this.updatefootFall_subUrl + footFall_id, formData).subscribe(data => {
      console.log(data);
    })
  }


  public getGymMember() {
    this.getRequest(this.getAllGymMember_subUrl).subscribe(data => {
      console.log(JSON.stringify(data));
    }
    )
  }
  public getOneGymMember(member_id) {
    this.getRequest(this.getGymMemberDetails_subUrl + member_id).subscribe(data => {
      console.log(JSON.stringify(data));
    }
    )
  }
  public getGymMemberofOneGym(gym_id) {
    return this.getRequest(this.getGymMemberofOneGym_subUrl + gym_id);
  }
  public addNewGymMember(formData: any) {
    //formData = JSON.stringify(formData)
    this.postRequest(this.addNewGymMember_subUrl, formData).subscribe(data => {
      console.log(data);
    })
  }
  public updateGymMember(member_id, formData) {
    this.postRequest(this.updateGymMember_subUrl + member_id, formData).subscribe(data => {
      console.log(data);
    })
  }

  getRequest(sub_url: string) {
    let full_url: string = this.baseUrl + sub_url;
    const headerDict = {
      'Content-Type': 'application/json',
      // 'Accept': 'application/json',
      // 'Access-Control-Allow-Headers': 'Content-Type',
    }
    //params: new HttpParams({fromString: "_page=1&_limit=20"})
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    }
    return this.http.get(full_url, requestOptions)
  }

  postRequest(sub_url: string, formData: any) {
    let full_url: string = this.baseUrl + sub_url;
    //formData = JSON.stringify(formData);
    const headerDict = {
      'Content-Type': 'application/json'
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    }

    return this.http.post(full_url, formData, requestOptions)

  }


}

export interface Gym {

  GYM_ID: string
  GYM_NAME: string
  AUTH_METHOD: string;
  PASSWD: string;

}
export interface GymMember {

  MEMBER_ID: string
  MEMBER_NAME: string;
  GYM_ID: string
  ENCODINGS: any

}
export interface FootFall {

  FOOTFALL_ID: string
  MEMBER_ID: number;
  GYM_ID: string;
  FOOTFALL_TIMESTAMP: String
  ENTRY_EXIT: string;
  X_COORD_FRAC: number;
  Y_COORD_FRAC: number;
}