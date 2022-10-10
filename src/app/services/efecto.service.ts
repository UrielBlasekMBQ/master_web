import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base = environment.api;

@Injectable({
  providedIn: 'root'
})
export class EfectoService {

  constructor(private http:  HttpClient) { }

  
  //get Efectos
  getEfectos(){
    const base_url = `${base}/efecto`
    return this.http.get(base_url);
  }

  // Add Efecto
  addEfecto(body : any){        
    const base_url = `${base}/efecto/addefecto`
    return this.http.post(base_url, body);
  }


  // update Efecto
  updateEfecto(body : any){
    console.log(body);
    const base_url = `${base}/efecto/updateefecto`
    return this.http.put(base_url, body);
  }

  // update Efecto
  deleteEfecto(body : any){
    const base_url = `${base}/efecto/deleteefecto`
    return this.http.post(base_url, body);
  }

}
