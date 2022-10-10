import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const base = environment.api;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url="/api";

  constructor(private http:  HttpClient) { }

  //get usuarios
  getUsuarios(){
    const base_url = `${base}/api`
    return this.http.get(base_url);
  }

  //get un usuario
  getUnUsuairio(id: number){
    const base_url = `${base}/api`
    return this.http.get(base_url+'/'+id);
  }

  //agregar usuario
  addUsuario(usuario : Usuario){
    const base_url = `${base}/api`
    return this.http.post(base_url, usuario);
  }

  //Editar Usuario
  editUsuario(id: string, usuairo: Usuario){
    const base_url = `${base}/api`
    return this.http.put(base_url+'/'+id, usuairo);
  }

  // Eliminar usuario
  deleteUsuario(id : string){
    const base_url = `${base}/api`
    return this.http.delete(base_url+'/'+id);
  }

  // Agregar procesos
  addProcesos(body : any){
    const base_url = `${base}/api/procesos`
    return this.http.post(base_url, body);
  }

  //get procesos de usuario
  getProcesosUsuario(body : any){
    const base_url = `${base}/api/get_procesos`
    return this.http.post(base_url, body);
  }

  //delete procesos de usuario
  deleteProcesosUsuario(body : any){
    const base_url = `${base}/api/delete_procesos`
    return this.http.post(base_url, body);
  }

  //delete permisos de usuario
  deletePermisosUsuario(body : any){
    const base_url = `${base}/api/delete_permisos`
    return this.http.post(base_url, body);
  }

    //delete permisos de usuario
    get_un_usuario(body : any){
      const base_url = `${base}/api/get_un_usuario`
      return this.http.post(base_url, body);
    }

}

export interface Usuario{

    id_usuario?: string
    usuario?: string
    nombre?: string
    apellidos?: string
    email?: string
    departamento?: string
    tipoUsuario?: string
    password?: string
    estatus?: number
    foto?: string

}