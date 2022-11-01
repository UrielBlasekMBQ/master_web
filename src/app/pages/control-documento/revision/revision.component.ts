import { Component, OnInit } from '@angular/core';
import { ProcesosService } from 'src/app/services/procesos.service';
import { RevicionDocumentService } from 'src/app/services/revicion-document.service';
import { ViewPermisosService } from 'src/app/services/view-permisos.service';
import  decode  from 'jwt-decode';
import Swal from 'sweetalert2';
import { environment } from './../../../../environments/environment';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EmailService } from 'src/app/services/email.service';


const base = environment.api;





@Component({
  selector: 'app-revision',
  templateUrl: './revision.component.html',
  styleUrls: ['./revision.component.css']
})
export class RevisionComponent implements OnInit {


  

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



  constructor( private ProcesosService : ProcesosService, private RevicionDocumentService :  RevicionDocumentService,
               private ViewPermisosService: ViewPermisosService, private UsuariosService: UsuariosService, private EmailService : EmailService) { }

  listProcesos?: any;
  //Get Procesos
  getProcesos(){
    this.ProcesosService.getProcesos().subscribe(res=>{
      this.listProcesos = <any> res;

     //  console.log(this.listProcesos);
      
    }
    );
     
  }


  proceso: any;
  usuario : any;
  p :number =1;

  listDocumentos?: any;
  /// Listar Documentos tyrtyrty 
  getDocumentos(departamento : any){
    this.proceso=departamento;
    const token: any = localStorage.getItem('token');
    this.usuario =decode(token);
   //  console.log(this.usuario);

     let body ={ 'id_usuario' : this.usuario.id_usuario,'id_proceso': this.proceso.id_proceso };
     console.log(body);
     

    this.RevicionDocumentService.getDocumentos(body).subscribe(res=>{
      this.listDocumentos= <any> res;
     //  console.log(this.listDocumentos);
      
    });
    this.backRevisiones();
  }

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
  
  
  listDoc? : any;

  updateRecisarAprobado(documento : any){
    this.listDoc = {"revisado" : 1};
    this.RevicionDocumentService.updateDocumento(documento.id_documentAsig ,this.listDoc ).subscribe(res=>{
     //  console.log('Se actualizo');
     //  console.log(res);
      let autor : any;
      let revisa : any;
      let body_autor ={'id_usuario' : documento.id_usuario};
      this.UsuariosService.get_un_usuario(body_autor).subscribe((res:any)=>{
        autor = res[0];
        let body_revisa ={'id_usuario' : documento.revisa_document};
        this.UsuariosService.get_un_usuario(body_revisa).subscribe((res:any)=>{
          revisa = res[0];
          //////////// Email para revisor 
          let text1 = `Se ha aprobado tu revisión que solicitaste en el modulo de control de documentos`;
          let texto2 =`El usuario aprobado tu revisión es ${revisa.nombre} ${revisa.apellidos}`
          let body_email1 ={'email' : autor.email, 'nombre' :autor.nombre ,
          'apellidos' : autor.apellidos, 'mensaje1' : text1, 'mensaje2' : texto2 };
          this.EmailService.sendData(body_email1).subscribe((res:any)=>{});
          //////////// Email para revisor  
          
        });

      });


      this.mensajeUpdate(res);
      this.getDocumentos(this.proceso);
    });
  }

  updateRecisarReprobado(documento : any){
    this.listDoc = {"revisado" : 2};
    this.RevicionDocumentService.updateDocumento(documento.id_documentAsig ,this.listDoc ).subscribe(res=>{
      let autor : any;
      let revisa : any;
      let body_autor ={'id_usuario' : documento.id_usuario};
      this.UsuariosService.get_un_usuario(body_autor).subscribe((res:any)=>{
        autor = res[0];
        let body_revisa ={'id_usuario' : documento.revisa_document};
        this.UsuariosService.get_un_usuario(body_revisa).subscribe((res:any)=>{
          revisa = res[0];
          //////////// Email para revisor 
          let text1 = `Se ha rechazado tu revisión que solicitaste en el modulo de control de documentos`;
          let texto2 =`El usuario rechazado la revisión es ${revisa.nombre} ${revisa.apellidos}`
          let body_email1 ={'email' : autor.email, 'nombre' :autor.nombre ,
          'apellidos' : autor.apellidos, 'mensaje1' : text1, 'mensaje2' : texto2 };
          this.EmailService.sendData(body_email1).subscribe((res:any)=>{});
          //////////// Email para revisor  
          
        });

      });
     //  console.log('Se actualizo');
     //  console.log(res);
     this.mensajeUpdate(res);
      this.getDocumentos(this.proceso);
    });
  }



  usuarioLog ={
    revisaVer : true,
    revisaRevisar : true,
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
    if(this.tipoProceso.tipoUsuario == 1){
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
            text: `Se envio revisión correctamente`,
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
