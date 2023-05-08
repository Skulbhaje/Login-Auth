import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  apiURL = 'http://localhost:3000/user';
  apiUserRoleURL = 'http://localhost:3000/roles';

  getAll(){
    return this.http.get(this.apiURL);
  }

  getAllRoles(){
    return this.http.get(this.apiUserRoleURL);
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

  isLoggedIn(){
    return sessionStorage.getItem('username') != null;
  }

  isUserRole(){
    return sessionStorage.getItem('userrole') != null? sessionStorage.getItem('userrole')?.toString(): '';
  }
}
