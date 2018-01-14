import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  modalid:String;
  modaltag:String;
  modalphone:String;
  modaladdress:String;
  modalprice:String;
  modaldate:String;
  orders;
  userinfo:any = {};
  // chi tiết sản phẩm
  productdetails;
  constructor(private userService:UserService) {
    this.userinfo = JSON.parse(localStorage.getItem('user'));
    this.userService.getallOrders(this.userinfo[0].id).subscribe(result =>this.orders = result);
   }

  ngOnInit() {
    
    // console.log(this.orders);
    // console.log(this.productdetails);
  }
  viewDetails(order){
      this.modalid = order.idorder;
      this.modaltag = order.tag;
      this.modalphone = order.phone;
      this.modaladdress = order.address;
      this.modalprice = order.totalprice;
      this.modaldate= order.date;
      this.userService.getallProductDetails(this.userinfo[0].id,order.idorder).subscribe(
        result =>{this.productdetails = result;
        console.log(this.productdetails);}
      ); 
  }
}