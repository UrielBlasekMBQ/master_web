import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProcesosService, Proceso} from 'src/app/services/procesos.service';
import { environment } from './../../../../environments/environment';
import Swal from 'sweetalert2';
import  decode  from 'jwt-decode';
import { RevisaAcomService } from 'src/app/services/revisa-acom.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EmailService } from 'src/app/services/email.service';
import { ViewPermisosService } from 'src/app/services/view-permisos.service';

const base = environment.api;


@Component({
  selector: 'app-revisa-acom',
  templateUrl: './revisa-acom.component.html',
  styleUrls: ['./revisa-acom.component.css']
})
export class RevisaAcomComponent implements OnInit {

  public formObservacion: FormGroup; 
  public formObservacion1: FormGroup; 
  public formGrafica: FormGroup; 

  constructor(private formBuilder: FormBuilder, private ProcesosService : ProcesosService, private EmailService : EmailService,
              private RevisaAcomService: RevisaAcomService, private UsuariosService : UsuariosService, private ViewPermisosService : ViewPermisosService
              ) { 
    this.formObservacion= this.formBuilder.group({
      observacion: ['',[Validators.required]]
    });

    this.formObservacion1= this.formBuilder.group({
      observacion: ['',[Validators.required]]
    });

    this.formGrafica= this.formBuilder.group({
      proceso: ['',[Validators.required]]
    });

  }
 

  public viewDepartamentos: boolean =true;
  public viewTabla: boolean=false;
  public viewPdf: boolean=false;
  public viewRportes : boolean = false;
  public departamento: any;

