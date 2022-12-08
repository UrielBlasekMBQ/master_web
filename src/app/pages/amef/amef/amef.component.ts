import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import  decode  from 'jwt-decode';
import { AmefService } from 'src/app/services/amef/amef.service';
import { CatAmefEstatusService } from 'src/app/services/amef/cat-amef-estatus.service';
import { GrupoTrabajoService } from 'src/app/services/amef/grupo-trabajo.service';
import { ProcesosService } from 'src/app/services/procesos.service';
import Swal from 'sweetalert2';





@Component({
  selector: 'app-amef',
  templateUrl: './amef.component.html',
  styleUrls: ['./amef.component.css']
})
export class AmefComponent implements OnInit {

  firstFormGroup = this.formBuilder.group({
    tipoModelo: ['', Validators.required],
    componenteEvaluado: ['', Validators.required],
    componenteFincion: ['', Validators.required],
  });

  secondFormGroup = this.formBuilder.group({
    modelo_fallo: ['', Validators.required],
    efecto_potencial: ['', Validators.required],
    posibilidad: ['', Validators.required],
    gravedad: ['', Validators.required],
    probabilidad: ['', Validators.required],
    planificacion: ['', Validators.required],
  });

  formAcionesCorrectivas = this.formBuilder.group({
    ac_responsable: ['', Validators.required],
    ac_fecha_inicio: ['', Validators.required],
    ac_fecha_prevision: ['', Validators.required],
    ac_fecha_final: [''],
    // gravedad: ['', Validators.required],
    // probabilidad: ['', Validators.required],
  });



  isLinear = false;

  constructor(private formBuilder: FormBuilder, private GrupoTrabajoService : GrupoTrabajoService,
              private CatAmefEstatusService: CatAmefEstatusService, private ProcesosService : ProcesosService, 
              private AmefService : AmefService) { }

  responsable : any;
  listUsuarios : any;
  
  listEfectos : any;
  listProcesos : any;
  listAmefPlanifica : any;
  p : number =1;
  formulario2 = false;
  formulario3 = false;



  procesos= true
  tabla =false;
  formulario = false;
  now_planificacion: any;

  //////////Variablas formilario 1/////////
  botonA = true;
  botonB = false;
  grupoA = true;
  grupoB = false;
  listGrupo : any=[];
  tipoModelo ='';
  Componente ='';
  componenteFincion ='';
  nive1=true;
  //////////Variablas formilario 1////////

  //get responsables
getResponsable(){
  const token: any = localStorage.getItem('token');
  this.responsable =decode(token);
 //  console.log(this.responsable);

}

  /////////////////////////// Departamentos /////////////////////////
 proceso : any
  
  //Get procesos
  getProcesos(){
    this.ProcesosService.getProcesos().subscribe((res : any)=>{
      this.listProcesos = res;
    });
  }

  // Get tabla
  getTablaAMEF(proceso : any){
    this.proceso = proceso;
    this.procesos= false
    this.tabla =true;
    const token: any = localStorage.getItem('token');
    this.responsable =decode(token);
   //  console.log(this.responsable);
    let body ={'id_proceso' : proceso.id_proceso , 'id_usuario' : this.responsable.id_usuario };

    this.AmefService.getTablaAmef(body).subscribe((res : any) =>{
      this.listAmefPlanifica = res;
     //  console.log(this.listAmefPlanifica);
      var number : number = this.listAmefPlanifica.length;    
      this.now_planificacion = this.listAmefPlanifica[number-1];
     //  console.log('Segundo',this.now_planificacion);
      
    });


  }

  /////////////////////////// Departamentos /////////////////////////




 ///////////////////////////// AMEF ///////////////////////////////


