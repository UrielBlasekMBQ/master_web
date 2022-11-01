import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base = environment.api;

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {

  constructor( private http : HttpClient) { }

  getPadres(){
    const base_url = `${base}/registros/padres`
    return this.http.get(base_url);
  }

  getHijos(body : any){
    const base_url = `${base}/registros/hijos`
    return this.http.post(base_url, body);
  }

  

//////////Eliminar padres e hijos //////////
  //Get hijos y padres
  getpadreshijos(body : any){
    const base_url = `${base}/registros/getpadrehijo`; 
    return this.http.post(base_url, body);
  }
  
  // Eliminar documento padre
  deleteDocPadre(body : any){
    const base_url = `${base}/registros/deletedocumentopadre`; 
    return this.http.post(base_url, body);
  }
  
  // Eliminar documento hijo
  deleteDocHijo(body : any){
    const base_url = `${base}/registros/deletedocumentohijo`; 
    return this.http.post(base_url, body);
  }
  
  //Eliminar padres e hijos
  deletepadreshijos(body: any){
    const base_url = `${base}/registros/deletepadreshijos`; 
    return this.http.post(base_url,body);
  }
  
  //Eliminar hijos
  deletehijos(body: any){
    const base_url = `${base}/registros/deletehijo`; 
    return this.http.post(base_url,body);
  }
  
  
  //////////Eliminar padres e hijos //////////
  

  sendPost(body: any){
    const base_url = `${base}/registros`
    return this.http.put(base_url, body);
   }


   addCarpetaHijo(body: any){
    const base_url = `${base}/registros/addCarpetaHijo`
    return this.http.put(base_url, body);
   }


  editCampo(  body: any){
    const base_url = `${base}/registros/padresEdit`
    return this.http.put(base_url, body);
  }

  sendPostDocument(body: any){
    const base_url = `${base}/registros/addhijos`
    return this.http.post(base_url, body);
  }


}
