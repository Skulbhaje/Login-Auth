import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UpdatePopupComponent } from '../update-popup/update-popup.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  constructor(private authService: AuthService, private dialog: MatDialog){
    this.loadUser();
  }

  userList: any;
  displayedColumns: string[] = ['Username', 'Name', 'Email', 'Role' ,'Status', 'Action'];
  dataSource: any;
  @ViewChild(MatPaginator)paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;

  loadUser(){
    this.authService.getAll().subscribe(res => {
      this.userList = res;
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  updateUser(id:any){
    const popup = this.dialog.open(UpdatePopupComponent,{
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      width: '50%',
      data: {
        userID: id
      }
    })

    popup.afterClosed().subscribe(res=>{
      this.loadUser();
    })
  }

  openDialog(){

  }
}