  backDepartamentos(){
    this.viewDepartamentos=true;
    this.viewRportes = false;
    this.viewTabla=false;
    this.viewPdf=false;

    const token: any = localStorage.getItem('token');
    this.tipoProceso =decode(token);
   //  console.log(this.tipoProceso);
    if(this.tipoProceso.tipoUsuario == 1){
     //  console.log('procesos 1');
      
      this.getProcesos();
    } else{
      let body ={'id_proceso' : this.tipoProceso.departamento};
      this.getProcesos();
      
     //  console.log('Procesos 2');
      
    }
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
  p :number =1;
  
  //Get Procesos
  getProcesos(){

    let body ={'id_revisor' : this.tipoProceso.id_usuario };
    this.RevisaAcomService.getcontador(body).subscribe((res : any)=>{
      this.listProcesos = res;
    });
    
  }

  proceso : any ={};
  solicitudes: any;
 
  usuario : any;

  //Get Solicitudes
  getSolicitudes(departamento : any){
    
    this.proceso= departamento;
   //  console.log(this.proceso);
    const token: any = localStorage.getItem('token');
    this.usuario =decode(token);
   //  console.log(this.usuario);

    let body ={'id_usuario' : this.usuario.id_usuario, 'id_proceso' : this.proceso?.id_proceso};

    this.RevisaAcomService.getSolicitudes(body).subscribe((res: any)=>{
      this.solicitudes= res;
     //  console.log(this.solicitudes);
    });
    this.backTable();
  }

  



  solicitud: any;
  // Solicitud Aprobada 
  updateRevisarAprobadoInterno(solicitud :any){
    this.solicitud = solicitud;
     console.log(this.solicitud);

    ////////////Correo//////////


     ////////////Correo//////////
     const fecha : any = new Date();
         let bodyEstatus={
          'id_solicitud' : this.solicitud.id_solicitud ,
          'revision_interna' : 2,
          'revision_externa' : 1,
          'fecha' : fecha

        };
    this.RevisaAcomService.updateSolicitud(bodyEstatus).forEach((res: any)=>{
      
      if(solicitud.id_revisor_externo ==0){
        bodyEstatus={
          'id_solicitud' : this.solicitud.id_solicitud ,
          'revision_interna' : 2,
          'revision_externa' : 0,
          'fecha' : fecha

        };
        this.RevisaAcomService.updateSolicitud(bodyEstatus).forEach((res: any)=>{});
        console.log('No se manda correlo');
        this.sendEmailAprobacionInterna();

     
    }else{
     console.log('si se manda correo');
      this.sendEmailAprobacionInterna();
     let autor : any ;
     // Autor 
     let au_body : any = {'id_usuario' : solicitud.id_usuario};
     this.UsuariosService.get_un_usuario(au_body).subscribe((res:any)=>{
     let revisor : any ;
     autor = res[0];
     // Revisor interno
     let revi : any = {'id_usuario' : solicitud.id_revisor_externo};
     this.UsuariosService.get_un_usuario(revi).subscribe((res:any)=>{
       revisor = res[0];
       console.log(autor);
       console.log(revisor);

  
    //////////// Email para revisor externo
    let text = `Se te ha asignado un documento para revisar, en este momento ya puede dar seguimiento`;
    let body_email ={'email' : revisor.email, 'nombre' :revisor.nombre ,
    'apellidos' : revisor.apellidos, 'mensaje1' : '', 'mensaje2' : text };
    this.EmailService.sendData(body_email).subscribe((res:any)=>{});
    //////////// Email para revisor externo  
     });
  
     // Revisor 
  
     });
     
 
    }

      this.getSolicitudes(this.proceso);  
     //  console.log('Aceptado');
     this.mensajeUpdate(res);
      
    });
  }

  //Email de aprobacion interna ////
  sendEmailAprobacionInterna(){
    let solicitud = this.solicitud;
    let rev_interno : any;
    let letbody_rev ={'id_usuario':solicitud.id_revisor_interno}
    this.UsuariosService.get_un_usuario(letbody_rev).subscribe((res : any)=>{
      rev_interno = res[0];

    let autor : any;
    let autor_body ={'id_usuario':solicitud.id_usuario};
    this.UsuariosService.get_un_usuario(autor_body).subscribe((res1:any)=>{
      autor = res1[0];

    //////////// Email para revisor externo
    let text = `Ha sido aprobada tu revisión interna por ${rev_interno.nombre} ${rev_interno.apellidos}`;
    let body_email ={'email' : autor.email, 'nombre' :autor.nombre ,
    'apellidos' : autor.apellidos, 'mensaje1' : '', 'mensaje2' : text };
    this.EmailService.sendData(body_email).subscribe((res:any)=>{});
    //////////// Email para revisor externo  

    });
    });

  }
  //Email de aprobacion interna ////

    // Solicitud Aprobada eXTERNA
    updateRevisarAprobadoExterno(solicitud :any){
      this.solicitud = solicitud;
     //  console.log(this.solicitud);
      const fecha : any = new Date();
           let bodyEstatus={
        'id_solicitud' : this.solicitud.id_solicitud ,
        'revision_externa' : 2,
        'fecha' : fecha
      };
      this.RevisaAcomService.updateSolicitudExterno(bodyEstatus).forEach((res: any)=>{
        
        if(solicitud.id_revisor_externo ==0){console.log('No se manda correlo');
      }else{
       console.log('si se manda correo');
 
 
     let autor : any ;
     // Autor 
     let au_body : any = {'id_usuario' : solicitud.id_usuario};
     this.UsuariosService.get_un_usuario(au_body).subscribe((res:any)=>{
     let revisor : any ;
     autor = res[0];
     // Revisor 
     let revi : any = {'id_usuario' : solicitud.id_revisor_externo};
     this.UsuariosService.get_un_usuario(revi).subscribe((res:any)=>{
       revisor = res[0];
       console.log(autor);
       console.log(revisor);
       let text = `Fue aprobado tu acompañamiento externo por ${revisor.nombre} ${revisor.apellidos}`;
       let body_email ={'email' : autor.email, 'nombre' :autor.nombre ,
       'apellidos' : autor.apellidos, 'mensaje1' : '', 'mensaje2' : text };
       this.EmailService.sendData(body_email).subscribe((res:any)=>{});
 
     });
 
     // Revisor 
 
     });
 
   
      }
        this.getSolicitudes(this.proceso);  
       //  console.log('Aceptado');
       this.mensajeUpdate(res);
        
      });
    }


  //Solicitud Rechazada
  updateRevisarReprobado(solicitud : any){
    const fecha : any = new Date();
    this.solicitud = solicitud;
     let bodyEstatus={
      'id_solicitud' : this.solicitud.id_solicitud ,
      'revision_interna' : 3,      
      'fecha' : fecha
    };
    this.RevisaAcomService.updateSolicitud(bodyEstatus).forEach((res: any)=>{
      
        if(solicitud.id_revisor_externo ==0){console.log('No se manda correlo');
      }else{
       console.log('si se manda correo');
 
 
     let autor : any ;
     // Autor 
     let au_body : any = {'id_usuario' : solicitud.id_usuario};
     this.UsuariosService.get_un_usuario(au_body).subscribe((res:any)=>{
     let revisor : any ;
     autor = res[0];
     // Revisor 
     let revi : any = {'id_usuario' : solicitud.id_revisor_interno};
     this.UsuariosService.get_un_usuario(revi).subscribe((res:any)=>{
       revisor = res[0];
       console.log(autor);
       console.log(revisor);
       let text = `Fue rechazado tu acompañamiento interno por ${revisor.nombre} ${revisor.apellidos}`;
       let body_email ={'email' : autor.email, 'nombre' :autor.nombre ,
       'apellidos' : autor.apellidos, 'mensaje1' : '', 'mensaje2' : text };
       this.EmailService.sendData(body_email).subscribe((res:any)=>{});
 
     });
 
     // Revisor 
 
     });
 
   
      }
    this.getSolicitudes(this.proceso);
    this.mensajeUpdate(res);
   //  console.log('rechazado');
    
  });
  }
  
  //Solicitud Rechazada
  updateRevisarReprobado_externo(solicitud : any){
    this.solicitud = solicitud;
    const fecha : any = new Date();
      let bodyEstatus={
      'id_solicitud' : this.solicitud.id_solicitud ,
      'revision_externa' : 3,
      'fecha' : fecha
    };
    this.RevisaAcomService.updateSolicitudExterno(bodyEstatus).forEach((res: any)=>{
       if(solicitud.id_revisor_externo ==0){console.log('No se manda correlo');
      }else{
       console.log('si se manda correo');
 
     let autor : any ;
     // Autor 
     let au_body : any = {'id_usuario' : solicitud.id_usuario};
     this.UsuariosService.get_un_usuario(au_body).subscribe((res:any)=>{
     let revisor : any ;
     autor = res[0];
     // Revisor 
     let revi : any = {'id_usuario' : solicitud.id_revisor_externo};
     this.UsuariosService.get_un_usuario(revi).subscribe((res:any)=>{
       revisor = res[0];
       console.log(autor);
       console.log(revisor);
       let text = `Fue rechazado tu acompañamiento externo por ${revisor.nombre} ${revisor.apellidos}`;
       let body_email ={'email' : autor.email, 'nombre' :autor.nombre ,
       'apellidos' : autor.apellidos, 'mensaje1' : '', 'mensaje2' : text };
       this.EmailService.sendData(body_email).subscribe((res:any)=>{});
 
     });
 
     // Revisor 
 
     });
 
   
      }
    this.getSolicitudes(this.proceso);
    this.mensajeUpdate(res);
    //  console.log('rechazado');
    
  });
  }

  //Solicitud con Observaciones
  updateRevisarObservacion(solicitud : any){
    this.solicitud = solicitud;
    const fecha : any = new Date();
    let bodyEstatus={
      'id_solicitud' : this.solicitud.id_solicitud ,
      'revision_interna' : 4,
      'fecha' :  fecha
    };
    this.RevisaAcomService.updateSolicitud(bodyEstatus).forEach((res: any)=>{
      // Revisor 
       if(solicitud.id_revisor_externo ==0){console.log('No se manda correlo');
      }else{
       console.log('si se manda correo');
 
     let autor : any ;
     // Autor 
     let au_body : any = {'id_usuario' : solicitud.id_usuario};
     this.UsuariosService.get_un_usuario(au_body).subscribe((res:any)=>{
     let revisor : any ;
     autor = res[0];
     // Revisor 
     let revi : any = {'id_usuario' : solicitud.id_revisor_interno};
     this.UsuariosService.get_un_usuario(revi).subscribe((res:any)=>{
       revisor = res[0];
       console.log(autor);
       console.log(revisor);
       let text = `Tu acompañamiento interno fue enviado para corregir, fue revisado por ${revisor.nombre} ${revisor.apellidos}`;
       let body_email ={'email' : autor.email, 'nombre' :autor.nombre ,
       'apellidos' : autor.apellidos, 'mensaje1' : '', 'mensaje2' : text };
       this.EmailService.sendData(body_email).subscribe((res:any)=>{});
 
     });
 
     });
   
      }
    // Revisor 
    this.getSolicitudes(this.proceso);
   //  console.log('En observaciones');
   this.mensajeUpdate(res);
  });
  }

  //Solicitud con Observaciones
  updateRevisarObservacionExterna(solicitud : any){
    this.solicitud = solicitud;
    const fecha : any = new Date();
    let bodyEstatus={
      'id_solicitud' : this.solicitud.id_solicitud ,
      'revision_externa' : 4,
      'fecha' : fecha
    };
    this.RevisaAcomService.updateSolicitudExterno(bodyEstatus).forEach((res: any)=>{
         // Revisor 
            if(solicitud.id_revisor_externo ==0){console.log('No se manda correlo');
          }else{
           console.log('si se manda correo');
     
         let autor : any ;
         // Autor 
         let au_body : any = {'id_usuario' : solicitud.id_usuario};
         this.UsuariosService.get_un_usuario(au_body).subscribe((res:any)=>{
         let revisor : any ;
         autor = res[0];
         // Revisor 
         let revi : any = {'id_usuario' : solicitud.id_revisor_externo};
         this.UsuariosService.get_un_usuario(revi).subscribe((res:any)=>{
           revisor = res[0];
           console.log(autor);
           console.log(revisor);
           let text = `Tu acompañamiento externo fue enviado para corregir, fue revisado por ${revisor.nombre} ${revisor.apellidos}`;
           let body_email ={'email' : autor.email, 'nombre' :autor.nombre ,
           'apellidos' : autor.apellidos, 'mensaje1' : '', 'mensaje2' : text };
           this.EmailService.sendData(body_email).subscribe((res:any)=>{});
     
         });
     
         });
       
          }
        // Revisor 
    this.getSolicitudes(this.proceso);
    //  console.log('En observaciones');
    this.mensajeUpdate(res);
  });
  }

  //Extraer solicitud
  extraerSolicitud(solicitud : any){
    this.solicitud = solicitud;
     console.log(this.solicitud);
    
  }

  //Agegar Observacion interna
  addObservacion_interna(){
    let body ={
      'id_solicitud' : this.solicitud.id_solicitud,'observacion' : this.formObservacion.value.observacion
    };
    
    this.RevisaAcomService.sendObservacion(body).subscribe((res:any)=>{
     //  console.log(res);
      this.updateRevisarObservacion(this.solicitud);
      this.mensajeAdd(res);
      
    });
    
  }

  //Agegar Observacion interna
  addObservacion_externa(){
    let body ={
      'id_solicitud' : this.solicitud.id_solicitud,'observacion' : this.formObservacion.value.observacion
    };
    
    this.RevisaAcomService.sendObservacion(body).subscribe((res:any)=>{
      //  console.log(res);
      this.updateRevisarObservacionExterna(this.solicitud);
      this.mensajeAdd(res);
      
    });
    
  }
  


  //Agegar Observacion Rechazado
  addObservacionRechazo(){
    let body ={
      'id_solicitud' : this.solicitud.id_solicitud,'observacion' : this.formObservacion1.value.observacion
    };
    
    this.RevisaAcomService.sendObservacion(body).subscribe((res:any)=>{
      //  console.log(res);
      this.updateRevisarReprobado(this.solicitud);
      this.mensajeAdd(res);
      
    });
  }

  //Agegar Observacion Rechazado
  addObservacionRechazo_externo(){
    let body ={
      'id_solicitud' : this.solicitud.id_solicitud,'observacion' : this.formObservacion1.value.observacion
    };
    
    this.RevisaAcomService.sendObservacion(body).subscribe((res:any)=>{
      //  console.log(res);
      this.updateRevisarReprobado_externo(this.solicitud);
      this.mensajeAdd(res);
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

    //Delete 
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

    //Delete Registros 
      // Send correccion 
  sendSolicitud(){
    this.deleteDocumento();
    this.deleteObservacion();
    this.deleteAcompanamiento();
    this.getSolicitudes(this.proceso);

  }

  getPreceso(body : any){
    this.ProcesosService.permiProceso(body).subscribe((res : any)=>{
      this.listProcesos = res;
     //  console.log(res);
      
    });
   };
  
  tipoProceso : any;

  reporte : any ;
  reporteGeneral : any =[];
  displayedColumns: string[] = ['index','departamento','reg','revinter0','revinter1','revinter2','revinter3','revexter0','revexter1','revexter2','revexter3'];
  reporteColums : string[] =['index','nom_autor','nom_interno','nom_externo','nom_proceso','solicita_nom','revision_interna','revision_externa','solicita_doc','fecha'];
  dataSource : any;

  getReporteGeneral (){
    this.RevisaAcomService.getReporte().subscribe((res:any)=>{
      this.reporte = res; 
    });

    this.RevisaAcomService.getReporteGeneral().subscribe((res:any)=>{
      this.reporteGeneral = res; 
      console.log(this.reporteGeneral);
      
       this.dataSource= this.reporteGeneral;
       this.generaDataGrafi();
       
       
    });



    this.viewRportes = true;
    this.viewDepartamentos = false;

    
  }

  usuarioLog : any=[];
  permisoUsuario(){
    this.ViewPermisosService.getPermisos().subscribe((res :any)=>{
      this.usuarioLog = res[0];
       //console.log(this.usuarioLog);
      
    });
  }




  ngOnInit(): void {
    
    this.permisoUsuario();
          /// Procesos ///
          const token: any = localStorage.getItem('token');
          this.tipoProceso =decode(token);
         //  console.log(this.tipoProceso);
          if(this.tipoProceso.tipoUsuario == 1){
           //  console.log('procesos 1');
            
            this.getProcesos();
          } else{
            let body ={'id_proceso' : this.tipoProceso.departamento};
            this.getProcesos();
            
           //  console.log('Procesos 2');
            
          }
          /// Procesos ///
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
            text: `Se realizo la revisión correctamente`,
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
      
      view: any = [900, 400];

      view1: any = [900, 1300];
    
      // options
  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showDataLabel : boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Proceso';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Registros';


    
      colorScheme : any = {
        domain: ['#A6B7BF', '#ffb22b', '#06d79c', '#ef5350', '#745af2', '#ffb22b', '#06d79c', '#ef5350', '#745af2']
      };
    
      // constructor() {
      //   Object.assign(this, { single });
      // }
    
      onSelect(data : any): void {
        console.log('Item clicked', JSON.parse(JSON.stringify(data)));
      }
    
      onActivate(data: any): void {
        console.log('Activate', JSON.parse(JSON.stringify(data)));
      }
    
      onDeactivate(data: any): void {
        console.log('Deactivate', JSON.parse(JSON.stringify(data)));
      }


      multi : any = [];
      grafica = false;

      grafica1 = false;
      multi1 : any = [];
      
      data1 : any ={};

      verGraficas =false;

      mostrarGraficasProcesos(){

        this.grafica1 = false;

        if (this.verGraficas) {
          this.verGraficas = false
        }else if(this.verGraficas== false){
          this.verGraficas = true
        }

      }

      generaDataProcesoGrafica (){
        this.verGraficas = false;
        this.multi1 =[];
        this.grafica1 = false;

        for (let i = 0; i < this.reporteGeneral.length; i++) {
          if (this.reporteGeneral[i].id_proceso == this.formGrafica.value.proceso) {
            this.data1 ={
              "name" : this.reporteGeneral[i].departamento , 
                "series" : [
                  {
                    "name" : "Total registros",
                    "value": this.reporteGeneral[i].reg
                  },
                  {
                    "name" : "Revisor. I.(Proceso)",
                    "value": this.reporteGeneral[i].revinter0
                  },
                  {
                    "name" : "Revisor I.(Revisado)",
                    "value": this.reporteGeneral[i].revinter1
                  },
                  {
                    "name" : "Revisor I.(Rechazado)",
                    "value": this.reporteGeneral[i].revinter2
                  },
                  {
                    "name" : "Revisor I.(Observación)",
                    "value": this.reporteGeneral[i].revinter3
                  },
                  {
                    "name" : "Revisor E.(Proceso)",
                    "value": this.reporteGeneral[i].revexter0
                  },
                  {
                    "name" : "Revisor E.(Revisado)",
                    "value": this.reporteGeneral[i].revexter1
                  },
                  {
                    "name" : "Revisor E.(Rechazado)",
                    "value": this.reporteGeneral[i].revexter2
                  },
                  {
                    "name" : "Revisor E.(Observación)",
                    "value": this.reporteGeneral[i].revexter3
                  }
                ]
  
            };
            this.multi1.push(this.data1);
          }

    
        }
        this.grafica1 = true;
        
      }

      generaDataGrafi(){
        this.grafica = true;
        console.log(2);
        
        for (let i = 0; i < this.reporteGeneral.length; i++) {
          
          const  data12 ={
            "name" : this.reporteGeneral[i].departamento , 
              "series" : [
                {
                  "name" : "Total registros",
                  "value": this.reporteGeneral[i].reg
                },
                {
                  "name" : "Revisor. I.(Proceso)",
                  "value": this.reporteGeneral[i].revinter0
                },
                {
                  "name" : "Revisor I.(Revisado)",
                  "value": this.reporteGeneral[i].revinter1
                },
                {
                  "name" : "Revisor I.(Rechazado)",
                  "value": this.reporteGeneral[i].revinter2
                },
                {
                  "name" : "Revisor I.(Observación)",
                  "value": this.reporteGeneral[i].revinter3
                },
                {
                  "name" : "Revisor E.(Proceso)",
                  "value": this.reporteGeneral[i].revexter0
                },
                {
                  "name" : "Revisor E.(Revisado)",
                  "value": this.reporteGeneral[i].revexter1
                },
                {
                  "name" : "Revisor E.(Rechazado)",
                  "value": this.reporteGeneral[i].revexter2
                },
                {
                  "name" : "Revisor E.(Observación)",
                  "value": this.reporteGeneral[i].revexter3
                }
              ]

          };
          this.multi.push(data12);
      
          
        }
        
      }



}
