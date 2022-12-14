import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const base = environment.api;


@Injectable({
  providedIn: 'root'
})
export class ManualCalidadService {

  constructor(private http :HttpClient) { }

  url =":3000/calidad_legal";
  url1=":3000/calidad_legal_vistaPadre";
  url2=":3000/calidad_legal_hijos";
  url3=":3000/calidad_legal_descarga";

  getPadres(id : any){
        const base_url = `${base}/calidad_legal/${id}`; 
    return this.http.get( base_url);
  }
 
  getHijos(padre : any){
    
    const base_url = `${base}/calidad_legal`; 
    
    return this.http.post(base_url, padre);
  }

//////////Eliminar padres e hijos //////////
  //Get hijos y padres
getpadreshijos(body : any){
  const base_url = `${base}/calidad_legal/getpadrehijo`; 
  return this.http.post(base_url, body);
}

// Eliminar documento padre
deleteDocPadre(body : any){
  const base_url = `${base}/calidad_legal/deletedocumentopadre`; 
  return this.http.post(base_url, body);
}

// Eliminar documento hijo
deleteDocHijo(body : any){
  const base_url = `${base}/calidad_legal/deletedocumentohijo`; 
  return this.http.post(base_url, body);
}

//Eliminar padres e hijos
deletepadreshijos(body: any){
  const base_url = `${base}/calidad_legal/deletepadreshijos`; 
  return this.http.post(base_url,body);
}

//Eliminar hijos
deletehijos(body: any){
  const base_url = `${base}/calidad_legal/deletehijo`; 
  return this.http.post(base_url,body);
}


//////////Eliminar padres e hijos //////////

  sendPost(body: any){
    const base_url = `${base}/calidad_legal`; 

    return this.http.put(base_url, body);
   }

  viewDocument(filename : string){
    const base_url = `${base}/calidad_legal_vistaPadre/${filename}`; 
    
    return this.http.get(base_url);
  }

  editCampo( id: any, body: any){
    const base_url = `${base}/calidad_legal_vistaPadre/${id}`; 

    return this.http.put(base_url, body);
  }

  sendPostDocument(body: any){
    const base_url = `${base}/calidad_legal_hijos`; 
    
    return this.http.post(base_url, body);
  }



}
