import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base = environment.api;

@Injectable({
  providedIn: 'root'
})
export class RiskService {

  constructor(private http:  HttpClient) { }

    //Usuarios por procesos
    getUsuarios(body : any){
      const base_url = `${base}/risk/usuarioResponde`
      return this.http.post(base_url, body);
    }

    //Usuarios por procesos
    generaRisk(body : any){
      const base_url = `${base}/risk/generaRisk`
      return this.http.post(base_url, body);
    }

    //Genera token de acceso
    generaTokenRisk(body : any){
      const base_url = `${base}/risk/generaTokenRisk`
      return this.http.post(base_url, body);
    }

    //Genera token de acceso
    generaTokenRiskAdmin(body : any){
      const base_url = `${base}/risk/generaTokenRiskAdmin`
      return this.http.post(base_url, body);
    }

    //Genera token de acceso
    generaTokenRiskAdministrador(body : any){
      const base_url = `${base}/risk/generaTokenRiskAdministrador`
      return this.http.post(base_url, body);
    }

    //Genera token de acceso
    validaTokenRisk(body : any){
      const base_url = `${base}/risk/validaToken`
      return this.http.post(base_url, body);
    }

    //Genera token de acceso Admin validaTokenRiskadmin
    validaTokenRiskGenera(body : any){
      const base_url = `${base}/risk/validaTokenRiskGenera`
      return this.http.post(base_url, body);
    }

    //Genera token de acceso Admin
    validaTokenRiskAdministrador(body : any){
      const base_url = `${base}/risk/validaTokenRiskAdministrador`
      return this.http.post(base_url, body);
    }

    //Listado de risk
    listRsk(body : any){
      const base_url = `${base}/risk/listRisk`
      return this.http.post(base_url, body);
    }

    //Listado de risk usuario
    listRiskUsuario(body : any){
      const base_url = `${base}/risk/listRiskUsuario`
      return this.http.post(base_url, body);
    }

    //Listado de risk para administrador
    listRiskAdmin(){
      const base_url = `${base}/risk/allRisk`
      return this.http.get(base_url);
    }

    //Listado de risk
    listRespuestasRisk(body : any){
      const base_url = `${base}/risk/listRespuestaRisk`
      return this.http.post(base_url, body);
    }

    //Listado de risk
    unoRespuestasRisk(body : any){
      const base_url = `${base}/risk/unoRespuestasRisk`
      return this.http.post(base_url, body);
    }

    //Listado de risk
    dosRespuestasRisk(body : any){
      const base_url = `${base}/risk/dosRespuestasRisk`
      return this.http.post(base_url, body);
    }

    //Listado de risk
    tresRespuestasRisk(body : any){
      const base_url = `${base}/risk/tresRespuestasRisk`
      return this.http.post(base_url, body);
    }

            //Listado de risk
    cuatroRespuestasRisk(body : any){
      const base_url = `${base}/risk/cuatroRespuestasRisk`
      return this.http.post(base_url, body);
    }

    //Listado de risk
    cincoRespuestasRisk(body : any){
      const base_url = `${base}/risk/cincoRespuestasRisk`
      return this.http.post(base_url, body);
    }

            //Listado de risk
    seisRespuestasRisk(body : any){
      const base_url = `${base}/risk/seisRespuestasRisk`
      return this.http.post(base_url, body);
    }

    //Listado de risk
    sieteRespuestasRisk(body : any){
      const base_url = `${base}/risk/sieteRespuestasRisk`
      return this.http.post(base_url, body);
    }

  //Listado de risk
    ochoRespuestasRisk(body : any){
      const base_url = `${base}/risk/ochoRespuestasRisk`
      return this.http.post(base_url, body);
    }

    //Listado de risk
    finalRisk(body : any){
      const base_url = `${base}/risk/finalRisk`
      return this.http.post(base_url, body);
    }

    // Cambiar usuario para responder 
    cambiaUsuarioResponde(body : any){
      const base_url = `${base}/risk/cambiaUsuarioResponde`
      return this.http.post(base_url, body);
    }

    // Mandar a edicion 
    mandarAEdicionRisk(body : any){
      const base_url = `${base}/risk/mandarAEdicionRisk`
      return this.http.post(base_url, body);
    }
    
    // Datos de un usuario
    datosUsuario(body : any){
      const base_url = `${base}/api/datos`
      return this.http.post(base_url, body);
    }

    //Agregar Historial
    datosHistorial(body : any){
      const base_url = `${base}/risk/addHistorial`
      return this.http.post(base_url, body);
    }
    

}
