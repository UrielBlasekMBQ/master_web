import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';


const base = environment.api;

@Injectable({
  providedIn: 'root'
})
export class ContratosService {

  constructor(private http :HttpClient) { }

  addContratos(body : any){
    const base_url = `${base}/contratos/addContrato`; 
    return this.http.post(base_url,body);

  }

  addEtapa(body : any){
    const base_url = `${base}/contratos/addEtapas`; 
    return this.http.post(base_url,body);
  }

  getAllContratos(){
    const base_url = `${base}/contratos/allContratos`; 
    return this.http.get(base_url);
  }

  getContratosUsuario(body : any){
    const base_url = `${base}/contratos/getContratosUsuario`; 
    return this.http.post(base_url,body);
  }

  getEtapas(body : any){
    const base_url = `${base}/contratos/getEtapas`; 
    return this.http.post(base_url, body);
  }

  getActividades(body : any){
    const base_url = `${base}/contratos/getActividades`; 
    return this.http.post(base_url, body);
  }

  addActividades(body : any){
    const base_url = `${base}/contratos/addActividad`; 
    return this.http.post(base_url, body);
  }

  updateHoras(body : any){
    const base_url = `${base}/contratos/updateHoras`; 
    return this.http.post(base_url, body);
  }

  updateHorasEtapas(body : any){
    const base_url = `${base}/contratos/updateHorasEtapas`; 
    console.log(body);
    
    return this.http.post(base_url, body);
  }

  updateNumEtapas(body : any){
    const base_url = `${base}/contratos/updateNumEtapas`; 
    return this.http.post(base_url, body);
  }

  updateNumActividadesEtapas(body : any){
    const base_url = `${base}/contratos/updateActividadEtapa`; 
    return this.http.post(base_url, body);
  }

  updateNumActividadesContrato(body : any){
    const base_url = `${base}/contratos/updateActividadContrato`; 
    return this.http.post(base_url, body);
  }


  getHistorialActividades(body : any){
    const base_url = `${base}/contratos/getActividadesHistorial`; 
    return this.http.post(base_url, body);
  }

  getUsuarioMBQ(body : any){
    const base_url = `${base}/contratos/usuariombq`; 
    return this.http.post(base_url, body);
  }







}
