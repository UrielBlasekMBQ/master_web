import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  decode  from 'jwt-decode';

const base = environment.api;

@Injectable({
  providedIn: 'root'
})
export class ViewPermisosService {

  constructor(private http: HttpClient) { }

  getPermisos(){
    const base_url = `${base}/permisos/get_permisos`
    const token : any = localStorage.getItem('token');
    const logUsuario: any = decode(token);
    console.log(logUsuario);
    
    return this.http.post(base_url,logUsuario);

  }

  


}
