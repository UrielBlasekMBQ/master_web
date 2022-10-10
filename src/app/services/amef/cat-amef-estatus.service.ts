import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const base = environment.api;

@Injectable({
  providedIn: 'root'
})
export class CatAmefEstatusService {

  constructor(private http : HttpClient) { }

  // Get catalogo de estatus
  getAmefEstatu(){
    const base_url = `${base}/amef-grupo/get-estatus`
    return this.http.get(base_url);
  }
}
