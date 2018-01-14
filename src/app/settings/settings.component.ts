import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  userinfo:any = {};
  value;
  constructor() { }

  ngOnInit() {
    this.userinfo = JSON.parse(localStorage.getItem('user'));
    if(this.userinfo[0].idarea == '1'){
        this.value = '1';
    }
    else if(this.userinfo[0].idarea == '2'){
      this.value = '2';
    }
  }

}
