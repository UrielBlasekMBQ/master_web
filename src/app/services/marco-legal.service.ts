import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base = environment.api;

@Injectable({
  providedIn: 'root'
})
export class MarcoLegalService {

  constructor(private http :HttpClient) { }

  getPadres(id : any){
    
    const base_url = `${base}/marco_legal`
    return this.http.get( base_url+'/'+id);
  }
 
  getHijos(padre : any){
    
    const base_url = `${base}/marco_legal`
    return this.http.post(base_url, padre);
  }

//////////Eliminar padres e hijos //////////
  //Get hijos y padres
  getpadreshijos(body : any){
    const base_url = `${base}/marco_legal/getpadrehijo`; 
    return this.http.post(base_url, body);
  }
  
  // Eliminar documento padre
  deleteDocPadre(body : any){
    const base_url = `${base}/marco_legal/deletedocumentopadre`; 
    return this.http.post(base_url, body);
  }
  
  // Eliminar documento hijo
  deleteDocHijo(body : any){
    const base_url = `${base}/marco_legal/deletedocumentohijo`; 
    return this.http.post(base_url, body);
  }
  
  //Eliminar padres e hijos
  deletepadreshijos(body: any){
    const base_url = `${base}/marco_legal/deletepadreshijos`; 
    return this.http.post(base_url,body);
  }
  
  //Eliminar hijos
  deletehijos(body: any){
    const base_url = `${base}/marco_legal/deletehijo`; 
    return this.http.post(base_url,body);
  }
  
  
  //////////Eliminar padres e hijos //////////
  

  sendPost(body: any){
    const base_url = `${base}/marco_legal`
    return this.http.put(base_url, body);
   }


  editCampo( id: any, body: any){
    const base_url = `${base}/marco_legal_vistaPadre`
    return this.http.put(base_url+'/'+ id, body);
  }

  sendPostDocument(body: any){
    const base_url = `${base}/marco_legal_hijos`
    return this.http.post(base_url, body);
  }




}
 