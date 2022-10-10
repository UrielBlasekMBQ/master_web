import { Component, OnInit } from '@angular/core';
import { ApruebaDocumentService } from 'src/app/services/aprueba-document.service';
import { ProcesosService } from 'src/app/services/procesos.service';
import { RevicionDocumentService } from 'src/app/services/revicion-document.service';
import { ViewPermisosService } from 'src/app/services/view-permisos.service';
import  decode  from 'jwt-decode';
import Swal from 'sweetalert2';
import { environment } from './../../../../environments/environment';
const base = environment.api;




@Component({
  selector: 'app-aprobacion',
  templateUrl: './aprobacion.component.html',
  styleUrls: ['./aprobacion.component.css']
})
export class AprobacionComponent implements OnInit {
  

  public viewDepartamentos: boolean = true;
  public viewRevisiones: boolean = false;
  public viewPdf: boolean = false;


  backDepartamentos(){
    this.viewDepartamentos=true;
    this.viewRevisiones=false;
    this.viewPdf=false;
  }
  backRevisiones(){
    this.viewDepartamentos=false;
    this.viewRevisiones=true;
    this.viewPdf=false;
  }


 public departamento: any;


  public documento :any;

    // pdfSrc ='http://3.19.235.131:3000/docAsigna/';
    
    pdfSrc =`${base}/docAsigna/`;

  getPdf(documento : any){
    this.pdfSrc =`${base}/docAsigna/`;
    this.documento = documento;
    this.pdfSrc =this.pdfSrc+documento.documento;

    this.viewDepartamentos=false;
    this.viewRevisiones=false;
    this.viewPdf=true;
  }

  constructor( private ProcesosService : ProcesosService, private RevicionDocumentService : RevicionDocumentService,
     private ApruebaDocumentService : ApruebaDocumentService, private ViewPermisosService:ViewPermisosService) { }

  listProcesos?: any;
  //Get Procesos
  getProcesos(){
    this.ProcesosService.getProcesos().subscribe(res=>{
      this.listProcesos = <any> res;

     //  console.log(this.listProcesos);
      
    });
    
  }



  p: number=1;
  body ={ 'id_usuario' : 0,'id_proceso': 0 };
  proceso: any;
  usuario : any;

  listDocumentos?: any;
  /// Listar Documentos 
  getDocumentos(departamento : any){
    this.proceso=departamento;
    const token: any = localStorage.getItem('token');
    this.usuario =decode(token);
   //  console.log(this.usuario);

    this.body.id_usuario=this.usuario.id_usuario;
    this.body.id_proceso=this.proceso?.id_proceso;
    this.ApruebaDocumentService.getDocumentos(this.body).subscribe(res=>{
      this.listDocumentos= <any> res;
     //  console.log(this.listDocumentos);
      
    });
    this.backRevisiones();
  }

  listDoc? : any;

  updateRecisarAprobado(documento : any){
    this.listDoc = {"aprobado" : 1};
    this.ApruebaDocumentService.updateDocumento(documento.id_documentAsig ,this.listDoc ).subscribe(res=>{
     //  console.log('Se actualizo');
     //  console.log(res);
     this.mensajeUpdate(res);
      this.getDocumentos(this.proceso);
    });
  }

  updateRecisarReprobado(documento : any){
    this.listDoc = {"aprobado" : 2};
    this.ApruebaDocumentService.updateDocumento(documento.id_documentAsig ,this.listDoc ).subscribe(res=>{
     //  console.log('Se actualizo');
     //  console.log(res);
      this.mensajeUpdate(res);
      this.getDocumentos(this.proceso);
    });
  }

  
  usuarioLog ={
    apruebaVer : true,
    apruebaAprueba : true,
  };


  permisosUusuairo(){
    this.ViewPermisosService.getPermisos().subscribe((res : any)=>{
      this.usuarioLog= res[0];
    });
  }
  
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
        if(this.tipoProceso.tipoUsuario == 0){
         //  console.log('procesos 1');
          
          this.getProcesos();
        } else{
          let body ={'id_usuario' : this.tipoProceso.id_usuario};
          //this.getPreceso(body);
          this.getProcesos();
          
         //  console.log('Procesos 2');
          
        }
        /// Procesos ///
    this.permisosUusuairo();
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
              text: `Se envio aprobación correctamente`,
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
              text: `Se  correctamente`,
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
