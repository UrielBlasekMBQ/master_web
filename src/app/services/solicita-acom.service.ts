import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base = environment.api;

@Injectable({
  providedIn: 'root'
})
export class SolicitaAcomService {

  constructor(private http : HttpClient) { }

  // Get Solicitudes
  getSolicitudes(body:any){
    const base_url = `${base}/acompanamiento/solicita`; 
    return this.http.post(base_url, body);

  }


    // Get Procesos admin
    getProcesos_admin(body : any){
      const base_url = `${base}/acompanamiento/contador_admin_solicita`; 
      return this.http.post(base_url, body);
  
    }

    // Get Procesos usuarios
    getProcesos_usuarios(body : any){
      const base_url = `${base}/acompanamiento/get_procesos_usuarios`; 
      return this.http.post(base_url, body);
  
    }

  // Get Revisores Internos
  getRevisoresInternos(body : any){
    const base_url = `${base}/acompanamiento/revisores_interno`; 
    return this.http.post(base_url, body);

  }

  // Get Revisores Internos
  getRevisoresExternos(){
    const base_url = `${base}/acompanamiento/revisores_externo`; 
    return this.http.get(base_url);

  }

  //Agregar acompañamiento
  sendPost(body: any){
    // let base_url = `${base}`
    const base_url = `${base}/acompanamiento`; 

   return this.http.post(base_url, body);
  }


  // Get Procesos para revisar
  getProcesosRevision(){
    const base_url = `${base}/acompanamiento/proceso_revision`; 
    return this.http.get(base_url);

  }



  


}
