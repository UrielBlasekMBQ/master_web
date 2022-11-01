import { EmailService } from 'src/app/services/email.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VigenciasService, vigencias } from 'src/app/services/catalogos/vigencias.service';
import { ControlDocumentoService } from 'src/app/services/control-documento.service';
import { ProcesosService, Proceso } from 'src/app/services/procesos.service';
import { UsuariosService, Usuario } from 'src/app/services/usuarios.service';
import { ViewPermisosService } from 'src/app/services/view-permisos.service';
import  decode  from 'jwt-decode';
import Swal from 'sweetalert2';
import { environment } from './../../../environments/environment';


const base = environment.api;




@Component({
  selector: 'app-control-documento',
  templateUrl: './control-documento.component.html',
  styleUrls: ['./control-documento.component.css']
})
export class ControlDocumentoComponent implements OnInit {

    public archivos: any =[];

  public formUsuario: FormGroup;



  constructor(private formBuilder: FormBuilder, private ProcesosService: ProcesosService, private UsuariosService: UsuariosService, private VigenciasService : VigenciasService,
     private ControlDocumentoService :ControlDocumentoService, private ViewPermisosService: ViewPermisosService, private EmailService : EmailService ) { 
      
    this.formUsuario= this.formBuilder.group({
      tipoDocumento: ['',[Validators.required]],
      nombreDocumento: ['',[Validators.required]],
      vigencia: ['',[Validators.required]],
      fecha_creacion: ['',[Validators.required]],
      revisa_document: ['',[Validators.required]],
      aprueba_document: ['',[Validators.required]],
      documento: ['',[Validators.required]],
    });
  }

  listarUsuarios?: Usuario[];
  listProcesos?: any[];
  listVigencias?:vigencias[];

  public viewDepartamentos: boolean =true;
  public viewTabla: boolean=false;
  public viewPdf: boolean=false;
  public proceso: any;
  usuario : any;
  revisores : any;
  aprobadores : any;



  //Get Procesos
  getProcesos(){
    this.ProcesosService.getProcesos().subscribe(res=>{
      this.listProcesos = <any> res;
    });
  }

  //GET REVISORES
  getRevisores(){
    this.ControlDocumentoService.getRevisores().subscribe((res : any)=>{
      this.revisores = res;
     //  console.log(this.revisores);
      
    });
  }

    //GET APRUEBA
    getAprobador(){
      this.ControlDocumentoService.getAprobador().subscribe((res : any)=>{
        this.aprobadores = res;
       //  console.log(this.aprobadores);
        
      });
    }


  // Get catalogo de vigencias 
  getCatVigencias(){
    this.VigenciasService.getCatVigencias().subscribe(res =>{
      this.listVigencias=<any> res;
     //  console.log(this.listVigencias);
      
    });
  }

  // Captura de file 
  capturarFile(event: any){
      const [file]= event.target.files;
    
    this.archivos={
      fileRaw: file,
      fileName: file.name
    };
   //  console.log('si entro'); 
  }


  //Listar Documentos
  listDocuments?: any;

