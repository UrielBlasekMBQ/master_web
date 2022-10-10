import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const base = environment.api;


@Injectable({
  providedIn: 'root'
})
export class ControlDocumentoService {

  constructor( private http: HttpClient) { }

  //GET DOCUMENTOS
  getDocuments(body : any){
    const base_url = `${base}/docAsigna/documentos`; 
    return this.http.post(base_url,body);
  }

  // SEND DOCUMENTO 
  sendPost(body: any){
    // let base_url = `${base}`
    const base_url = `${base}/docAsigna`; 

   return this.http.post(base_url, body);
  }

  viewDocument(filename : string){
    const base_url = `${base}/docAsigna`; 
    
    return this.http.get(base_url);
  }

  //GET REVISORES
  getRevisores(){
    const base_url = `${base}/docRevisa/revisores`; 
    return this.http.get(base_url);
  }

    //GET APROBADORES
    getAprobador(){
      const base_url = `${base}/docAprueba/aprobador`; 
      return this.http.get(base_url);
    }



}
