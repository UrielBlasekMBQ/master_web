import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PermisosService } from 'src/app/services/permisos.service';
import { ProcesosService, Proceso } from 'src/app/services/procesos.service';
import { UsuariosService,Usuario } from 'src/app/services/usuarios.service';
import { ViewPermisosService } from 'src/app/services/view-permisos.service';
import Swal from 'sweetalert2';
import  decode  from 'jwt-decode';





@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css']
})
export class PermisosComponent implements OnInit {


  public viewDepartamento: boolean = true;
  public viewUsuarios: boolean = false;
  public viewPermisos: boolean = false;

  backDepartamentos(){
    this.viewDepartamento = true;
    this.viewUsuarios = false;
    this.viewPermisos = false;
  }


  backTiposUsuario(){
    this.viewDepartamento = false;
    this.viewUsuarios = false;
    this.viewPermisos = false;
  }


  backUsuarios(){
    this.viewDepartamento = false;
    this.viewUsuarios = true;
    this.viewPermisos = false;
  }



  public formPermisos: FormGroup;

  listProcesos?: Proceso[];
  listarUsuarios : any;
  listarPermisos: any;
  p : number =1;

  constructor(private FormBuilder: FormBuilder, private UsuariosService: UsuariosService, private PermisosService : PermisosService, private ProcesosService : ProcesosService,
              private ViewPermisosService: ViewPermisosService) {
    this.formPermisos = this.FormBuilder.group({
      calidad:[false],
      calidadVer:[false],
      calidadDescargar:[false],
      calidadAdd:[false],
      calidadUpdate:[false],
      calidadDelete:[false],

      operacion:[false],
      operacionVer:[false],
      operacionDescargar:[false],
      operacionAdd:[false],
      operacionUpdate:[false],
      operacionDelete:[false],

      registros: [false],
      registrosVer: [false],
      registrosDescargar: [false],
      registrosAdd: [false],
      registrosUpdate: [false],
      registrosDelete: [false],

      marcoLegal :[false],
 
      norma : [false],
      normaVer : [false],
      normaDescargar : [false],
      normaAdd : [false],
      normaUpdate : [false],
      normaDelete : [false],

      marco : [false],
      marcoVer : [false],
      marcoDescargar : [false],
      marcoAdd : [false],
      marcoUpdate : [false],
      marcoDelete : [false],

      diagramas : [false],
      foda : [false],
      toruga : [false],

      amef : [false],
      amef_amef : [false],
      efecto_fallo : [false],


      acompanamiento : [false],
      solicitaAcom : [false],
      revisaAcom : [false],

      controlDocumento : [false],

      asigna : [false],
      asignaVer : [false],
      asignaAdd : [false],

      revisa : [false],
      revisaVer : [false],
      revisaRevisar : [false],
      
      aprueba : [false],
      apruebaVer : [false],
      apruebaAprueba : [false],

      proceso : [false],
      procesoAdd : [false],
      procesoUpdate : [false],
      procesoDelete : [false],

      usuarios : [false],

      usuario : [false],
      usuarioAdd : [false],
      usuarioUpdate : [false],
      usuarioDelete : [false],

      permiso : [false],
      permisoAdd : [false],

      historial : [false],
      configuracion : [false],

      capacitacion : [false],
      capacitacionVer : [false],
      capacitacionHistorial : [false],
      capacitacionAdd : [false],
      capacitacionUpdate : [false],
      capacitacionDelete : [false],
      reporte_acompanamiento : [false]


    });
   }

     //Get Procesos
  getProcesos(){
    this.ProcesosService.getProcesos().subscribe(res=>{
     //  console.log('Procesos Listos');
      this.listProcesos =<any> res;
     //  console.log(this.listProcesos);
      
    });
  }

  public proceso :any;

  //Listar de Usuarios
  lisUsuarios(proceso : any){
    this.viewDepartamento = false;
    this.viewUsuarios = true;
    this.viewPermisos = false;

    this.proceso = proceso;
   //  console.log(this.proceso.id_proceso);
    
    this.UsuariosService.getUnUsuairio(this.proceso.id_proceso).subscribe(res=>{
      this.listarUsuarios = <any> res;
     //  console.log(res);
      
    });
  }


