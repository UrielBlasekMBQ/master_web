import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base = environment.api;

@Injectable({
  providedIn: 'root'
})
export class MultiProcesoService {

  constructor(private http: HttpClient) { }


    //GET DOCUMENTOS
    getMultiProceso(){
      const base_url = `${base}/multi_proceso/get_multi_proceso`; 
      return this.http.get(base_url);
    }

    //GET DOCUMENTOS
    updateMultiProceso(body : any){
      const base_url = `${base}/multi_proceso/update_multi_proceso`; 
      return this.http.post(base_url, body);
    }



}
