import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { error } from 'util';

@Injectable()
export class ProductsService {
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
   
   
   getCategory(idArea) {
    return this.http.get("http://5a4f02121b90570012dbfa67.mockapi.io/areas/"+idArea+"/categories")
      .map(response => {
          return response;
        }).catch(error => this.handleError(error));
  }
  showproduct(idArea,idcate,idpart){
    return this.http.get("http://5a4f02121b90570012dbfa67.mockapi.io/areas/"+idArea+"/categories/"+idcate+"/parts/"+idpart+"/products")
    .map(response => {
        return response;
      }).catch(error => this.handleError(error));
  }
  getnamepart(idArea,idcate,idpart){
    return this.http.get("http://5a4f02121b90570012dbfa67.mockapi.io/areas/"+idArea+"/categories/"+idcate+"/parts/"+idpart+"")
    .map(response => {
        return response;
      }).catch(error => this.handleError(error));
  }
  


}