 ///////////Planificacion /////////
 // add planificacion
 addAmefPlanifica(){
  this.formulario2=true;
 //  console.log(this.responsable);
  let body = {
    'id_proceso' : this.responsable.departamento,
    'id_usuario' : this.responsable.id_usuario,
    'amef_modelo' :this.firstFormGroup.value.tipoModelo,
    'amef_componente_eva' : this.firstFormGroup.value.componenteEvaluado,
    'amef_componente_func' : this.firstFormGroup.value.componenteFincion
  }
  
  this.AmefService.addPlanificacion(body).subscribe((res: any)=>{
   //  console.log(res);
   this.mensajeAdd(res);
    this.addGrupoTrabajo();
  })

  this.botonA=false;
  this.botonB=true;
  this.tipoModelo = this.firstFormGroup.value.tipoModelo;
  this.Componente = this.firstFormGroup.value.componenteEvaluado;
  this.componenteFincion = this.firstFormGroup.value.componenteFincion;

 }

   //////////////////Grupo de trabajo ////////////////
  // sacar id de planificacion

    //add Grupo e trabajo
    addGrupoTrabajo(){
      let body ={'id_proceso' : this.proceso.id_proceso , 'id_usuario' : this.responsable.id_usuario };
      this.listAmefPlanifica=[];
      this.AmefService.getTablaAmef(body).subscribe((res : any) =>{
        this.listAmefPlanifica = res;
       //  console.log(this.listAmefPlanifica);
        var number : number = this.listAmefPlanifica.length;    
        this.now_planificacion = this.listAmefPlanifica[number-1];
       //  console.log('Segundo',this.now_planificacion);
        for(let i =0; i<this.listGrupo.length; i++){
          let body ={'id_amef_planificacion': this.now_planificacion.id_amef_planificacion, 'id_usuario': this.listGrupo[i]?.id_usuario }
          this.AmefService.addGrupoTrabajo(body).subscribe((res : any)=>{
           //  console.log(res);
          });
        }
        
      });
      

      this.nive1=false;
    }
  //////////////////Grupo de trabajo ////////////////

 ///////////Planificacion /////////


