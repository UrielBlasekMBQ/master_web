import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



const base =environment.api;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
      private JwtHelper: JwtHelperService) { }
  
  

  singin(user: any){
    const base_url = `${base}/auth/singin`; 
    return this.http.post(base_url,user);
  }

  isAuth():boolean{
    const token: any = localStorage.getItem('token');

    console.log('El token es:'+token);
    
    if(this.JwtHelper.isTokenExpired(token) || !localStorage.getItem('token')){
      return false;
    }
    return true;
  }
  
  
}
