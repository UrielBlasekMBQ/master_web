import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base = environment.api;

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  constructor( private http : HttpClient) { }


    //get Historial
    getHistorial(body: any){
      const base_url = `${base}/historial/historial`;
      return this.http.post(base_url,body);
    }

    //add historial
    addHistorial(body : any){
      const base_url = `${base}/historial/add_historial`;
      return this.http.post(base_url,body);
    }
    
}
