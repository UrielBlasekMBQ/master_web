import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base = environment.api;

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http : HttpClient) { }

  //GET Acompañamiento
  getAcompanamiento(body: any){
    const base_url = `${base}/dashboard/documentos`
    return this.http.post(base_url, body);
    }

  //GET Acompañamiento
  getAcompanamientoResultados(body: any){
    const base_url = `${base}/dashboard/documentosResultados`
    return this.http.post(base_url, body);
    }

  //GET Doc aprueba
    getDocAprueba(body: any){
      const base_url = `${base}/dashboard/docaprueba`
      return this.http.post(base_url, body);
      }

   //GET Doc aprueba
    getRevisa(body: any){
      const base_url = `${base}/dashboard/docrevisa`
      return this.http.post(base_url, body);
      }

    //GET amef
    getAmef(body : any){
      const base_url = `${base}/dashboard/getamef`
      return this.http.post(base_url, body);
    }
}
