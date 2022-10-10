import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const base = environment.api;

@Injectable({
  providedIn: 'root'
})
export class ApruebaDocumentService {

  constructor(private http: HttpClient) { }

  url =":3000/docAprueba";

  getDocumentos(body : any){
    const base_url = `${base}/docAprueba/documentos`
    return this.http.post(base_url, body);
  }
  
  updateDocumento(id : any, listDoc :any ){
    const base_url = `${base}/docAprueba/${id}`; 

  
    return this.http.put(base_url, listDoc);
  }

}
