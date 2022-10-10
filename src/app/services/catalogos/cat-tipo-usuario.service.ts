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

  getCatTipoUsuario(){
    return this.http.get(`${base}/catUsuarios`);
  }
}


export interface catTipoUsuario{

  id_cat_usuarios?: string
  tipoUsuario?: string
  descripcion?: string
}