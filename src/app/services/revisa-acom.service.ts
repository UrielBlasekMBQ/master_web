import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base = environment.api;

@Injectable({
  providedIn: 'root'
})
export class RevisaAcomService {

  constructor(private http : HttpClient) { }


    // Get Solicitudes
    getSolicitudes(body:any){
      const base_url = `${base}/acompanamiento/revisor`; 
      return this.http.post(base_url, body);
  
    }

    // Actualizacoin de Soicitud
    updateSolicitud(bodyEstatus: any){
      const base_url = `${base}/acompanamiento/update_interno`; 
      return this.http.put(base_url, bodyEstatus);
    };

    // Actualizacoin de Soicitud
    updateSolicitudExterno(bodyEstatus: any){
      const base_url = `${base}/acompanamiento/update_externo`; 
      return this.http.put(base_url, bodyEstatus);
    };


    //Agregar Observacion
    sendObservacion(body: any){
    // let base_url = `${base}`
    const base_url = `${base}/acompanamiento/addobservacion`; 
    console.log(base_url);

    return this.http.post(base_url, body);

    }
  
  //Get observacion
  getObservacion(body : any){
    const base_url = `${base}/acompanamiento/getobservacion`; 
    return this.http.post(base_url,body);
  }

  // Eliminar acompañamiento
  deleteAcompanamiento(body: any){
    const base_url = `${base}/acompanamiento/deleteacompana`; 
    return this.http.post(base_url,body);
  }


    // Eliminar Documento
    deleteDocumento(body: any){
      console.log(body);
      
      const base_url = `${base}/acompanamiento/deletedocumento`; 
      return this.http.post(base_url,body);
    }

      // Eliminar acompañamiento
    deleteObservacion(body: any){
      const base_url = `${base}/acompanamiento/deleteobservacion`; 
      return this.http.post(base_url,body);
    }

      //get contador 
      getcontador( body: any ){
      const base_url = `${base}/acompanamiento/contador`; 
      return this.http.post(base_url, body);

  }




}