  public usuario : any ;

  permisosParaForm:any={};
// Get Permisos
  getPermisos(usuario: any){
    this.usuario =usuario;
   //  console.log(this.usuario);
    

    this.viewDepartamento = false;
    this.viewUsuarios = false;
    this.viewPermisos = true;
    let body = {'id_usuario' : usuario.id_usuario};

    this.PermisosService.getPermisos(body).subscribe(res=>{
      this.permisosParaForm = <any> res;
     //  console.log(this.permisosParaForm);
     //  console.log(this.permisosParaForm?.length);
      if (this.permisosParaForm?.length === 0) {
        this.cargarPermisos();
        this.listPermisos(usuario);
      }
      this.migraValores();

    });

  }

  // Lista de Permisos
  listPermisos(usuario: any){
    this.PermisosService.getPermisos(usuario.id_usuario).subscribe(res=>{
      this.permisosParaForm = res;
     //  console.log(this.listarPermisos);
      this.migraValores();
       
    });
    
  }

  //Migrar Valores al Formulario
  migraValores(){
    
    this.formPermisos.setValue({
      calidad : this.permisosParaForm[0].calidad,
      calidadVer : this.permisosParaForm[0].calidadVer,
      calidadDescargar : this.permisosParaForm[0].calidadDescargar,
      calidadAdd : this.permisosParaForm[0].calidadAdd,
      calidadUpdate : this.permisosParaForm[0].calidadUpdate,
      calidadDelete : this.permisosParaForm[0].calidadDelete,

      operacion : this.permisosParaForm[0].operacion,
      operacionVer : this.permisosParaForm[0].operacionVer,
      operacionDescargar : this.permisosParaForm[0].operacionDescargar,
      operacionAdd : this.permisosParaForm[0].operacionAdd,
      operacionUpdate : this.permisosParaForm[0].operacionUpdate,
      operacionDelete : this.permisosParaForm[0].operacionDelete,

      registros : this.permisosParaForm[0].registros,
      registrosVer : this.permisosParaForm[0].registrosVer,
      registrosDescargar : this.permisosParaForm[0].registrosDescargar,
      registrosAdd : this.permisosParaForm[0].registrosAdd,
      registrosUpdate : this.permisosParaForm[0].registrosUpdate,
      registrosDelete : this.permisosParaForm[0].registrosDelete,

      marcoLegal : this.permisosParaForm[0].marcoLegal,
      norma : this.permisosParaForm[0].norma,
      normaVer : this.permisosParaForm[0].normaVer,
      normaDescargar : this.permisosParaForm[0].normaDescargar,
      normaAdd : this.permisosParaForm[0].normaAdd,
      normaUpdate : this.permisosParaForm[0].normaUpdate,
      normaDelete : this.permisosParaForm[0].normaDelete,

      marco : this.permisosParaForm[0].marco,
      marcoVer : this.permisosParaForm[0].marcoVer,
      marcoDescargar : this.permisosParaForm[0].marcoDescargar,
      marcoAdd : this.permisosParaForm[0].marcoAdd,
      marcoUpdate : this.permisosParaForm[0].marcoUpdate,
      marcoDelete : this.permisosParaForm[0].marcoDelete,

      diagramas : this.permisosParaForm[0].diagramas,
      foda : this.permisosParaForm[0].foda,
      toruga : this.permisosParaForm[0].toruga,

      amef : this.permisosParaForm[0].amef,
      amef_amef : this.permisosParaForm[0].amef_amef,
      efecto_fallo : this.permisosParaForm[0].efecto_fallo,

      acompanamiento : this.permisosParaForm[0].acompanamiento,
      solicitaAcom : this.permisosParaForm[0].solicitaAcom,
      revisaAcom : this.permisosParaForm[0].revisaAcom,

      controlDocumento : this.permisosParaForm[0].controlDocumento,
      asigna : this.permisosParaForm[0].asigna,
      asignaVer : this.permisosParaForm[0].asignaVer,
      asignaAdd : this.permisosParaForm[0].asignaAdd,

      revisa : this.permisosParaForm[0].revisa,
      revisaVer : this.permisosParaForm[0].revisaVer,
      revisaRevisar : this.permisosParaForm[0].revisaRevisar,
      aprueba : this.permisosParaForm[0].aprueba,
      apruebaVer : this.permisosParaForm[0].apruebaVer,
      apruebaAprueba : this.permisosParaForm[0].apruebaAprueba,
      proceso : this.permisosParaForm[0].proceso,
      procesoAdd : this.permisosParaForm[0].procesoAdd,
      procesoUpdate : this.permisosParaForm[0].procesoUpdate,
      procesoDelete : this.permisosParaForm[0].procesoDelete,
      usuarios : this.permisosParaForm[0].usuarios,
      usuario : this.permisosParaForm[0].usuario,
      usuarioAdd : this.permisosParaForm[0].usuarioAdd,
      usuarioUpdate : this.permisosParaForm[0].usuarioUpdate,
      usuarioDelete : this.permisosParaForm[0].usuarioDelete,
      permiso : this.permisosParaForm[0].permiso,
      permisoAdd : this.permisosParaForm[0].permisoAdd,
      historial : this.permisosParaForm[0].historial,
      configuracion : this.permisosParaForm[0].configuracion,
      capacitacion : this.permisosParaForm[0].capacitacion,
      capacitacionVer : this.permisosParaForm[0].capacitacionVer,
      capacitacionHistorial : this.permisosParaForm[0].capacitacionHistorial,
      capacitacionAdd : this.permisosParaForm[0].capacitacionAdd,
      capacitacionUpdate : this.permisosParaForm[0].capacitacionUpdate,
      capacitacionDelete : this.permisosParaForm[0].capacitacionDelete,
      reporte_acompanamiento : this.permisosParaForm[0].reporte_acompanamiento
            

    });
  }