 getFromAmef(){
  this.tabla =false;
  this.formulario = true;
  this.grupoA = true;
  this.grupoB = false;
 }
  

//get grupo de trabajo
getGrupoTrabajo(){
  this.grupoA = false;
  this.grupoB = true;
  this.GrupoTrabajoService.getGrupoTrabajo(this.responsable).subscribe((res : any)=>{
    this.listUsuarios = res;
   //  console.log(this.listUsuarios);
  });
}


/////////////////////////////////////AMEF ///////////////////////////
amef_tabla =true;
amef_from = false;
listDataAmef : any;

// Listado de data Amef Data de la tabla
getDataAmef(){
  this.formulario2=true;
  this.next_ac=false;
  this.listDataAmef=[];
 //  console.log(this.now_planificacion);
  let body = {'id_amef_planificacion' : this.now_planificacion.id_amef_planificacion }
  this.AmefService.getDataAmef(body).subscribe((res : any)=>{
    this.listDataAmef = res;
   //  console.log( this.listDataAmef);
    this.nextToAC();
  });
}

//get efectos 
getEfecto(){
  this.GrupoTrabajoService.getEfectos().subscribe((res: any)=>{
    this.listEfectos = res;
   //  console.log(this.listEfectos);
    
  });
}

listProbabilidad : any;
listGravedad : any;
listDeterminacion : any;

//Get catalogos de probabilidad
getCatalogosProb(){

  this.GrupoTrabajoService.getProbabilidad().subscribe((res : any)=>{
    this.listProbabilidad = res;
  });
  
  this.GrupoTrabajoService.getGravedad().subscribe((res: any)=>{
    this.listGravedad = res;
  });

  this.GrupoTrabajoService.getDeterminacion().subscribe((res : any)=>{
    this.listDeterminacion = res;
  });

}

migrupo( i: any){
  this.listGrupo.push(this.listUsuarios[i]);
  this.listUsuarios.splice(i, 1);
}

losusuarios(i : any){
  this.listUsuarios.push(this.listGrupo[i]);
  this.listGrupo.splice(i, 1);
}

rpn : any ;

calculaRPN(){
if (this.secondFormGroup.value.posibilidad && this.secondFormGroup.value.gravedad && this.secondFormGroup.value.probabilidad) {
console.log('1');
this.rpn = this.secondFormGroup.value.posibilidad * this.secondFormGroup.value.gravedad * this.secondFormGroup.value.probabilidad;
console.log(this.rpn);
this.validaRpn();
}else{console.log('0');}
}

addModoFallo(){
  this.cleanSeconForm();
this.amef_from = true;
this.amef_tabla= false; 
this.agregaAmef();
}

cleanSeconForm(){
  this.secondFormGroup.reset();
  this.rpn=0;
  this.estatus_rpn='';
}



returnTabla(){
this.amef_from = false;
this.amef_tabla= true; 

}


estatus_rpn : any='';
validaRpn(){
  if(this.secondFormGroup.value.gravedad == 9 || this.secondFormGroup.value.gravedad == 10){this.estatus_rpn='Riesgo critico';}else{
  if(this.rpn >=0 && this.rpn <= 199){this.estatus_rpn='Bajo riesgo';}
  if(this.rpn >=200 && this.rpn <= 299){this.estatus_rpn='Riesgo Moderado';}
  if(this.rpn >=300 && this.rpn <= 899){this.estatus_rpn='Alto riesgo';}
  if(this.rpn >=900 && this.rpn <= 1000){this.estatus_rpn='Riesgo critico';}
  }
}

//Add data amf
addDaraAmef(){
  if(this.estatus_rpn=='Bajo riesgo' || this.estatus_rpn==1){ this.estatus_rpn=1}
  if(this.estatus_rpn=='Riesgo Moderado' || this.estatus_rpn==2){ this.estatus_rpn=2}
  if(this.estatus_rpn=='Alto riesgo' || this.estatus_rpn==3){ this.estatus_rpn=3}
  if(this.estatus_rpn=='Riesgo critico' || this.estatus_rpn==4){ this.estatus_rpn=4}
  let body={
    'id_amef_planificacion' : this.now_planificacion.id_amef_planificacion,
    'amef_modelo_fallo' : this.secondFormGroup.value.modelo_fallo ,
    'id_efecto' : this.secondFormGroup.value.efecto_potencial,
    'id_probabilidad' : this.secondFormGroup.value.posibilidad,
    'id_gravedad' : this.secondFormGroup.value.gravedad,
    'id_deteccion' : this.secondFormGroup.value.probabilidad,
    'rpn_amef' : this.rpn,
    'clasificacion_amef' : this.estatus_rpn,
    'planificacion_amef' : this.secondFormGroup.value.planificacion
  }

  this.AmefService.addDataAmef(body).subscribe((res)=>{
   //  console.log(res);
   this.mensajeAdd(res);
    this.secondFormGroup.reset();
    this.rpn= 0;
    this.estatus_rpn= 0;
    this.getDataAmef();
    this.returnTabla();

    
  });
  this.formulario3=false;
}

next_ac=false;
nextToAC(){
  if (this.listDataAmef.length >0) {
    this.next_ac=true;
  }else{
   //  console.log('primero');
    
  }
}

amef_add= true;
amef_update= false;

agregaAmef(){
  this.amef_add= true;
  this.amef_update= false;
}
actializaAmef(){
  this.amef_add= false;
  this.amef_update= true;
}
// Editar Modo de fallo
modo_fallo : any;
editMododFallo(amef : any){

  this.addModoFallo();
  this.actializaAmef();
  this.modo_fallo = amef;
 //  console.log(this.modo_fallo);
  this.secondFormGroup.setValue({
  modelo_fallo : this.modo_fallo.amef_modelo_fallo,
  efecto_potencial : this.modo_fallo.id_efecto,
  posibilidad : this.modo_fallo.val_probabilidad,
  gravedad : this.modo_fallo.val_gravedad,
  probabilidad : this.modo_fallo.val_determinacion,
  planificacion : this.modo_fallo.planificacion_amef

});
this.rpn =this.modo_fallo.rpn_amef;
this.estatus_rpn =this.modo_fallo.clasificacion_amef;
}

// Editar Modo de fallo
updateModeloFallo(){
  let body={
    'id_amef_amef' : this.modo_fallo.id_amef_amef ,
    'amef_modelo_fallo' : this.secondFormGroup.value.modelo_fallo ,
    'id_efecto' : this.secondFormGroup.value.efecto_potencial,
    'id_probabilidad' : this.secondFormGroup.value.posibilidad,
    'id_gravedad' : this.secondFormGroup.value.gravedad,
    'id_deteccion' : this.secondFormGroup.value.probabilidad,
    'rpn_amef' : this.rpn,
    'clasificacion_amef' : this.estatus_rpn,
    'planificacion_amef' : this.secondFormGroup.value.planificacion
  }
  
 //  console.log(body);
  
   this.AmefService.updateDataAmef(body).subscribe((res)=>{
    //  console.log(res);
    this.mensajeUpdate(res);
     this.getDataAmef();
    this.returnTabla();
    
   });
}

//Eliminar modelo de fallo
date_modelo : any;
dateModelo(amef : any){
this.date_modelo = amef;
}
deleteModelo(){
  let body ={'id_amef_amef' : this.date_modelo.id_amef_amef };
this.AmefService.deleteDataAmef(body).subscribe((res : any)=>{
  console.log(res);
  
  this.mensajeDelete(res);
  this.getDataAmef();
})
}

nextAcciones(){
  this.getModelosAc();
  this.formulario3=true;
}

// Fase 2
amefFase2(){
  let body ={'id_amef_planificacion' : this.now_planificacion.id_amef_planificacion}
this.AmefService.updateFase2(body).subscribe((res:any)=>{

})
}



///////////////////////////// AMEF ///////////////////////////////

////////////////////////////// acciones correctivas //////////////////////////

// Get modeloa
getModelosAc(){
 //  console.log(this.now_planificacion);
 this.form_ac=false;
 this.tabla_ac =true;

  
  let body ={'id_amef_planificacion': this.now_planificacion.id_amef_planificacion}
 //  console.log(body);
  
  this.AmefService.getModelosAc(body).subscribe((res : any)=>{
     console.log(res);
    this.modelo_ac = res;
    this.num_modelo_ac = this.modelo_ac.length;
    this.dataPrimer = this.modelo_ac;
   //  console.log(this.dataPrimer);
    this.get_acti_correc();

  });
}

