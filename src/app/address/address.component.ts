import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'app/services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  insertaddress : any = {};
  address : any = {};
  moreaddress;
  iddelete;
  userinfo:any = {};
  
  constructor(private userService:UserService, loaderService: LoaderService,private toastr: ToastrService) { 
    this.userinfo = JSON.parse(localStorage.getItem('user'));
    this.userService.getallmoreaddress(this.userinfo[0].id).subscribe(result => this.moreaddress = result)
  }

  ngOnInit() {
    
   
  }

  Edit(moreaddres){
      this.address = moreaddres;
  }
  update(){
    this.userService.updatemoreaddress(this.userinfo[0].id,this.address).subscribe(result => {
      this.toastr.success('Cập nhật thành công', '',{
        progressBar: true,
        positionClass: 'toast-bottom-right',
      });
    })
  }
  insert(){
    console.log(this.insertaddress);
    this.userService.insertmoreaddress(this.userinfo[0].id,this.insertaddress).subscribe(
      data => {
        this.userService.getallmoreaddress(this.userinfo[0].id).subscribe(result => {
          this.moreaddress = result;
          this.toastr.success('Tạo thành công', '',{
            progressBar: true,
            positionClass: 'toast-bottom-right',
          });
        })
            },
            error => {
             
            }
    );
  }

  xacnhandelete(id){
    this.iddelete = id;
  }

  delete(id){
    this.userService.deletemoreaddress(this.userinfo[0].id,id).subscribe(result => {
      this.userService.getallmoreaddress(this.userinfo[0].id).subscribe(result => {
        this.moreaddress = result;
        this.toastr.success('Xóa thành công', '',{
          progressBar: true,
          positionClass: 'toast-bottom-right',
        });
      })
          
    })
  }
  
}
