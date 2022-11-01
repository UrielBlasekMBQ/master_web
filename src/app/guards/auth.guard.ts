import { environment } from './../../environments/environment';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import  decode  from 'jwt-decode';


const base =environment.logUsuario;

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private AuthService : AuthService,
              private router : Router,
 
    ){  }

  canActivate(): boolean{
    //console.log('Si entro');

    const res =this.AuthService.isAuth();
    // //console.log(res);

    if(res){
      //console.log('El token es valido');
      const token: any = localStorage.getItem('token');
      // //console.log(decode(token));
      
     

    
      


      
      return true;
    }else{
      this.router.navigate(['/login']);
      return false

    }
  
  }
  
}
