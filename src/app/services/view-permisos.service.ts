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
    //console.log(logUsuario.id_usuario);
    let body = {'id_usuario' : logUsuario.id_usuario}
    
    return this.http.post(base_url,logUsuario);

  }

  getPermisoContrato(){
    const base_url = `${base}/contratos_permiso/get_contrato_permiso`
    
    return this.http.get(base_url);

  }

  


}
