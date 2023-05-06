import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  apiURL = 'http://localhost:3000/user';

  getAll(){
    this.http.get(this.apiURL);
  }

  getByCode(code:any){
    return this.http.get(this.apiURL+'/'+code);
  }

  proceedRegistration(inputData: any){
    return this.http.post(this.apiURL, inputData);
  }

  updateUser(code:any, inputData: any){
    return this.http.put(this.apiURL+'/'+code, inputData);
  }
}
