import { UsuariosService } from './../../../services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { ViewPermisosService } from 'src/app/services/view-permisos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProcesosService, Proceso} from 'src/app/services/procesos.service';
import { SolicitaAcomService } from 'src/app/services/solicita-acom.service';
import { RevisaAcomService } from 'src/app/services/revisa-acom.service';
import  decode  from 'jwt-decode';
import Swal from 'sweetalert2';
import { EmailService } from 'src/app/services/email.service';
import { environment } from './../../../../environments/environment';

const base = environment.api;




@Component({
  selector: 'app-solicita-acom',
  templateUrl: './solicita-acom.component.html',
  styleUrls: ['./solicita-acom.component.css']
})
export class SolicitaAcomComponent implements OnInit {

  public formUsuario: FormGroup;
  public formUsuario1: FormGroup;
  public archivos: any =[];

  constructor(private formBuilder: FormBuilder, private ProcesosService : ProcesosService, private SolicitaAcomService : SolicitaAcomService, 
              private RevisaAcomService : RevisaAcomService, private EmailService : EmailService, private UsuariosService : UsuariosService) { 

    this.formUsuario= this.formBuilder.group({
      solicita_nom: ['',[Validators.required]],
      proceso: ['',[Validators.required]],
      revisa_document_interno: ['',[Validators.required]],
      revisa_document_externo: [''],
      documento: ['',[Validators.required]],
    });

    
    this.formUsuario1= this.formBuilder.group({
      solicita_nom: ['',[Validators.required]],
      proceso: ['',[Validators.required]],
      revisa_document_interno: ['',[Validators.required]],
      revisa_document_externo: [''],
      documento: ['',[Validators.required]],
    });

  }

  public viewDepartamentos: boolean =true;
  public viewTabla: boolean=false;
  public viewPdf: boolean=false;
  public departamento: any;

  backDepartamentos(){
    this.viewDepartamentos=true;
    this.viewTabla=false;
    this.viewPdf=false;
  }

  backTable(){
    this.viewDepartamentos=false;
    this.viewTabla=true;
    this.viewPdf=false;
  }


  pdfSrc =`${base}/acompanamiento/`;
  downPDF =`${base}/acompanamiento/`;
  public documento : any;
  

  getPdf(solicitud: any){
    this.pdfSrc =`${base}/acompanamiento/`;

    this.documento = solicitud;
    this.pdfSrc =this.pdfSrc+solicitud.solicita_doc;
   //  console.log(solicitud.solicita_doc);
    this.viewDepartamentos=false;
    this.viewTabla=false;
    this.viewPdf=true;


  }


  listProcesos : any=[];
  p : number =1;
  
  //Get Procesos
  getProcesos(body : any){
    // this.ProcesosService.getProcesos().subscribe(res=>{
    //   this.listProcesos = <any> res;
    // });

    this.SolicitaAcomService.getProcesos_admin(body).subscribe((res: any) =>{
      this.listProcesos = res;
    });

  }

  proceso : any ={};
  solicitudes: any;
  usuario : any;
  rev_externa=false;

  revChange(){
    if (this.rev_externa==true) {
      this.rev_externa=false;
    }else{ this.rev_externa=true}
  }

    listProcesosRevisar: any =[];
  //Get Procesos para revision
  getProcesosRevision(){
    this.SolicitaAcomService.getProcesosRevision().subscribe((res:any)=>{
      this.listProcesosRevisar = res;
    });
  }
  proceso_revisa : any;

  capturaProceso(){

    this.rev_externa = false;
    
  let proceso =this.formUsuario.value.proceso;

  if (proceso>0) {
    this.proceso_revisa = proceso;
  }else{
    this.proceso_revisa =this.formUsuario1.value.proceso;
    console.log('proceso', this.proceso_revisa);
    
  }

  this.getRevisoresInternos();
  }

    revisores_internos : any;
  // Get Revisores Internos
  getRevisoresInternos(){
    let body ={'id_proceso' : this.proceso_revisa}
    this.SolicitaAcomService.getRevisoresInternos(body).subscribe((res : any)=>{
      this.revisores_internos=[];
      console.log(res);
      
      this.revisores_internos = res;
    });
    this.getRevisoresExternos();
  }

  revisores_externos : any;
  // Get Revisores Internos
  getRevisoresExternos(){
    this.SolicitaAcomService.getRevisoresExternos().subscribe((res : any)=>{
      this.revisores_externos = res;
    });
  }
  



