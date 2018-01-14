import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckOutComponent implements OnInit {
  userorder;
  address;
  selectadd:any = {};
  totalPrice:number;
  totalQuantity:number;
    ngOnInit(): void {
      this.totalPrice = 0;
      this.totalQuantity = 0;
    }
  userinfo;
  constructor(private userService:UserService,private router:Router,private toastr:ToastrService) {

    this.address = [];
    this.userinfo = JSON.parse(localStorage.getItem('user'));
    this.userService.getallmoreaddress(this.userinfo[0].id).subscribe(result => {
      this.address = result;
      console.log(this.address);
      this.userorder = JSON.parse(localStorage.getItem('order'));
      
     this.userorder.forEach(element => {
      
      this.totalPrice += Number(element.price);
      this.totalQuantity +=1;
      });
      console.log(this.totalPrice);
    } );
   
    
    
    
   }
   remove(i){
     this.userorder.splice(i,1);
     localStorage.setItem('order',JSON.stringify(this.userorder));
     this.resetNumber();
     this.userorder.forEach(element => {
        this.totalPrice += Number(element.price);
        this.totalQuantity +=1;
      });
     if(localStorage.getItem('order') == "[]"){
        localStorage.removeItem('order');
     }
   }
   selectaddress(add){
      this.selectadd = add;
      console.log(add);
   }
   confirmOrder(){
    console.log(this.selectadd);
    console.log(this.userorder);
    this.selectadd.totalprice = this.totalPrice;
    this.selectadd.date = Date.now().toString();

  

    this.userService.insertOrderUser(this.userinfo[0].id,this.selectadd).subscribe(result => {
      this.userorder.forEach(element => {
          this.userService.insertOrderDetailsUser(this.userinfo[0].id,element,result.idorder).subscribe(resultorder => {
            
          });
          
        });
      this.toastr.success('Nhớ theo dõi trạng thái đơn hàng của bạn.', 'Mua hàng thành công!',{
          progressBar: true,
          positionClass: 'toast-bottom-right',
        });
      localStorage.removeItem('order');
      
    })
    
   }
   resetNumber():void{
    this.totalPrice = 0;
    this.totalQuantity = 0;
   }
   
   
}

