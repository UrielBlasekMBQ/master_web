import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const base = environment.api;

@Injectable({
  providedIn: 'root'
})
export class GrupoTrabajoService {

  constructor(private http : HttpClient) { }

  // get grupo de trabajos
  getGrupoTrabajo(body : any){
    const base_url = `${base}/amef-grupo/get-grupo`
    return this.http.post(base_url,body);
  }

  //get efectos 
  getEfectos(){
    const base_url = `${base}/amef-grupo/get-efectos`
    return this.http.get(base_url);    
  }

  //get probabilidad 
  getProbabilidad(){
    const base_url = `${base}/amef-grupo/get-probabilidad`
    return this.http.get(base_url);    
  }

    //get gravedad 
  getGravedad(){
  const base_url = `${base}/amef-grupo/get-gravedad`
  return this.http.get(base_url);    
  }

  //get determinacion 
  getDeterminacion(){
    const base_url = `${base}/amef-grupo/get-determinacion`
    return this.http.get(base_url);    
  }
}