  permisosDB : any =[];
  dataSend : any={};

   actualizaPermisos(){
   //  console.log(this.formPermisos.value);
   //  console.log(this.usuario);
    this.funcPermisoData();

     this.PermisosService.updatePermisos(this.usuario.id_usuario,this.dataSend).subscribe((res : any)=>{
      //  console.log('de enviaro los datos de permisos');
      //  console.log(this.dataSend);
      if (res.ok) {
        Swal.fire({
          title:'Correcto',
          text: `Se realizaron los cambion de forma correcta`,
          icon: 'success',
          confirmButtonText: 'confirmar'
          
        })

      } else {
        Swal.fire({
          title:'Error',
          text: `No se registro`,
          icon: 'error',
          confirmButtonText: 'confirmar'
        })
      }
      
      
     });

   }

   // Funcion para mandar permisos a la base de datos 
   funcPermisoData(){

    this.permisosDB.push(this.formPermisos.value.calidad);
    this.permisosDB.push(this.formPermisos.value.calidadVer);
    this.permisosDB.push(this.formPermisos.value.calidadDescargar);
    this.permisosDB.push(this.formPermisos.value.calidadAdd);
    this.permisosDB.push(this.formPermisos.value.calidadUpdate);
    this.permisosDB.push(this.formPermisos.value.calidadDelete);

    this.permisosDB.push(this.formPermisos.value.operacion);
    this.permisosDB.push(this.formPermisos.value.operacionVer);
    this.permisosDB.push(this.formPermisos.value.operacionDescargar);
    this.permisosDB.push(this.formPermisos.value.operacionAdd);
    this.permisosDB.push(this.formPermisos.value.operacionUpdate);
    this.permisosDB.push(this.formPermisos.value.operacionDelete);

    this.permisosDB.push(this.formPermisos.value.registros);
    this.permisosDB.push(this.formPermisos.value.registrosVer);
    this.permisosDB.push(this.formPermisos.value.registrosDescargar);
    this.permisosDB.push(this.formPermisos.value.registrosAdd);
    this.permisosDB.push(this.formPermisos.value.registrosUpdate);
    this.permisosDB.push(this.formPermisos.value.registrosDelete);

    this.permisosDB.push(this.formPermisos.value.marcoLegal);
    this.permisosDB.push(this.formPermisos.value.norma);
    this.permisosDB.push(this.formPermisos.value.normaVer);
    this.permisosDB.push(this.formPermisos.value.normaDescargar);
    this.permisosDB.push(this.formPermisos.value.normaAdd);
    this.permisosDB.push(this.formPermisos.value.normaUpdate);
    this.permisosDB.push(this.formPermisos.value.normaDelete);

    this.permisosDB.push(this.formPermisos.value.marco);
    this.permisosDB.push(this.formPermisos.value.marcoVer);
    this.permisosDB.push(this.formPermisos.value.marcoDescargar);
    this.permisosDB.push(this.formPermisos.value.marcoAdd);
    this.permisosDB.push(this.formPermisos.value.marcoUpdate);
    this.permisosDB.push(this.formPermisos.value.marcoDelete);

    this.permisosDB.push(this.formPermisos.value.diagramas);
    this.permisosDB.push(this.formPermisos.value.foda);
    this.permisosDB.push(this.formPermisos.value.toruga);

    this.permisosDB.push(this.formPermisos.value.amef);
    this.permisosDB.push(this.formPermisos.value.amef_amef);
    this.permisosDB.push(this.formPermisos.value.efecto_fallo);

    this.permisosDB.push(this.formPermisos.value.acompanamiento);
    this.permisosDB.push(this.formPermisos.value.solicitaAcom);
    this.permisosDB.push(this.formPermisos.value.revisaAcom);

    this.permisosDB.push(this.formPermisos.value.controlDocumento);
    this.permisosDB.push(this.formPermisos.value.asigna);
    this.permisosDB.push(this.formPermisos.value.asignaVer);
    this.permisosDB.push(this.formPermisos.value.asignaAdd);

    this.permisosDB.push(this.formPermisos.value.revisa);
    this.permisosDB.push(this.formPermisos.value.revisaVer);
    this.permisosDB.push(this.formPermisos.value.revisaRevisar);
    this.permisosDB.push(this.formPermisos.value.aprueba);
    this.permisosDB.push(this.formPermisos.value.apruebaVer);
    this.permisosDB.push(this.formPermisos.value.apruebaAprueba);
    this.permisosDB.push(this.formPermisos.value.proceso);
    this.permisosDB.push(this.formPermisos.value.procesoAdd);
    this.permisosDB.push(this.formPermisos.value.procesoUpdate);
    this.permisosDB.push(this.formPermisos.value.procesoDelete);
    this.permisosDB.push(this.formPermisos.value.usuarios);
    this.permisosDB.push(this.formPermisos.value.usuario);
    this.permisosDB.push(this.formPermisos.value.usuarioAdd);
    this.permisosDB.push(this.formPermisos.value.usuarioUpdate);
    this.permisosDB.push(this.formPermisos.value.usuarioDelete);
    this.permisosDB.push(this.formPermisos.value.permiso);
    this.permisosDB.push(this.formPermisos.value.permisoAdd);
    this.permisosDB.push(this.formPermisos.value.historial);
    this.permisosDB.push(this.formPermisos.value.configuracion);
    this.permisosDB.push(this.formPermisos.value.capacitacion);
    this.permisosDB.push(this.formPermisos.value.capacitacionVer);
    this.permisosDB.push(this.formPermisos.value.capacitacionHistorial);
    this.permisosDB.push(this.formPermisos.value.capacitacionAdd);
    this.permisosDB.push(this.formPermisos.value.capacitacionUpdate);
    this.permisosDB.push(this.formPermisos.value.capacitacionDelete);
    this.permisosDB.push(this.formPermisos.value.reporte_acompanamiento);

    

    
   //  console.log(this.permisosDB);

    for(let i =0; i<=this.permisosDB.length; i++){
      if(this.permisosDB[i]==true){
        this.permisosDB[i] =1;
      }
      if(this.permisosDB[i]==false){
        this.permisosDB[i] =0;
      }
    }

    this.dataSend.calidad=this.permisosDB[0];
    this.dataSend.calidadVer=this.permisosDB[1];
    this.dataSend.calidadDescargar=this.permisosDB[2];
    this.dataSend.calidadAdd=this.permisosDB[3];
    this.dataSend.calidadUpdate=this.permisosDB[4];
    this.dataSend.calidadDelete=this.permisosDB[5];

    this.dataSend.operacion=this.permisosDB[6];
    this.dataSend.operacionVer=this.permisosDB[7];
    this.dataSend.operacionDescargar=this.permisosDB[8];
    this.dataSend.operacionAdd=this.permisosDB[9];
    this.dataSend.operacionUpdate=this.permisosDB[10];
    this.dataSend.operacionDelete=this.permisosDB[11];

    this.dataSend.registros=this.permisosDB[12];
    this.dataSend.registrosVer=this.permisosDB[13];
    this.dataSend.registrosDescargar=this.permisosDB[14];
    this.dataSend.registrosAdd=this.permisosDB[15];
    this.dataSend.registrosUpdate=this.permisosDB[16];
    this.dataSend.registrosDelete=this.permisosDB[17];

    this.dataSend.marcoLegal=this.permisosDB[18];
    this.dataSend.norma=this.permisosDB[19];
    this.dataSend.normaVer=this.permisosDB[20];
    this.dataSend.normaDescargar=this.permisosDB[21];
    this.dataSend.normaAdd=this.permisosDB[22];
    this.dataSend.normaUpdate=this.permisosDB[23];
    this.dataSend.normaDelete=this.permisosDB[24];

    this.dataSend.marco=this.permisosDB[25];
    this.dataSend.marcoVer=this.permisosDB[26];
    this.dataSend.marcoDescargar=this.permisosDB[27];
    this.dataSend.marcoAdd=this.permisosDB[28];
    this.dataSend.marcoUpdate=this.permisosDB[29];
    this.dataSend.marcoDelete=this.permisosDB[30];

    this.dataSend.diagramas=this.permisosDB[31];
    this.dataSend.solicitaAcom=this.permisosDB[32];
    this.dataSend.revisaAcom=this.permisosDB[33];

    this.dataSend.amef=this.permisosDB[34];
    this.dataSend.amef_amef=this.permisosDB[35];
    this.dataSend.efecto_fallo=this.permisosDB[36];

    this.dataSend.acompanamiento=this.permisosDB[37];
    this.dataSend.foda=this.permisosDB[38];
    this.dataSend.toruga=this.permisosDB[39];

    this.dataSend.controlDocumento=this.permisosDB[40];
    this.dataSend.asigna=this.permisosDB[41];
    this.dataSend.asignaVer=this.permisosDB[42];
    this.dataSend.asignaAdd=this.permisosDB[43];
    this.dataSend.revisa=this.permisosDB[44];
    this.dataSend.revisaVer=this.permisosDB[45];
    this.dataSend.revisaRevisar=this.permisosDB[46];
    this.dataSend.aprueba=this.permisosDB[47];
    this.dataSend.apruebaVer=this.permisosDB[48];
    this.dataSend.apruebaAprueba=this.permisosDB[49];
    this.dataSend.proceso=this.permisosDB[50];
    this.dataSend.procesoAdd=this.permisosDB[51];
    this.dataSend.procesoUpdate=this.permisosDB[52];
    this.dataSend.procesoDelete=this.permisosDB[53];
    this.dataSend.usuarios=this.permisosDB[54];
    this.dataSend.usuario=this.permisosDB[55];
    this.dataSend.usuarioAdd=this.permisosDB[56];
    this.dataSend.usuarioUpdate=this.permisosDB[57];
    this.dataSend.usuarioDelete=this.permisosDB[58];
    this.dataSend.permiso=this.permisosDB[59];
    this.dataSend.permisoAdd=this.permisosDB[60];
    this.dataSend.historial=this.permisosDB[61];
    this.dataSend.configuracion=this.permisosDB[62];
    
    this.dataSend.capacitacion=this.permisosDB[63];
    this.dataSend.capacitacionVer=this.permisosDB[64];
    this.dataSend.capacitacionHistorial=this.permisosDB[65];
    this.dataSend.capacitacionAdd=this.permisosDB[66];
    this.dataSend.capacitacionUpdate=this.permisosDB[67];
    this.dataSend.capacitacionDelete=this.permisosDB[68];
    this.dataSend.reporte_acompanamiento=this.permisosDB[69];


    

    
    this.permisosDB =[];


   }