  //List actividad correctiva
  get_acti_correc(){
   //  console.log(this.now_planificacion);
    this.listAcciones=[];
    let body1 ={'id_amef_planificacion' :this.now_planificacion?.id_amef_planificacion };
   //  console.log(body1);
    
    this.AmefService.getAccionesCorrectiva(body1).subscribe((res: any)=>{
      this.listAcciones = res;
     //  console.log(this.listAcciones);
      
    })
  }

fechaProgramada : any =0;
//Validar fecha de inicio 
validaFechaPrevencion(){
  let form3 : null;
  form3 = this.formAcionesCorrectivas.value;
  if (this.formAcionesCorrectivas.value.ac_fecha_inicio < this.formAcionesCorrectivas.value.ac_fecha_prevision) {
   //  console.log('Si');
    let time = this.formAcionesCorrectivas.value.ac_fecha_inicio
    let time1 =this.formAcionesCorrectivas.value.ac_fecha_prevision;

    var fechaInicio = new Date(time).getTime();
    var fechaFin    = new Date(time1).getTime();

    let dif = fechaInicio - fechaFin;
    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
   //  console.log(dias);
    this.fechaProgramada = dias*-1;
  }else{
   //  console.log('no');
    this.formAcionesCorrectivas.setValue({
      ac_responsable : this.formAcionesCorrectivas.value.ac_responsable,
      ac_fecha_inicio : this.formAcionesCorrectivas.value.ac_fecha_inicio,
      ac_fecha_prevision : '',
      ac_fecha_final : '',
    });
    this.fechaElaborado=0;
    this.amef_estatus = '';
    
  }  
  this.validaEstatus();
}

fechaElaborado : any =0;
//Validar fecha de inicio 
validaFechaFinal(){

  
  if (this.formAcionesCorrectivas.value.ac_fecha_inicio < this.formAcionesCorrectivas.value.ac_fecha_final) {
   //  console.log('Si');
    let time = this.formAcionesCorrectivas.value.ac_fecha_inicio
    let time1 =this.formAcionesCorrectivas.value.ac_fecha_final;

    var fechaInicio = new Date(time).getTime();
    var fechaFin    = new Date(time1).getTime();

    let dif = fechaInicio - fechaFin;
    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
   //  console.log(dias);
    this.fechaElaborado = dias * -1;

  }else{
   //  console.log('no');
    this.fechaElaborado=0;
    this.formAcionesCorrectivas.setValue({
      ac_responsable : this.formAcionesCorrectivas.value.ac_responsable,
      ac_fecha_inicio : this.formAcionesCorrectivas.value.ac_fecha_inicio,
      ac_fecha_prevision : this.formAcionesCorrectivas.value.ac_fecha_prevision,
      ac_fecha_final : '',
    });
    
  }  
  this.validaEstatus();
}

amef_estatus : any ='';
validaEstatus(){
  if (this.formAcionesCorrectivas.value.ac_fecha_final || this.formAcionesCorrectivas.value.ac_fecha_prevision) {
   //  console.log('si tiene datos');
    if (this.fechaElaborado =='') {
      this.amef_estatus = "Proceso";
    }else{
      if (this.fechaElaborado > this.fechaProgramada) {
        this.amef_estatus = "Concluido con retraso";
      }
      if (this.fechaElaborado <= this.fechaProgramada && this.fechaElaborado >= this.fechaProgramada ) {
        this.amef_estatus = "Concluido";
      }
 
    }
    
  }else{
   //  console.log('No tiene datos');
    
  }
}
///////////
tabla_ac =true;
form_ac=false;
listAcciones : any;
add_accion =true;
update_accion = false;

go_ac(){
  this.tabla_ac =false;
  this.form_ac=true;
}

back_ac(){
  this.tabla_ac =true;
  this.form_ac=false;
}

//get modelos de fallo
modelo_ac : any;
num_modelo_ac : any;


primero : any;
dataPrimer: any;
primerModelo(){
  this.formAcionesCorrectivas.reset();
  this.add_accion =true;
  this.update_accion = false;
  this.go_ac();
  this.primero =this.modelo_ac[0].planificacion_amef;
  this.dataPrimer =this.modelo_ac[0];
 //  console.log(this.primero);
  this.listGrupo =[];
  let body = {'id_amef_planificacion' : this.dataPrimer.id_amef_planificacion};
  this.AmefService.getRsponsablesReg(body).subscribe((res: any)=>{
    this.listGrupo = res;
    this.fechaProgramada = 0;
    this.fechaElaborado = 0;
    this.amef_estatus = 0;
  })
  
}

// Add accion correctiva
addAccionCorrectiva(){
  let fecha_fin;
  if (this.amef_estatus=="Proceso") {this.amef_estatus = 1}
  if (this.amef_estatus=="Concluido con retraso") {this.amef_estatus = 2}
  if (this.amef_estatus=="Concluido") {this.amef_estatus = 3}
  if (this.formAcionesCorrectivas.value.ac_fecha_final) { fecha_fin = this.formAcionesCorrectivas.value.ac_fecha_final }else{fecha_fin ='0000-00-00'}

  
  let body ={
    'id_amef_amef' : this.dataPrimer.id_amef_amef, 
    'id_amef_planificacion' : this.dataPrimer.id_amef_planificacion, 
    'id_grupo_trabajo' : this.formAcionesCorrectivas.value.ac_responsable, 
    'ac_fech_inicio' : this.formAcionesCorrectivas.value.ac_fecha_inicio, 
    'ac_fech_final' : this.formAcionesCorrectivas.value.ac_fecha_prevision, 
    'ac_final' : fecha_fin, 
    'ac_programado' : this.fechaProgramada, 
    'ac_elaborado' : this.fechaElaborado, 
    'id_amef_estatus' : this.amef_estatus 
  };

 //  console.log(body);
  
  this.AmefService.addModelosAc(body).subscribe((res)=>{
   //  console.log(res);
   this.mensajeAdd(res);
    this.formAcionesCorrectivas.reset();
    
  });

  let body1={ 'id_amef_amef' :this.dataPrimer.id_amef_amef};
  this.AmefService.UpdateModModelosAc(body1).subscribe((res : any)=>{
   //  console.log(res);
    this.back_ac();
    this.getModelosAc();
  });
  
}

accion_correctiva : any;

//Cargar Formulario
changeFrom(accion : any){
  console.log(accion);
  
  this.add_accion =false;
  this.update_accion = true;
  this.accion_correctiva=accion;
  this.primero = accion.planificacion_amef;
 //  console.log(this.accion_correctiva);
  this.formAcionesCorrectivas.reset();
  this.go_ac();
  this.formAcionesCorrectivas.setValue({
    ac_responsable : this.accion_correctiva.id_grupo_trabajo,
    ac_fecha_inicio : '',
    ac_fecha_prevision : '',
    ac_fecha_final : ''

  });
this.fechaProgramada = accion.ac_programado;
this.fechaElaborado = '';
this.amef_estatus = '';

}

updateAccionCorrectiva(){
  let fecha_fin;
  if (this.amef_estatus=="Proceso") {this.amef_estatus = 1}
  if (this.amef_estatus=="Concluido con retraso") {this.amef_estatus = 2}
  if (this.amef_estatus=="Concluido") {this.amef_estatus = 3}
  if (this.formAcionesCorrectivas.value.ac_fecha_final) { fecha_fin = this.formAcionesCorrectivas.value.ac_fecha_final }else{fecha_fin =0}

  let body ={
    'id_ac_amef' : this.accion_correctiva.id_ac_amef, 
    'id_grupo_trabajo' : this.formAcionesCorrectivas.value.ac_responsable, 
    'ac_fech_inicio' : this.formAcionesCorrectivas.value.ac_fecha_inicio, 
    'ac_fech_final' : this.formAcionesCorrectivas.value.ac_fecha_prevision, 
    'ac_final' : fecha_fin, 
    'ac_programado' : this.fechaProgramada, 
    'ac_elaborado' : this.fechaElaborado, 
    'id_amef_estatus' : this.amef_estatus 
  };
 //  console.log(body);
  
this.AmefService.updateAcionesCorrectivas(body).subscribe((res : any) =>{
 //  console.log(res);
 this.mensajeUpdate(res);
  this.get_acti_correc();
  this.back_ac();

});
  

}

// tercera fase 
vistaFinal = false;

terceraFase(){
  
  let body ={'id_amef_planificacion' : this.now_planificacion.id_amef_planificacion};
  this.AmefService.updateFase3(body).subscribe((res : any) =>{
   //  console.log(res);
    this.tabla=false;
    this.formulario=false;
  });
  this.vistaFinal = true;
  
  
  this.getTablaAMEF(this.proceso);

  /////// Final del seguimiento //////////////
  this.formulario2 = false;
  this.formulario3 = false;

  /////// Final del seguimiento //////////////

}


////////////////////////////// acciones correctivas //////////////////////////

/////////////////////////Continuidad de Poceso /////////////////
dataPrimerForm: any;


