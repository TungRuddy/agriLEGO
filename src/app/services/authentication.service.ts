import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

  constructor(private http: Http,private router:Router) { }
  login(email: string, password: string) {
            return this.http.post('http://5a4f02121b90570012dbfa67.mockapi.io/user', { email: email, password: password })
                .map((response: Response) => {
                    let user = response.json();
                    if (user && user.token) {
                        localStorage.setItem('user', JSON.stringify(user));
                    }
     
                    return user;
                });
        }
     
        logout() {
           
            localStorage.removeItem('user');
            this.router.navigate(["/login"]);
        }

}
