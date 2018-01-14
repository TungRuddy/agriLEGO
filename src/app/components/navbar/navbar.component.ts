import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { AuthenticationService } from 'app/services/authentication.service';
import { EventEmitter, Input, Output } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    @Input('lists') lists:any;
    @Input('checklist') checklist:boolean;
    @Input('totalprice') totalprice:any;

    password: any = {};
    newpassword: any = {};
    userinfo:any = {};

    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    constructor(
                location: Location,  
                private element: ElementRef,
                private authenticationService:AuthenticationService,
                private userService: UserService,
                private toastr: ToastrService,
                private router:Router,
            ) {
      this.location = location;
          this.sidebarVisible = false;
          
    }

    ngOnInit(){
        
      this.listTitles = ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 2 );
      }
      titlee = titlee.split('/').pop();

      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
    }
    logout(){
        this.authenticationService.logout();
        
      }
      update(){
        this.userinfo = JSON.parse(localStorage.getItem("user")) ;
        console.log(this.userinfo[0].password);
        console.log(this.password);
        console.log(this.newpassword);
        if(this.password.cu == this.userinfo[0].password){
            this.userService.updateuserinfo(this.userinfo[0].id,this.newpassword).subscribe(
                    data => {
                        
                        this.toastr.success('Cập nhật thành công', '',{
                          progressBar: true,
                          positionClass: 'toast-bottom-right',
                        });
                    },
                    error => {
                        
                        this.toastr.error('Không thành công', '',{
                          progressBar: true,
                          positionClass: 'toast-bottom-right',
                        });
                    });
        }
        else{
            this.toastr.error('Mật khẩu cũ không đúng!', '',{
                progressBar: true,
                positionClass: 'toast-bottom-right',
              });
        }
        this.password.cu = "";
        this.newpassword = "";
        
  }
  gocheckout(){
      console.log(this.lists);
      localStorage.setItem("order",JSON.stringify(this.lists));
      window.location.reload(); 
      this.router.navigate(["app/checkout/"]);
         
  }
}