  determinaFase(amef : any){
    this.botonA=false;
    this.botonB=true;
    this.dataPrimerForm = amef;
   //  console.log(this.dataPrimerForm);
    this.tipoModelo = this.dataPrimerForm.amef_modelo;
    this.Componente = this.dataPrimerForm.amef_componente_func;
    this.componenteFincion = this.dataPrimerForm.amef_componente_eva;
    this.now_planificacion = amef;
    

    if(amef.amef_planifica_estatus==0){
      this.formulario = true;
      this.tabla = false;
     //  console.log('si entro');
      this.changeprimerForm();

    }
  }

  //Grupo de trabajo ya definido
  changeprimerForm(){

    this.firstFormGroup.setValue({
    tipoModelo : this.dataPrimerForm.amef_modelo,
    componenteEvaluado : this.dataPrimerForm.amef_componente_func,
    componenteFincion : this.dataPrimerForm.amef_componente_eva
    });

    let body={'id_amef_planificacion' : this.dataPrimerForm.id_amef_planificacion}

    this.AmefService.getGrupoTrabajoDef(body).subscribe((res: any)=>{
      this.listGrupo = res;
     //  console.log(res);
      
    });
  }

  /////////////// NAVEGACION ///////////////
  backProcesos(){
   //  console.log('si entro');
    this.procesos=true;
    this.formulario=false;
    this.tabla=false;
    this.vistaFinal=false;
    this.listDataAmef=[];
    this.listAcciones=[];

    this.firstFormGroup.reset();
    this.listGrupo=[];
    this.botonA = true;
    this.botonB = false;
    this.formulario2=false;
    this.formulario3=false;
    this.nive1=true;
  }

