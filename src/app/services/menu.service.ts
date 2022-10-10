import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base = environment.api;


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http : HttpClient) { }

  getUsuario(body : any){
    const base_url = `${base}/api/datos`
    return this.http.post(base_url,body);
  }
}