  //Get Solicitudes
  getSolicitudes(departamento : any){
    this.proceso= departamento;
   //  console.log(this.proceso);
    const token: any = localStorage.getItem('token');
    this.usuario =decode(token);
   //  console.log(this.usuario);
    
    let body ={'id_usuario' : this.usuario.id_usuario, 'id_proceso' :this.proceso?.id_proceso };


    this.SolicitaAcomService.getSolicitudes(body).subscribe((res: any)=>{
      this.solicitudes= res;
     //  console.log(this.solicitudes);
    });
    this.backTable();
  }




  state =false;

    // Captura de file 
    capturarFile(event: any){
      const [file]= event.target.files;
    
    this.archivos={
      fileRaw: file,
      fileName: file.name
    };
   //  console.log('si entro'); 
  }

  sendDatos(){
   
    let revsior_externa = '0';
    let revsion_externa = '0';
    if(this.rev_externa == false){
      revsion_externa ='0';
      console.log('revsior_externa: ',revsior_externa);
      console.log('revsion_externa: ', revsion_externa);
    }else{
      revsior_externa =this.formUsuario.value.revisa_document_externo;
      console.log('revsior_externa: ',revsior_externa);
      console.log('revsion_externa: ', revsion_externa);
    }
    const fecha : any = new Date();

    let body_from={
  'myFile1' : this.archivos.fileRaw,
  'myFile2' : this.archivos.fileName,
  'id_usuario' : this.usuario.id_usuario,
  'id_revisor_interno' : this.formUsuario.value.revisa_document_interno,
  'id_revisor_externo' : revsior_externa,
  'id_proceso' : this.proceso.id_proceso,
  'solicita_nom' : this.formUsuario.value.solicita_nom,
  'revision_externa' : revsion_externa,
  'fecha' : fecha,

    };

    console.log(body_from);

    ////////////Correo//////////

    let autor : any ;
    // Autor 
    let au_body : any = {'id_usuario' : body_from.id_usuario};
    this.UsuariosService.get_un_usuario(au_body).subscribe((res:any)=>{
    let revisor : any ;
    autor = res[0];
    // Revisor 
    let revi : any = {'id_usuario' : body_from.id_revisor_interno};
    this.UsuariosService.get_un_usuario(revi).subscribe((res:any)=>{
      revisor = res[0];
      console.log(autor);
      console.log(revisor);
      let text = `El usuario que solicito el acompañamiento fue ${autor.nombre} ${autor.apellidos}`;
      let body_email ={'email' : revisor.email, 'nombre' :revisor.nombre ,
      'apellidos' : revisor.apellidos, 'mensaje1' : 'Se te ha asignado un documento a revisar ', 'mensaje2' : text };
      this.EmailService.sendData(body_email).subscribe((res:any)=>{});

    });

    // Revisor 

    });

  ////////////Correo//////////

    const body = new FormData();
    body.append('myFile', body_from.myFile1, body_from.myFile2);
    body.append('id_usuario',body_from.id_usuario);
    body.append('id_revisor_interno',body_from.id_revisor_interno);
    body.append('id_revisor_externo',body_from.id_revisor_externo);
    body.append('id_proceso',body_from.id_proceso);
    body.append('solicita_nom',body_from.solicita_nom);
    body.append('revision_externa', body_from.revision_externa);
    body.append('fecha', body_from.fecha);
    console.log(body);
    

    this.SolicitaAcomService.sendPost(body).subscribe(res=>{
       console.log(res);
       this.mensajeAdd(res);
      this.getSolicitudes(this.proceso);
      this.cleanForm();

    });

  }