  backRegistros(){

    this.formulario=false;
    this.tabla=true;
    this.vistaFinal=false;
    this.listDataAmef=[];
    this.listAcciones=[];

    this.firstFormGroup.reset();
    this.listGrupo=[];
    this.botonA = true;
    this.botonB = false;
    this.formulario2=false;
    this.formulario3=false;
    this.nive1=true;

  }


  /////////////// NAVEGACION ///////////////

  ////////////Ver amef ///////////////

  verAmef(amef : any){
    this.vistaFinal=true;
    this.tabla=false;
   //  console.log(amef);
    this.now_planificacion = amef ;
    // Listado de Grupo de Trabajo
    let body = {'id_amef_planificacion' : amef.id_amef_planificacion};
    this.listGrupo=[];
    this.AmefService.getRsponsablesReg(body).subscribe((res : any)=>{
      this.listGrupo=res;
     //  console.log(this.listGrupo);      
    });

    //Listado de Amef
    this.listDataAmef=[];
   //  console.log(this.now_planificacion);
    let body1 = {'id_amef_planificacion' : this.now_planificacion.id_amef_planificacion }
    this.AmefService.getDataAmef(body1).subscribe((res : any)=>{
      this.listDataAmef = res;
     //  console.log( this.listDataAmef);      
    });

    //Listadod de acciones correctivas
    this.listAcciones=[];
    let body2 ={'id_amef_planificacion' :this.now_planificacion?.id_amef_planificacion };
    console.log(body1);
    
    this.AmefService.getAccionesCorrectiva(body2).subscribe((res: any)=>{
      this.listAcciones = res;
       console.log(this.listAcciones);
      
    })
    
  }

