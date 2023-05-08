import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private authService: AuthService, private router: Router,
    private toastr: ToastrService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      if(this.authService.isLoggedIn()){
        if(route.url.length>0){
          let menu = route.url[0].path;
          if(menu == 'user'){
            if(this.authService.isUserRole() == 'Admin'){
              return true
            } else{
              this.toastr.warning("you don't have access to user data");
              this.router.navigate(['']);
              return false
            }
          } else{
            return true
          }
        } else{
          return true
        }
      } else {
        this.router.navigate(['login']);
        return false
      }
  }

}
