import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'app/services/loader.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { UserService } from 'app/services/user.service';
import { ToastrService } from 'ngx-toastr';

declare var myExtObject: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  account: any = {};
  register:any={};
  allusers;
    ngOnInit(): void {
       
      
    }

  constructor(
    private router:Router,
    private loaderService: LoaderService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private toastr:ToastrService,
  ) { 
      this.userService.getallusers().subscribe(result => this.allusers = result);
      
    }
  Userlogin(){
    
    var username = this.account.username;
    for(let i=0;i<this.allusers.length;i++){
      if(this.allusers[i].email===this.account.username && this.allusers[i].password===this.account.password){
          
          var getuser = this.allusers.filter(function (item) {
            return item.email == username;
          });
          console.log(getuser);
          localStorage.setItem('user',JSON.stringify(getuser));
          this.loaderService.display(true);
          setTimeout(()=>{  
            this.loaderService.display(false);
            this.router.navigate(["app/dashboard"]);  
          }, 3000)
         
          return;
        }
      }
      
    return myExtObject.func1();
    // this.authenticationService.login(this.account.username, this.account.password)
    // .subscribe(
    //     data => {
    //       this.loaderService.display(false);
    //       this.router.navigate(["app/dashboard"]);
    //     },
    //     error => {
    //       this.loaderService.display(false);
    //       myExtObject.func1();
    //     });
    
    
  }
  Register()
  {
    this.register.point = "0";
    if(this.register.area == "HCM"){
      this.register.idarea = "1";
    }
    else if(this.register.area == "VT"){
      this.register.idarea = "2";
    }

    this.userService.UserRegister(this.register).subscribe(
          data => {
            this.toastr.success('Tạo tài khoản thành công!', 'Web sẽ tự khởi động lại sau 2s...',{
              progressBar: true,
              positionClass: 'toast-bottom-right',
              timeOut:2000
            });
            setTimeout(()=>{  
              window.location.reload();
            }, 2000)
           
          },
          error => {
           
          });
  }

}
