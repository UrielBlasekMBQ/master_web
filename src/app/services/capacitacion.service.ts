import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';


const base = environment.api;

@Injectable({
  providedIn: 'root'
})
export class CapacitacionService {


  constructor(private http :HttpClient) { }

  getPadres(id : any){
    
    const base_url = `${base}/capacitacion_legal`
    return this.http.get( base_url+'/'+id);
  }
 
  getHijos(padre : any){
    
    const base_url = `${base}/capacitacion_legal`
    return this.http.post(base_url, padre);
  }

//////////Eliminar padres e hijos //////////
  //Get hijos y padres
  getpadreshijos(body : any){
    const base_url = `${base}/capacitacion_legal/getpadrehijo`; 
    return this.http.post(base_url, body);
  }
  
  // Eliminar documento padre
  deleteDocPadre(body : any){
    const base_url = `${base}/capacitacion_legal/deletedocumentopadre`; 
    return this.http.post(base_url, body);
  }
  
  // Eliminar documento hijo
  deleteDocHijo(body : any){
    const base_url = `${base}/capacitacion_legal/deletedocumentohijo`; 
    return this.http.post(base_url, body);
  }
  
  //Eliminar padres e hijos
  deletepadreshijos(body: any){
    const base_url = `${base}/capacitacion_legal/deletepadreshijos`; 
    return this.http.post(base_url,body);
  }
  
  //Eliminar hijos
  deletehijos(body: any){
    const base_url = `${base}/capacitacion_legal/deletehijo`; 
    return this.http.post(base_url,body);
  }
  
  
  //////////Eliminar padres e hijos //////////
  

  sendPost(body: any){
    const base_url = `${base}/capacitacion_legal`
    return this.http.put(base_url, body);
   }


  editCampo( id: any, body: any){
    const base_url = `${base}/capacitacion_vistaPadre`
    return this.http.put(base_url+'/'+ id, body);
  }

  sendPostDocument(body: any){
    const base_url = `${base}/capacitacion_legal_hijos`
    return this.http.post(base_url, body);
  }

  ///////// HISTORIAL //////////
  sendDataHistorial(body : any){
    const base_url = `${base}/capacitacion_legal/sendHistorial`;
    return this.http.post(base_url, body);
    
  }

  viewDataHistorial(body : any){
    const base_url = `${base}/capacitacion_legal/viewHistorial`;
    return this.http.post(base_url, body);
  }

  deleteCapacitacion(body : any){
    const base_url = `${base}/capacitacion_legal/deleteCapacitacion`;
    return this.http.post(base_url, body);
  }
  ///////// HISTORIAL //////////
}