  getDocumets(){
    // this.ControlDocumentoService.getDocuments().subscribe(res=>{
    //   this.listDocuments=<any>res;
    //  //  console.log(this.listDocuments);
      
    // });
  }
  p: number = 1;
  //Enviar Documentos
  sendDatos(){

    let autor : any;
    let revisa : any;
    let aprueba : any;

    let body_autor ={'id_usuario': this.usuario.id_usuario};
    this.UsuariosService.get_un_usuario(body_autor).subscribe((res:any)=>{
      autor = res[0];
      let body_revisa={'id_usuario':this.formUsuario.value.revisa_document};
      this.UsuariosService.get_un_usuario(body_revisa).subscribe((res1: any)=>{
        revisa = res1[0];
        let body_aprueba={'id_usuario': this.formUsuario.value.revisa_document};
        this.UsuariosService.get_un_usuario(body_aprueba).subscribe((res2:any)=>{
          aprueba = res[0];


        //////////// Email para revisor 
        let text1 = `Se te ha asignado un documento para revisar en el modulo de control de documentos`;
        let texto2 =`El usuario que solicito de su aprobación es ${autor.nombre} ${autor.apellidos}`
        let body_email1 ={'email' : revisa.email, 'nombre' :revisa.nombre ,
        'apellidos' : revisa.apellidos, 'mensaje1' : text1, 'mensaje2' : texto2 };
        this.EmailService.sendData(body_email1).subscribe((res:any)=>{});
        //////////// Email para revisor  

        //////////// Email aprueba
        let text3 = `Se te ha asignado un documento para aprobar, en el modulo de control de documentos`;
        let texto4 =`El usuario que solicito de su aprobación es ${autor.nombre} ${autor.apellidos}`
        let body_email3 ={'email' : aprueba.email, 'nombre' :aprueba.nombre ,
        'apellidos' : aprueba.apellidos, 'mensaje1' : text3, 'mensaje2' : texto4 };
        this.EmailService.sendData(body_email3).subscribe((res:any)=>{});
        //////////// Email aprueba 

        });
      });
    });

    const body = new FormData();
    body.append('myFile', this.archivos.fileRaw, this.archivos.fileName);
    body.append('generausuario',this.usuario.id_usuario);
    body.append('nombreProceso',this.proceso.id_proceso);
    body.append('tipoDocumento',this.formUsuario.value.tipoDocumento);
    body.append('nombreDocumento',this.formUsuario.value.nombreDocumento);
    body.append('vigencia',this.formUsuario.value.vigencia);
    body.append('fecha_creacion',this.formUsuario.value.fecha_creacion);
    body.append('revisa_document',this.formUsuario.value.revisa_document);
    body.append('aprueba_document',this.formUsuario.value.aprueba_document);
    body.append('documento',this.formUsuario.value.documento);

    //console.log(this.formUsuario.value);
    this.ControlDocumentoService.sendPost(body).subscribe(res=>{



      
      this.mensajeAdd(res);
      this.getTabla(this.proceso);
    });

  }

  body ={ 'id_usuario' : 0,'id_proceso': 0 };

  //Get docummentos
  getTabla(departamento: any){
    this.proceso=departamento;
    const token: any = localStorage.getItem('token');
    this.usuario =decode(token);
   //  console.log(this.usuario);

    this.body.id_usuario=this.usuario.id_usuario;
    this.body.id_proceso=this.proceso?.id_proceso;

    this.backTable();
    this.ControlDocumentoService.getDocuments(this.body).subscribe(res=>{
      this.archivos= <any> res;
     //  console.log(this.archivos);
      
    });
  }

  
  // pdfSrc ='http://3.19.235.131:3000/docAsigna/';

  pdfSrc =`${base}/docAsigna/`;

  getPdf(documento: any){
    this.pdfSrc =`${base}/docAsigna/`;

    this.documento = documento;
    this.pdfSrc =this.pdfSrc+documento.documento;
   //  console.log(documento.documento);
    this.viewDepartamentos=false;
    this.viewTabla=false;
    this.viewPdf=true;


  }

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




  public documento : any;

  usuarioLog : any;
  permisoUsuario(){
    this.ViewPermisosService.getPermisos().subscribe((res : any) =>{
      this.usuarioLog=res[0];
     //  console.log(this.usuarioLog);
      
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
      this.getPreceso(body);
      
     //  console.log('Procesos 2');
      
    }
    /// Procesos ///



    this.getRevisores();
    this.getAprobador();
    this.getCatVigencias();
    this.getDocumets();
    this.permisoUsuario();
  }

      ////// Mensajes //////
      mensajeAdd(res : any){
        if (res.ok) {
          Swal.fire({
            title:'Correcto',
            text: `Se hagrego correctamente`,
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
            text: `Se hactualizo correctamente`,
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
            text: `Se hactualizo correctamente`,
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
