import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userinfo:any = {};
  newuserinfo:any = {};
  constructor(private userService:UserService,private toastr:ToastrService) { }

  ngOnInit() {
    this.userinfo = JSON.parse(localStorage.getItem('user'));
    console.log(this.userinfo);
  }
  update(){
    this.newuserinfo.address = this.userinfo[0].address;
    this.newuserinfo.birthday = this.userinfo[0].birthday;
    this.newuserinfo.fullname = this.userinfo[0].fullname;
    this.newuserinfo.phone = this.userinfo[0].phone;
    console.log();
    this.userService.updateuserinfo(this.userinfo[0].id,this.newuserinfo).subscribe(result => {
      this.userService.getcurrentuser(this.userinfo[0].id).subscribe(result => {
        console.log(result);
        localStorage.removeItem('user');
          this.toastr.success('Hệ thông sẽ tự khởi động lại sau 2s', 'Cập nhật thành công',{
            progressBar: true,
            positionClass: 'toast-bottom-right',
            timeOut:2000,
          }).toastRef.afterClosed().subscribe(()=>{
              window.location.reload();
          });
      });
      
    })
  }

}
