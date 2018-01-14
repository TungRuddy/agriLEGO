import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Mua hàng',  icon: 'shopping_cart', class: ''  },   
    { path: 'order', title: 'Đơn hàng của tôi',  icon:'content_paste', class: '' },
    { path: 'user-profile', title: 'Thông tin tài khoản',  icon:'person', class: '' },
    { path: 'address', title: 'Thông tin giao hàng',  icon:'assignment', class: '' },
    { path: 'settings', title: 'Cài đặt',  icon:'settings', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  test:String = '';
  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
  logout(){
    this.authenticationService.logout();
    
  }
}
