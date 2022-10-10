import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base = environment.api;

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http : HttpClient) { }


  //GET amef
  sendData(body : any){
    const base_url = `${base}/email/prueba`
    return this.http.post(base_url, body);
  }
}
