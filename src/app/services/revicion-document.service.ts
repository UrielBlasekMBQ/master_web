import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base = environment.api;


@Injectable({
  providedIn: 'root'
})
export class RevicionDocumentService {

  constructor(private http: HttpClient) { }

  url =":3000/docRevisa";

  getDocumentos(body : any){
    const base_url = `${base}/docRevisa/documentos`
    return this.http.post(base_url, body);
  }

  updateDocumento(id : any, listDoc :any ){
    const base_url = `${base}/docRevisa/${id}`

    return this.http.put(base_url, listDoc);
  }


  
}
