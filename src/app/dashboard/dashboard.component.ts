import { Component, OnInit,EventEmitter, Input, Output } from '@angular/core';
import * as Chartist from 'chartist';
import { ProductsService } from 'app/services/products.service';
import { DataService } from 'app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userinfo:any = {};
  categories;
  findnamepart;
  products = [];
  count:any = {
    from:     0,
    duration: 1,
};
  listorder:any = {};
  constructor(
    private productService:ProductsService,
    private data:DataService,
    private toastr:ToastrService,
    private router:Router) {
      if(localStorage.getItem('order')){
        this.toastr.info('nhấn vào đây để vào giỏ hàng','Bạn có đơn hàng chưa thanh toán!',{
          positionClass: 'toast-bottom-right',
          extendedTimeOut:99999999,
          timeOut:99999999,
        }).toastRef.afterClosed().subscribe(() => {
            this.router.navigate(["app/checkout/"]);
            window.location.reload();  
        });
  
      }
    
   }

  ngOnInit() {
   
    this.userinfo = JSON.parse(localStorage.getItem('user'));
    this.productService.getCategory(this.userinfo[0].idarea).subscribe(result => this.categories = result);
    console.log(this.userinfo);
    
  }
  showproduct(i,idcate,idpart){
    console.log(this.userinfo[0].idarea,idcate,idpart);
    this.productService.showproduct(this.userinfo[0].idarea,idcate,idpart).subscribe(result => this.products[i] = result);
  }  
 public order(product,idcate,namecate){
    console.log(product);
    console.log(idcate);
    console.log(namecate);
    
    this.productService.getnamepart(this.userinfo[0].idarea,idcate,product.partId).subscribe(result => {
        this.findnamepart = result;
        console.log(this.findnamepart.namepart);
        var list = `[{"category": "`
        +namecate+ `","nameproduct": "` 
        +this.findnamepart.namepart
        +`","price": "`+product.price
        +`","kg": "`+product.gram
        +`","ml": "`+product.ml+`"}]`;
        
        
        var lists = JSON.parse(list);
        this.listorder = lists[0];
        console.log(this.listorder);
       // localStorage.setItem("listorder",bien);
        this.data.addList(this.listorder);
    });
    

  }


}
