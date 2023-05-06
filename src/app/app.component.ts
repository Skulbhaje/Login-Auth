import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  title = 'Login-Auth';
  isMenuDisplay = false;

  constructor(private router: Router){

  }

  ngDoCheck(): void{
    let currentPage = this.router.url;
    if(currentPage!== '/login'){     // also need to check for '/register' url
      this.isMenuDisplay = true;
    } else {
      this.isMenuDisplay = false;
    }
  }
}
