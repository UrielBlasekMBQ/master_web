import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base = environment.api;

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  url =":3000/permisos";


  constructor(private http:  HttpClient) { }

  getPermisos(body : any){
    const base_url = `${base}/permisos/get_permisos`
    return this.http.post(base_url, body);
  }

  addPermisos(id: any, permiso : any){
    const base_url = `${base}/permisos`
    return this.http.post(base_url+'/'+id, permiso);
  }

  updatePermisos(id: any, permiso: any){
    const base_url = `${base}/permisos`
    return this.http.put(base_url+'/'+id, permiso);
  }

}

export interface Permisos{
id_usuario?: string
calidad? : string
calidadVer? : string
calidadDescargar? : string
calidadActualizar? : string
operacion? : string
operacionVer? : string
operacionDescargar? : string
operacionActualizar? : string
registros? : string
registrosVer? : string
registrosDescargar? : string
registrosActualizar? : string
marcoLegal? : string
norma? : string
normaVer? : string
normaDescargar? : string
normaActualizar? : string
marco? : string
marcoVer? : string
marcoDescargar? : string
marcoActualizar? : string
controlDocumento? : string
asigna? : string
asignaVer? : string
asignaAsignar? : string
revisa? : string
revisaVer? : string
revisaRevisar? : string
aprueba? : string
apruebaVer? : string
apruebaAprueba? : string
proceso? : string
procesoAdd? : string
procesoUpdate? : string
procesoDelete? : string
usuarios? : string
usuario? : string
usuarioAdd? : string
usuarioUpdate? : string
usuarioDelete? : string
permiso? : string
permisoAdd? :string

}
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       