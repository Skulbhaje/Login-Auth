import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService,
    private authService: AuthService, private router: Router){

  }

  registrForm = this.formBuilder.group({
    id: this.formBuilder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    name: this.formBuilder.control('', Validators.required),
    password: this.formBuilder.control('', Validators.compose([Validators.required, Validators.pattern('')])),
    email: this.formBuilder.control('', Validators.compose([Validators.required, Validators.email])),
    gender: this.formBuilder.control('male'),
    role: this.formBuilder.control(''),
    isActive: this.formBuilder.control(false)
  })

  proceedRegistration(){
    if(this.registrForm.valid){
      this.authService.proceedRegistration(this.registrForm.value).subscribe( res =>{
          this.toastr.success('Please contact admin for enable access','User Registred Successfully');
          this.router.navigate(['login']);
      })
    } else {
        this.toastr.warning('Please enter the valid data');
    }
  }

}
