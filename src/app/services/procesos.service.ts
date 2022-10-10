import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base = environment.api;

@Injectable({
  providedIn: 'root'
})
export class ProcesosService {

  url=":3000/proceso";

  constructor(private http:  HttpClient) { }

  //get procesos
  getProcesos(){

    const base_url = `${base}/proceso`

    return this.http.get(base_url);
  }

  //get proceso
  getProceso(id : number){
    const base_url = `${base}/proceso`
    return this.http.get(base_url+'/'+id);
  }

  //add proceso
  addProceso(proceso : Proceso){
    const base_url = `${base}/proceso`
    return this.http.post(base_url, proceso);
  }

  //Edit Proceso
  updateProceso(id : number, proceso : Proceso  ){
    const base_url = `${base}/proceso`
    return this.http.put(base_url+'/'+id, proceso);
  }

  //Delete Proceso
  deleteProceso( id: string){
    const base_url = `${base}/proceso`
    return this.http.delete(base_url+'/'+id);
  }

  // Get Proceso
  permiProceso(body :any){
    const base_url = `${base}/proceso/proceso`
    return this.http.post(base_url, body);
  }

  //get procesos de usuario
  getProcesosUsuario(body : any){
    const base_url = `${base}/api/get_procesos`
    return this.http.post(base_url, body);
  }

}




export interface Proceso{
  id_proceso? :number
  departamento? : string
  direccion? : string
  descripcion?: string
}
