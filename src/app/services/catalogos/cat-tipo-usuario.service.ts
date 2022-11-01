import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const base = environment.api;

@Injectable({
  providedIn: 'root'
})
export class CatTipoUsuarioService {

  url=":3000/catUsuarios";

  constructor(private http:  HttpClient) {  }

  getCatTipoUsuario(body : any){
    const base_url = `${base}/catUsuarios`
    return this.http.post(base_url, body);
  }
}


export interface catTipoUsuario{

  id_cat_usuarios?: string
  tipoUsuario?: string
  descripcion?: string
}