import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  title = 'Login-Auth';
  isMenuDisplay = false;
  isAdminUser = false;

  constructor(private router: Router, private authService: AuthService){

  }

  ngDoCheck(): void{
    let currentPage = this.router.url;
    if(currentPage!== '/login'){     // also need to check for '/register' url
      this.isMenuDisplay = true;
    } else {
      this.isMenuDisplay = false;
    }

    if(this.authService.isUserRole() =='Admin'){
      this.isAdminUser = true;
    } else{
      this.isAdminUser = false;
    }
  }


}
