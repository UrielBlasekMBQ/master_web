import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const base = environment.api;

@Injectable({
  providedIn: 'root'
})
export class AmefService {

  constructor(private http : HttpClient) { }

  //Get Tabla amef
  getTablaAmef(body : any){
    const base_url = `${base}/amef/get_amefTable`;
    return this.http.post(base_url,body);
  }



  // Add grupo de trabajo 
  addGrupoTrabajo(body : any){
    const base_url = `${base}/amef/add_grupo_trabajo`;
    return this.http.post(base_url, body);
  }

  // add Planificacion
  addPlanificacion(body : any){
    const base_url = `${base}/amef/add_planificacion`;
    return this.http.post(base_url, body);
  }

  ///////////// Amef /////////////////////
  // Get data Ameg
  getDataAmef(body : any){
    const base_url = `${base}/amef/get_data_amef`;
    return this.http.post(base_url, body);
  }

  //Add Data amef
  addDataAmef(body: any){
    const base_url = `${base}/amef/add_data_amef`;
    return this.http.post(base_url, body);
  }

    //Update Data amef
    updateDataAmef(body: any){
      const base_url = `${base}/amef/update_data_amef`;
      return this.http.post(base_url, body);
    }


  //delete Data amef
  deleteDataAmef(body: any){
    const base_url = `${base}/amef/delete_data_amef`;
    return this.http.post(base_url, body);
  }
  ///////////// Amef /////////////////////

  //////////////Acciones correctivas /////////////

    //get modelos ac
  getModelosAc(body: any){
    const base_url = `${base}/amef/get_modelo_ac`;
    return this.http.post(base_url, body);
  }

      //get Acciones correctivas
      getAccionesCorrectiva(body: any){
        const base_url = `${base}/amef/get_acciones_correctivas`;
        return this.http.post(base_url, body);
      }

      //segunda fase
      updateFase2(body: any){
        const base_url = `${base}/amef/update_fase2`;
        return this.http.post(base_url, body);
      }

      //tercera fase
      updateFase3(body: any){
        const base_url = `${base}/amef/update_fase3`;
        return this.http.post(base_url, body);
      }


    //add modelos ac
    UpdateModModelosAc(body: any){
      const base_url = `${base}/amef/update_modelo_ac_mod`;
      return this.http.post(base_url, body);
    }

    //Get responsables
    getRsponsablesReg(body : any){
      const base_url = `${base}/amef/get_respon_reg`;
      return this.http.post(base_url, body);
    }

  //add modelos ac
  addModelosAc(body: any){
    const base_url = `${base}/amef/add_modelo_ac`;
    return this.http.post(base_url, body);
  }

  //Ac tualiza acciones correctivas 
  updateAcionesCorrectivas(body: any){
    const base_url = `${base}/amef/update_acciones_correctivas`;
    return this.http.post(base_url, body);
  }
  //////////////Acciones correctivas /////////////

  ///// Seguimiento para amef
    //get grupo de trabajo
    getGrupoTrabajoDef(body: any){
      const base_url = `${base}/amef/ga_grupo_trabajo_def`;
      return this.http.post(base_url, body);
    }

}
