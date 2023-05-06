import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userData: any;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService,
    private authService: AuthService, private router: Router){
      sessionStorage.clear();
  }

  loginForm = this.formBuilder.group({
    username: this.formBuilder.control('', Validators.required),
    password: this.formBuilder.control('', Validators.compose([Validators.required, Validators.pattern('')]))
  })

  proceedLogin(){
    if(this.loginForm.valid){
      this.authService.getByCode(this.loginForm.value.username).subscribe(res => {
      this.userData = res;
      console.log(this.userData);
      if (this.userData.password == this.loginForm.value.password && this.userData.id == this.loginForm.value.username){
        if(this.userData.isActive){
            sessionStorage.setItem('username', this.userData.id);
            sessionStorage.setItem('userrole', this.userData.role);
            this.router.navigate(['']);
        } else {
          this.toastr.warning('This user is inactive, please contact system admin')
        }
      } else {
          this.toastr.warning('Invalid Credentials!')
      }
      });
    } else {
      this.toastr.warning('Please enter valid Credentials!')
    }
  }

}