     //Carga de Permisos
  cargarPermisos(){
    if(this.usuario.id_cat_usuarios == 1){
      this.PermisosService.addPermisos(this.usuario.id_usuario, this.permisosGerencia).subscribe(res =>{
       //  console.log('Se agregaron Permisoso de Gerencia');
        
      });
    }

    if (this.usuario.id_cat_usuarios == 2) {
      this.PermisosService.addPermisos(this.usuario.id_usuario, this.permisosSupervisor).subscribe(res =>{
       //  console.log('Se agregaron Permisoso de super');
        
      });
    }

    if (this.usuario.id_cat_usuarios == 3) {
      this.PermisosService.addPermisos(this.usuario.id_usuario, this.permisosOperativo).subscribe(res =>{
       //  console.log('Se agregaron Permisoso de operador');
        
      });
    }



  }


  permisosGerencia : any ={
    "calidad": 1,
    "calidadVer": 1,
    "calidadDescargar": 1,
    "calidadAdd": 1,
    "calidadUpdate" : 1,
    "calidadDelete": 1,
    "operacion": 1,
    "operacionVer": 1,
    "operacionDescargar": 1,
    "operacionAdd": 1,
    "operacionUpdate" : 1,
    "operacionDelete" : 1,
    "registros": 1,
    "registrosVer": 1,
    "registrosDescargar": 1,
    "registrosAdd": 1,
    "registrosUpdate": 1,
    "registrosDelete": 1,
    "marcoLegal": 1,
    "norma": 1,
    "normaVer": 1,
    "normaDescargar": 1,
    "normaAdd": 1,
    "normaUpdate": 1,
    "normaDelete": 1,
    "marco": 1,
    "marcoVer": 1,
    "marcoDescargar": 1,
    "marcoAdd": 1,
    "marcoUpdate": 1,
    "marcoDelete": 1,
    "diagramas": 1,
    "foda": 1,
    "toruga": 1,
    "amef": 1,
    "amef_amef": 1,
    "efecto_fallo": 1,
    "acompanamiento": 1,
    "solicitaAcom": 1,
    "revisaAcom": 1,
    "controlDocumento": 1,
    "asigna": 1,
    "asignaVer": 1,
    "asignaAdd": 1,
    "revisa": 1,
    "revisaVer": 1,
    "revisaRevisar": 1,
    "aprueba": 1,
    "apruebaVer": 1,
    "apruebaAprueba": 1,
    "proceso": 1,
    "procesoAdd": 1,
    "procesoUpdate": 1,
    "procesoDelete": 1,
    "usuarios": 1,
    "usuario": 1,
    "usuarioAdd": 1,
    "usuarioUpdate": 1,
    "usuarioDelete": 0,
    "permiso": 1,
    "permisoAdd":1,
    "historial" : 1,
    "configuracion" : 0,
    "capacitacion" : 1,
    "capacitacionVer" : 1,
    "capacitacionHistorial" : 1,
    "capacitacionAdd" : 1,
    "capacitacionUpdate" : 1,
    "capacitacionDelete" : 1,
    "reporte_acompanamiento" : 1
}

//permisos
permisosSupervisor : any ={
  "calidad": 1,
  "calidadVer": 1,
  "calidadDescargar": 1,
  "calidadAdd": 0,
  "calidadUpdate" : 0,
  "calidadDelete": 0,
  "operacion": 1,
  "operacionVer": 1,
  "operacionDescargar": 1,
  "operacionAdd": 1,
  "operacionUpdate" : 1,
  "operacionDelete" : 1,
  "registros": 1,
  "registrosVer": 1,
  "registrosDescargar": 1,
  "registrosAdd": 1,
  "registrosUpdate": 1,
  "registrosDelete": 1,
  "marcoLegal": 1,
  "norma": 1,
  "normaVer": 1,
  "normaDescargar": 1,
  "normaAdd": 1,
  "normaUpdate": 1,
  "normaDelete": 1,
  "marco": 1,
  "marcoVer": 1,
  "marcoDescargar": 1,
  "marcoAdd": 1,
  "marcoUpdate": 1,
  "marcoDelete": 1,
  "diagramas": 1,
  "foda": 1,
  "toruga": 1,
  "amef": 1,
  "amef_amef": 1,
  "efecto_fallo": 1,
  "acompanamiento": 1,
  "solicitaAcom": 1,
  "revisaAcom": 1,
  "controlDocumento": 1,
  "asigna": 1,
  "asignaVer": 1,
  "asignaAdd": 1,
  "revisa": 0,
  "revisaVer": 0,
  "revisaRevisar": 0,
  "aprueba": 0,
  "apruebaVer": 0,
  "apruebaAprueba": 0,
  "proceso": 0,
  "procesoAdd": 0,
  "procesoUpdate": 0,
  "procesoDelete": 0,
  "usuarios": 0,
  "usuario": 0,
  "usuarioAdd": 0,
  "usuarioUpdate": 0,
  "usuarioDelete": 0,
  "permiso": 0,
  "permisoAdd":0,
  "historial" : 0,
  "configuracion" : 0,
  "capacitacion" : 1,
  "capacitacionVer" : 1,
  "capacitacionHistorial" : 0,
  "capacitacionAdd" : 0,
  "capacitacionUpdate" : 0,
  "capacitacionDelete" : 0,
  "reporte_acompanamiento" : 0
}

permisosOperativo : any ={
  "calidad": 1,
  "calidadVer": 1,
  "calidadDescargar": 0,
  "calidadAdd": 0,
  "calidadUpdate" : 0,
  "calidadDelete": 0,
  "operacion": 1,
  "operacionVer": 1,
  "operacionDescargar": 0,
  "operacionAdd": 0,
  "operacionUpdate" : 0,
  "operacionDelete" : 0,
  "registros": 1,
  "registrosVer": 1,
  "registrosDescargar": 0,
  "registrosAdd": 0,
  "registrosUpdate": 0,
  "registrosDelete": 0,
  "marcoLegal": 1,
  "norma": 1,
  "normaVer": 1,
  "normaDescargar": 0,
  "normaAdd": 0,
  "normaUpdate": 0,
  "normaDelete": 0,
  "marco": 1,
  "marcoVer": 1,
  "marcoDescargar": 0,
  "marcoAdd": 0,
  "marcoUpdate": 0,
  "marcoDelete": 0,
  "diagramas": 1,
  "foda": 1,
  "toruga": 1,
  "amef": 1,
  "amef_amef": 1,
  "efecto_fallo": 1,
  "acompanamiento": 0,
  "solicitaAcom": 0,
  "revisaAcom": 0,
  "controlDocumento": 0,
  "asigna": 0,
  "asignaVer": 0,
  "asignaAdd": 0,
  "revisa": 0,
  "revisaVer": 0,
  "revisaRevisar": 0,
  "aprueba": 0,
  "apruebaVer": 0,
  "apruebaAprueba": 0,
  "proceso": 0,
  "procesoAdd": 0,
  "procesoUpdate": 0,
  "procesoDelete": 0,
  "usuarios": 0,
  "usuario": 0,
  "usuarioAdd": 0,
  "usuarioUpdate": 0,
  "usuarioDelete": 0,
  "permiso": 0,
  "permisoAdd":0,
  "historial" : 0,
  "configuracion" : 0,
  "capacitacion" : 1,
  "capacitacionVer" : 1,
  "capacitacionHistorial" : 0,
  "capacitacionAdd" : 0,
  "capacitacionUpdate" : 0,
  "capacitacionDelete" : 0,
  "reporte_acompanamiento" : 0
}

usuarioLog : any;
permisosLog(){
 this.ViewPermisosService.getPermisos().subscribe((res : any)=>{
  this.usuarioLog = res[0];
 //  console.log(this.usuarioLog);
  
 });
}

    getPreceso(body : any){
      // this.ProcesosService.permiProceso(body).subscribe((res : any)=>{
      //   this.listProcesos = res;
      //  //  console.log(res);
      // });
      this.UsuariosService.getProcesosUsuario(body).subscribe((res:any)=>{
        this.listProcesos = res;
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
    this.permisosLog();
    
  }

}