  // OBSERVACION
  sendDatos1(){

    let revsior_externa = '0';
    let revsion_externa = '0';
    if(this.rev_externa == false){
      revsion_externa ='0';
      console.log('revsior_externa: ',revsior_externa);
      console.log('revsion_externa: ', revsion_externa);
    }else{
      revsior_externa =this.formUsuario1.value.revisa_document_externo;
      console.log('revsior_externa: ',revsior_externa);
      console.log('revsion_externa: ', revsion_externa);
    }
    const fecha : any = new Date();

    let body_from={
  'myFile1' : this.archivos.fileRaw,
  'myFile2' : this.archivos.fileName,
  'id_usuario' : this.usuario.id_usuario,
  'id_revisor_interno' : this.formUsuario1.value.revisa_document_interno,
  'id_revisor_externo' : revsior_externa,
  'id_proceso' : this.proceso.id_proceso,
  'solicita_nom' : this.formUsuario1.value.solicita_nom,
  'revision_externa' : revsion_externa,
  'fecha' : fecha,

    };

    console.log(body_from);


        ////////////Correo//////////

    let autor : any ;
    // Autor 
    let au_body : any = {'id_usuario' : body_from.id_usuario};
    this.UsuariosService.get_un_usuario(au_body).subscribe((res:any)=>{
    let revisor : any ;
    autor = res[0];
    // Revisor 
    let revi : any = {'id_usuario' : body_from.id_revisor_interno};
    this.UsuariosService.get_un_usuario(revi).subscribe((res:any)=>{
      revisor = res[0];
      console.log(autor);
      console.log(revisor);
      let text = `El usuario que solicito el acompañamiento fue ${autor.nombre} ${autor.apellidos}`;
      let body_email ={'email' : revisor.email, 'nombre' :revisor.nombre ,
      'apellidos' : revisor.apellidos, 'mensaje1' : 'Se te ha asignado un documento para revisar una corrección ', 'mensaje2' : text };
      this.EmailService.sendData(body_email).subscribe((res:any)=>{});

    });

    // Revisor 

    });

  ////////////Correo//////////
    

    const body = new FormData();
    body.append('myFile', body_from.myFile1, body_from.myFile2);
    body.append('id_usuario',body_from.id_usuario);
    body.append('id_revisor_interno',body_from.id_revisor_interno);
    body.append('id_revisor_externo',body_from.id_revisor_externo);
    body.append('id_proceso',body_from.id_proceso);
    body.append('solicita_nom',body_from.solicita_nom);
    body.append('revision_externa', body_from.revision_externa);
    body.append('fecha', body_from.fecha);
    console.log(body);
    

    this.SolicitaAcomService.sendPost(body).subscribe(res=>{
       console.log(res);
       this.mensajeUpdate(res);
      this.getSolicitudes(this.proceso);
      this.cleanForm();
    });

  }

  observacion : any;
  // Consultar Observacion 
  getObservacion(solicitud : any){

    this.RevisaAcomService.getObservacion(solicitud).subscribe((res : any)=>{
      this.observacion= res[0].observacion;
     //  console.log(this.observacion);
      
    });
  }
  
  add_solicitud =true;
  corrig_solicitud = false;
  solicitud : any;
  //getSolicitud
  getSolicitud(solicitud : any){
    this.solicitud= solicitud;
    this.cleanForm();
  }

  //Eliminar Documentos
  deleteDocumento(){
    this.RevisaAcomService.deleteDocumento(this.solicitud).subscribe((res : any)=>{
     //  console.log(res);
      
    });
  }

    //Eliminar obsevacion
    deleteObservacion(){
      this.RevisaAcomService.deleteObservacion(this.solicitud).subscribe((res : any)=>{
       //  console.log(res);
        
      });
    }

    //Eliminar Acompañamiento
    deleteAcompanamiento(){
      this.RevisaAcomService.deleteAcompanamiento(this.solicitud).subscribe((res : any) =>{
       //  console.log(res);
        
      });      
    }
    

  // Send correccion 
  sendSolicitud(){
    this.deleteDocumento();
    this.deleteObservacion();
    this.deleteAcompanamiento();
    this.sendDatos1();

  }

  cleanForm(){
    this.formUsuario.reset();
    this.formUsuario1.reset();
    this.rev_externa=false;
    this.revisores_internos=[];

  }

  getPreceso(body : any){
    // this.ProcesosService.getProcesosUsuario(body).subscribe((res : any)=>{
    //   this.listProcesos = res;
    //  //  console.log(res);
      
    // });

    this.SolicitaAcomService.getProcesos_usuarios(body).subscribe((res : any)=>{
      this.listProcesos= res;
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
           let body ={'id_usuario' : this.tipoProceso.id_usuario};
            this.getProcesos(body);
          } else{
            let body ={'id_usuario' : this.tipoProceso.id_usuario};
            this.getPreceso(body);
            
           //  console.log('Procesos 2');
            
          }
          /// Procesos ///
    this.getProcesosRevision();
  }

        ////// Mensajes //////
        mensajeAdd(res : any){
          if (res.ok) {
            Swal.fire({
              title:'Correcto',
              text: `Se envio solicitud`,
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
              text: `Se envio la corrección`,
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
