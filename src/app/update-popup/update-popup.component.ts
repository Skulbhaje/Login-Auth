import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-update-popup',
  templateUrl: './update-popup.component.html',
  styleUrls: ['./update-popup.component.css']
})
export class UpdatePopupComponent implements OnInit {

  roleList: any;
  editData: any;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService,
    private authService: AuthService, @Inject(MAT_DIALOG_DATA) public data:any,
    private dialofRef: MatDialogRef<UpdatePopupComponent>  ){

  }
  ngOnInit(): void {
    this.authService.getAllRoles().subscribe( res=>{
      this.roleList = res;
    })
    if(this.data.userID != null && this.data.userID != ''){
      this.authService.getByCode(this.data.userID).subscribe(res =>{
        this.editData = res;
        this.registrForm.setValue(
          { id:this.editData.id,
            name:this.editData.name,
            password:this.editData.password,
            email:this.editData.email,
            gender:this.editData.gender,
            role:this.editData.role,
            isActive:this.editData.isActive
          })
      })
    }
  }

  registrForm = this.formBuilder.group({
    id: this.formBuilder.control(''),
    name: this.formBuilder.control(''),
    password: this.formBuilder.control(''),
    email: this.formBuilder.control(''),
    gender: this.formBuilder.control(''),
    role: this.formBuilder.control('', Validators.required),
    isActive: this.formBuilder.control(false)
  })

  updateUserRole(){
    if(this.registrForm.valid){
      this.authService.updateUser(this.registrForm.value.id, this.registrForm.value).subscribe(res=>{
        this.toastr.success('User role updated successfullly');
        this.dialofRef.close();
      })
    } else {
      this.toastr.warning('Please Select Role');
    }
  }
}