  ////////////Ver amef ///////////////




  getPreceso(body : any){
    this.ProcesosService.getProcesosUsuario(body).subscribe((res : any)=>{
      this.listProcesos = res;
     //  console.log(res);
      
    });
   };
  
  tipoProceso : any;



  ngOnInit(): void {
          /// Procesos ///
          const token: any = localStorage.getItem('token');
          this.tipoProceso =decode(token);
         //  console.log(this.tipoProceso);
          if(this.tipoProceso.tipoUsuario == 1){
           //  console.log('procesos 1');
            
            this.getProcesos();
          } else{
            let body ={'id_usuario' : this.tipoProceso.id_usuario};
            this.getPreceso(body);
            
           //  console.log('Procesos 2');
            
          }
          /// Procesos ///
    this.getResponsable();
    this.getEfecto();
    this.getCatalogosProb();
  }

    ////// Mensajes //////
    mensajeAdd(res : any){
      if (res.ok) {
        Swal.fire({
          title:'Correcto',
          text: `Se agrego correctamente`,
          icon: 'success',
          confirmButtonText: 'confirmar'
          
        })
  
      } else {
        Swal.fire({
          title:'Error',
          text: `Erro de registro: '${res.msg}' `,
          icon: 'error',
          confirmButtonText: 'confirmar'
        })
      }
    }
  
    mensajeUpdate(res : any){
      if (res.ok) {
        Swal.fire({
          title:'Correcto',
          text: `Se actualizo correctamente`,
          icon: 'success',
          confirmButtonText: 'confirmar'
          
        })
  
      } else {
        Swal.fire({
          title:'Error',
          text: `Erro de registro: '${res.msg}' `,
          icon: 'error',
          confirmButtonText: 'confirmar'
        })
      }
  
    }
  
    mensajeDelete(res : any){
      if (res.ok) {
        Swal.fire({
          title:'Correcto',
          text: `Se actualizo correctamente`,
          icon: 'success',
          confirmButtonText: 'confirmar'
          
        })
  
      } else {
        Swal.fire({
          title:'Error',
          text: `Erro de registro: '${res.msg}' `,
          icon: 'error',
          confirmButtonText: 'confirmar'
        })
      }
  
    }
    
    ////// Mensajes //////

}
