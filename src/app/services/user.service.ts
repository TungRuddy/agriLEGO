import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { error } from 'util';

@Injectable()
export class UserService {
  private headers: HttpHeaders;
  private handleError(error: any) {
    if (error instanceof Response) {
      return Observable.throw(error.json()['error'] || 'backend server error');
    }
    return Observable.throw(error || 'backend server error');
  }

  constructor(private http:HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
   }
   
   
   getallusers() {
    return this.http.get("http://5a4f02121b90570012dbfa67.mockapi.io/user")
      .map(response => {
          return response;
        }).catch(error => this.handleError(error));
  }
  getallOrders(iduser) {
    return this.http.get("http://5a4f02121b90570012dbfa67.mockapi.io/user/"+iduser+"/orders")
      .map(response => {
          return response;
        }).catch(error => this.handleError(error));
  }
  getallProductDetails(iduser,value) {
    return this.http.get("http://5a4f02121b90570012dbfa67.mockapi.io/user/"+iduser+"/orders/"+value+"/productdetails")
      .map(response => {
          return response;
        }).catch(error => this.handleError(error));
  }
  getallmoreaddress(iduser) {
    return this.http.get("http://5a4f02121b90570012dbfa67.mockapi.io/user/"+iduser+"/moreaddress")
      .map(response => {
          return response;
        }).catch(error => this.handleError(error));
  }
  updatemoreaddress(iduser,address){
    console.log(address);
    return this.http.put("http://5a4f02121b90570012dbfa67.mockapi.io/user/"+iduser+"/moreaddress/"+address.idmd,JSON.stringify(address),{headers: this.headers})
    .map(response => {
        return response;
      }).catch(error => this.handleError(error));
  }
  insertmoreaddress(iduser,insertaddress){
    return this.http.post("http://5a4f02121b90570012dbfa67.mockapi.io/user/"+iduser+"/moreaddress/",insertaddress)
      .map(response => {
          return response;
        }).catch(error => this.handleError(error));
  }
  deletemoreaddress(iduser,id){
    
    return this.http.delete("http://5a4f02121b90570012dbfa67.mockapi.io/user/"+iduser+"/moreaddress/"+id,{headers: this.headers})
    .map(response => {
        return response;
      }).catch(error => this.handleError(error));
  }
  updateuserinfo(iduser,newpass) {
    return this.http.put("http://5a4f02121b90570012dbfa67.mockapi.io/user/"+iduser,JSON.stringify(newpass),{headers: this.headers})
      .map(response => {
          return response;
        }).catch(error => this.handleError(error));
  }
  UserRegister(User) {
    return this.http.post("http://5a4f02121b90570012dbfa67.mockapi.io/user",User)
      .map(response => {
          return response;
        }).catch(error => this.handleError(error));
  }
  insertOrderUser(iduser,order){
    return this.http.post("http://5a4f02121b90570012dbfa67.mockapi.io/user/"+iduser+"/orders",order)
    .map(response => {
      console.log(response);
        return response;
      }).catch(error => this.handleError(error));
  }
  insertOrderDetailsUser(iduser,order,idorder){
    return this.http.post("http://5a4f02121b90570012dbfa67.mockapi.io/user/"+iduser+"/orders/"+idorder+"/productdetails",order)
    .map(response => {
      
        return response;
      }).catch(error => this.handleError(error));
  }
  getcurrentuser(iduser){
    return this.http.get("http://5a4f02121b90570012dbfa67.mockapi.io/user/"+iduser)
    .map(response => {
        return response;
      }).catch(error => this.handleError(error));
  }

}
