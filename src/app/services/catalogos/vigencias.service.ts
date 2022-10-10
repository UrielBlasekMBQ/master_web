import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base = environment.api;

@Injectable({
  providedIn: 'root'
})
export class VigenciasService {
  url=":3000/catVigencias";
  constructor(private http:  HttpClient) { }

  getCatVigencias(){
    return this.http.get(`${base}/catVigencias`);
  }
}

export interface vigencias{
  id_vigencia ?: string
  nom_vigencia?: string
  dias?: string
};
