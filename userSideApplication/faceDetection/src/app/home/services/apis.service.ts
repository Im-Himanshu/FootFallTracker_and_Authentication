import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApisService {
  baseUrl = "http://localhost:5000/"

  getAllgyms_subUrl = "getAllGyms"
  getGymDetails_suburl = "getGymDetails/"; // requires <gym_id>
  addNewGym_subUrl = "addNewGym"
  updateGym_subUrl = "updateGym/"; // requires <gym_id>;
  // create one more url which will fire a given query provided from the UI directly

  getAllGymMember_subUrl = "getAllGymMember";
  getGymMemberDetails_subUrl = "getGymMemberDetails/";  // requires <gym_id>;
  addNewGymMember_subUrl = "addNewGymMember" //addNewGymMember
  updateGymMember_subUrl = "updateGymMember/"

  getAllfootFalls_subUrl = "getAllfootFalls";
  getfootFallDetails_subUrl = "getfootFallDetails/"; // requires <footFall_id>;
  addNewfootFall_subUrl = "addNewfootFall";
  updatefootFall_subUrl = "updatefootFall/" //requires <footFall_id>;
  constructor(private http: HttpClient) { }


  public getAllGyms() {
    this.getRequest(this.getAllgyms_subUrl).subscribe(data => {
      console.log(JSON.stringify(data));
    }
    )
  }
  public getOneGym(gym_id) {
    this.getRequest(this.getGymDetails_suburl + gym_id).subscribe(data => {
      console.log(JSON.stringify(data));
    }
    )
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
  public addNewGymMember(formData: any) {
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
    formData = JSON.stringify(formData);
    const headerDict = {
      'Content-Type': 'application/json'
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    }

    return this.http.post(full_url, formData, requestOptions)

  }


}
