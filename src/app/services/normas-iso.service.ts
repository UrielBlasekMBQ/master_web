import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base = environment.api;

@Injectable({
  providedIn: 'root'
})
export class NormasIsoService {

  constructor(private http :HttpClient) { }

  url =":3000/norma_iso";
  url1=":3000/norma_is_vistaPadre";
  url2=":3000/norma_iso_hijos";
  url3=":3000/norma_iso_descarga";

  getPadres(id : any){

    const base_url = `${base}/norma_iso`
    
    return this.http.get( base_url+'/'+id);
  }
 
  getHijos(padre : any){
    
    const base_url = `${base}/norma_iso`
    
    return this.http.post(base_url, padre);
  }

//////////Eliminar padres e hijos //////////
  //Get hijos y padres
  getpadreshijos(body : any){
    const base_url = `${base}/norma_iso/getpadrehijo`; 
    return this.http.post(base_url, body);
  }
  
  // Eliminar documento padre
  deleteDocPadre(body : any){
    const base_url = `${base}/norma_iso/deletedocumentopadre`; 
    return this.http.post(base_url, body);
  }
  
  // Eliminar documento hijo
  deleteDocHijo(body : any){
    const base_url = `${base}/norma_iso/deletedocumentohijo`; 
    return this.http.post(base_url, body);
  }
  
  //Eliminar padres e hijos
  deletepadreshijos(body: any){
    const base_url = `${base}/norma_iso/deletepadreshijos`; 
    return this.http.post(base_url,body);
  }
  
  //Eliminar hijos
  deletehijos(body: any){
    const base_url = `${base}/norma_iso/deletehijo`; 
    return this.http.post(base_url,body);
  }
  
  
  //////////Eliminar padres e hijos //////////

  sendPost(body: any){
    console.log(body);
    const base_url = `${base}/norma_iso`
    return this.http.put(base_url, body);
   }

  viewDocument(filename : string){
    const base_url = `${base}/norma_is_vistaPadre`
    return this.http.get(base_url+'/'+filename);
  }

  editCampo( id: any, body: any){
    const base_url = `${base}/norma_is_vistaPadre`
    return this.http.put(base_url+'/'+ id, body);
  }

  sendPostDocument(body: any){
    const base_url = `${base}/norma_iso_hijos`
    return this.http.post(base_url, body);
  }
}
