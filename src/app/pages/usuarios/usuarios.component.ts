import { MultiProcesoService } from 'src/app/services/multi-proceso.service';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatTipoUsuarioService, catTipoUsuario } from 'src/app/services/catalogos/cat-tipo-usuario.service';
import { PermisosService, Permisos } from 'src/app/services/permisos.service';
import { ProcesosService,Proceso } from 'src/app/services/procesos.service';
import { UsuariosService,Usuario } from 'src/app/services/usuarios.service';
import { ViewPermisosService } from 'src/app/services/view-permisos.service';
import  decode  from 'jwt-decode';
import { EmailService } from 'src/app/services/email.service';




@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public formUsuario: FormGroup; 
  public formUsuario1: FormGroup; 

  public formUsuarioMulti1: FormGroup;
  public formUsuarioMulti: FormGroup;


  public title : any;

  listarUsuarios : any;
  listProcesos? : any=[];
  listCatTipoUsuario?: catTipoUsuario[];

  constructor(private UsuariosService: UsuariosService, private CatTipoUsuarioService: CatTipoUsuarioService,
  private ProcesosService : ProcesosService ,private formBuilder: FormBuilder, private PermisosService : PermisosService,
  private ViewPermisosService : ViewPermisosService, private MultiProcesoService :MultiProcesoService, private EmailService : EmailService
  ) { 
    this.formUsuarioMulti= this.formBuilder.group({
      usuario: ['',[Validators.required]],
      nombre: ['',[Validators.required]],
      apellidos: ['',[Validators.required]],
      email: ['',[Validators.required]],
      departamento: ['',[Validators.required]],
      tipoUsuario: ['',[Validators.required]],
      password: ['',[Validators.required]],
      estatus: ['',[]],
      foto: ['',[]],
    });

    this.formUsuarioMulti1= this.formBuilder.group({
      usuario: ['',[Validators.required]],
      nombre: ['',[Validators.required]],
      apellidos: ['',[Validators.required]],
      email: ['',[Validators.required]],
      departamento: ['',[Validators.required]],
      tipoUsuario: ['',[Validators.required]],
      password: ['',[Validators.required]],
      estatus: ['',[]]
      
    });
  

    this.formUsuario= this.formBuilder.group({
      usuario: ['',[Validators.required]],
      nombre: ['',[Validators.required]],
      apellidos: ['',[Validators.required]],
      email: ['',[Validators.required]],
      departamento: ['',[Validators.required]],
      tipoUsuario: ['',[Validators.required]],
      password: ['',[Validators.required]],
      estatus: ['',[]],
      foto: ['',[]],
    });

    this.formUsuario1= this.formBuilder.group({
      usuario: ['',[Validators.required]],
      nombre: ['',[Validators.required]],
      apellidos: ['',[Validators.required]],
      email: ['',[Validators.required]],
      departamento: ['',[Validators.required]],
      tipoUsuario: ['',[Validators.required]],
      password: ['',[Validators.required]],
      estatus: ['',[]]
    });


  }

    public viewDepartamentos: boolean = true;
    public viewUsuarios: boolean = false;


    logProcesos? : any =[];
    listNuevo(){
      //console.log(this.logProcesos);
      
    }
    
  limpiaForm(){
    this.formUsuario.reset();
    this.formUsuarioMulti.reset();
  }

  p : number =1;

  backDepartamentos(){
    this.viewDepartamentos=true;
    this.viewUsuarios=false;
    this.allUsuarios = false;
  }


  //Get Procesos
  getProcesos(){
    this.ProcesosService.getProcesos().subscribe(res=>{
     //  //console.log('Procesos Listos');
      this.listProcesos =<any> res;
       //console.log(this.listProcesos);
      
    });
  }

  // Get Catalogo de Usiarios 
  getCatUuarios(){
    const token: any = localStorage.getItem('token');
    this.tipoProceso =decode(token);
    let body ={'tipoUsurio': this.tipoProceso.tipoUsuario};
    
    this.CatTipoUsuarioService.getCatTipoUsuario(body).subscribe(res=>{
     //  //console.log('Catalogo listo');
      this.listCatTipoUsuario = <any> res;
     //  //console.log(this.listCatTipoUsuario);
      
      
    });
  }


  usuarioLog ={
    usuarioAdd : true,
    usuarioUpdate : true,
    usuarioDelete : true,
  };

  permisosUsuarios(){
    this.ViewPermisosService.getPermisos().subscribe((res:any)=>{
      this.usuarioLog= res[0];
     //  //console.log(this.usuarioLog);
      
    });
  }



  usuario : any;

  /// Listar todos los permisos ///
  allUsuarios = false;
  getAllUsuarios(){
    this.UsuariosService.getUsuarios().subscribe((res:any)=>{
      this.allUsuarios = true;
      this.viewDepartamentos = false;
      this.listarUsuarios= res;
      this.viewUsuarios=true;
    });
  }
  /// Listar todos los permisos ///




  ///////// MULTI PROCESO ///////
  // Llenar modal multi Proceso
  llenarModalMultiProceso(usuario: any){
    this.usuario = usuario;

   //  //console.log(usuario);
    this.formUsuarioMulti1.setValue({
      usuario : usuario.usuario,
      nombre : usuario.nombre,
      apellidos : usuario.apellidos,
      email : usuario.email,
      departamento: usuario.id_proceso,
      tipoUsuario : usuario.id_cat_usuarios,
      password: usuario.password,
      estatus : usuario.estatus

    });
    let body ={'id_usuario' : usuario.id_usuario};
    this.UsuariosService.getProcesosUsuario(body).subscribe((res : any)=>{      
      this.logProcesos = res;
    
    });
    

  }

  // Update 
  editUsuarioMultiProceso(){
    let nu: any;
    nu =this.formUsuarioMulti1.value;
    if(nu.estatus==false){
     nu.estatus=0
    }
    if(nu.estatus ==true){
     nu.estatus=1;
    }
    nu.departamento = this.logProcesos[0].id_proceso;
   //  //console.log(nu.estatus);
   // Eliminar procesos
   let del_body={'id_usuario' : this.usuario.id_usuario};
   this.UsuariosService.deleteProcesosUsuario(del_body).subscribe((res : any)=>{
     //console.log(res);
     
   });
   // Eliminar procesos


   //Eliminar Permisos
   this.UsuariosService.deletePermisosUsuario(del_body).subscribe((res:any)=>{
    //console.log(res);
    
   });
   //Eliminar Permisos

    ///////////////
    //console.log(nu);
    
    if(nu.tipoUsuario == 2 || nu.tipoUsuario == 3){
      this.PermisosService.addPermisos(this.usuario.id_usuario, this.permisosGerencia).subscribe(res =>{
         //console.log('Se agregaron Permisoso de Gerencia');
        
      });
    }

    if (nu.tipoUsuario == 4 || nu.tipoUsuario == 5) {
      this.PermisosService.addPermisos(this.usuario.id_usuario, this.permisosSupervisor).subscribe(res =>{
         //console.log('Se agregaron Permisoso de permisosSupervisor');
        
      });
    }

    if (nu.tipoUsuario == 6) {
      this.PermisosService.addPermisos(this.usuario.id_usuario, this.permisosOperativo).subscribe(res =>{
         //console.log('Se agregaron Permisoso de permisosOperativo');
        
      });
    }
    //////////////

   // Subir nuevos procesos
   for (let i = 0; i < this.logProcesos.length; i++) {
     let proceso = this.logProcesos[i].id_proceso;
     let body ={'id_usuario' :this.usuario.id_usuario , 'id_proceso' : proceso};
       this.UsuariosService.addProcesos(body).subscribe((res:any)=>{
         //console.log(res);
         
       });
    }
   // Subir nuevos procesos
   
   this.UsuariosService.editUsuario(this.usuario.id_usuario , nu).subscribe(res =>{
    //  //console.log('Se actializo con exito');
    this.mensajeUpdate(res);
     this.lisUsuarios(this.proceso);
     
   });
   this.lisUsuarios(this.proceso);
 }
///////// MULTI PROCESO ///////


///////// Un proceso PROCESO ///////
llenarModal(usuario: any){
  this.usuario = usuario;

 //  //console.log(usuario);
  this.formUsuario1.setValue({
    usuario : usuario.usuario,
    nombre : usuario.nombre,
    apellidos : usuario.apellidos,
    email : usuario.email,
    departamento: usuario.id_proceso,
    tipoUsuario : usuario.id_cat_usuarios,
    password: usuario.password,
    estatus : usuario.estatus

  });
  let body ={'id_usuario' : usuario.id_usuario};
  this.UsuariosService.getProcesosUsuario(body).subscribe((res : any)=>{      
    this.logProcesos = res;
  //console.log(this.logProcesos);
  
  });
  

}

// Update 
editUsuario(){
  let nu: any;
  nu =this.formUsuario1.value;
  if(nu.estatus==false){
    nu.estatus=0
  }
  if(nu.estatus ==true){
    nu.estatus=1;
  }
  nu.departamento = this.logProcesos[0].id_proceso;
  //  //console.log(nu.estatus);
  // Eliminar procesos
  let del_body={'id_usuario' : this.usuario.id_usuario};

  //console.log('usuario : ', this.usuario);
  //console.log('nu: ', nu);
  //console.log('body: ', del_body);
  //console.log(this.logProcesos);
  
  
  
    // Eliminar procesos
  this.UsuariosService.deleteProcesosUsuario(del_body).subscribe((res : any)=>{
    //console.log(res);
    
  });
  // Eliminar procesos

  // Subir nuevos procesos
  for (let i = 0; i < this.logProcesos.length; i++) {
    let proceso = this.logProcesos[i].id_proceso;
    let body ={'id_usuario' :this.usuario.id_usuario , 'id_proceso' : proceso};
      this.UsuariosService.addProcesos(body).subscribe((res:any)=>{
        //console.log(res);
        
      });
  }
  // Subir nuevos procesos

     //Eliminar Permisos
     this.UsuariosService.deletePermisosUsuario(del_body).subscribe((res:any)=>{
      //console.log(res);
      
     });
     //Eliminar Permisos

      ///////////////
    //console.log(nu);
    
    if(nu.tipoUsuario == 2 || nu.tipoUsuario == 3){
      this.PermisosService.addPermisos(this.usuario.id_usuario, this.permisosGerencia).subscribe(res =>{
         //console.log('Se agregaron Permisoso de Gerencia');
        
      });
    }

    if (nu.tipoUsuario == 4 || nu.tipoUsuario == 5) {
      this.PermisosService.addPermisos(this.usuario.id_usuario, this.permisosSupervisor).subscribe(res =>{
         //console.log('Se agregaron Permisoso de permisosSupervisor');
        
      });
    }

    if (nu.tipoUsuario == 6) {
      this.PermisosService.addPermisos(this.usuario.id_usuario, this.permisosOperativo).subscribe(res =>{
         //console.log('Se agregaron Permisoso de permisosOperativo');
        
      });
    }
    //////////////


  
  this.UsuariosService.editUsuario(this.usuario.id_usuario , nu).subscribe(res =>{
  //  //console.log('Se actializo con exito');
    this.lisUsuarios(this.proceso);
    this.mensajeUpdate(res);
    
  });
  this.lisUsuarios(this.proceso);
}
///////// Un proceso PROCESO ///////





  public departamento : any;
  public proceso :any;
  //listar Usuario
  lisUsuarios(proceso : any){

    this.proceso = proceso;
   //  //console.log(this.proceso.id_proceso);
    
    this.viewDepartamentos=false;
    this.viewUsuarios=true;

    this.UsuariosService.getUnUsuairio(this.proceso.id_proceso).subscribe(res=>{
      this.listarUsuarios = <any> res;
     //  //console.log(res);
      
    });
  }

  //Eliminar Usuario
  deleteUsuario(){
    this.UsuariosService.deleteUsuario(this.usuario.id_usuario).subscribe(res=>{
     //  //console.log('Usuario eliminado');
       this.lisUsuarios(this.proceso);
    });

    let body={'id_usuario' : this.usuario.id_usuario};
    this.UsuariosService.deleteProcesosUsuario(body).subscribe((res:any)=>{
      this.mensajeDelete(res);
    });

    
  }



  //Agregar Uusuario Multi Proceso
  addUsuarioMultiProceso(){

   //  //console.log(this.formUsuario.value.estatus);
   //  //console.log(this.permisosGerencia);
    let nu: any;
    nu =this.formUsuarioMulti.value;
    if(nu.estatus==false){
     nu.estatus=0
    }
    if(nu.estatus ==true){
     nu.estatus=1;
    }
    nu.departamento = this.logProcesos[0].id_proceso;

    //console.log(nu);
    let text = 'Tu usuario es: '+this.formUsuarioMulti.value.usuario+ ' y tu contraseña es: ' + this.formUsuarioMulti.value.password;
    let body_email ={'email' : this.formUsuarioMulti.value.email, 'nombre' : this.formUsuarioMulti.value.nombre,
                     'apellidos' : this.formUsuarioMulti.value.apellidos, 'mensaje1' : 'Te damos la Bienvenida', 'mensaje2' : text };
    this.EmailService.sendData(body_email).subscribe((res:any)=>{});
    
    this.UsuariosService.addUsuario(nu).subscribe(res =>{
     //  //console.log('Se agrego usuario correctamente');
     this.mensajeAdd(res);
      this.cargarPermisos();
      
    });


    
  }

  //Agregar Uusuario Multi Proceso
  addUsuario(){

    //  //console.log(this.formUsuario.value.estatus);
    //  //console.log(this.permisosGerencia);
    this.logProcesos=[];
      let nu: any;
      nu =this.formUsuario.value;
      if(nu.estatus==false){
      nu.estatus=0
      }
      if(nu.estatus ==true){
      nu.estatus=1;
      }
      let logProce ={'id_proceso' : nu.departamento};
      this.logProcesos.push(logProce);
      //nu.departamento = this.logProcesos[0].id_proceso;
  
      //console.log(this.logProcesos);
      //console.log(nu);
      
      let text = 'Tu usuario es: '+this.formUsuario.value.usuario+ ' y tu contraseña es: ' + this.formUsuario.value.password;
    let body_email ={'email' : this.formUsuario.value.email, 'nombre' : this.formUsuario.value.nombre,
                     'apellidos' : this.formUsuario.value.apellidos, 'mensaje1' : 'Te damos la Bienvenida', 'mensaje2' : text };
    this.EmailService.sendData(body_email).subscribe((res:any)=>{});
      
      this.UsuariosService.addUsuario(nu).subscribe(res =>{
      //  //console.log('Se agrego usuario correctamente');
      this.mensajeAdd(res);
        this.cargarPermisos();
        
      });
    }
  

  //Carga de Permisos
  ultimoUsuario : any;
  cargarPermisos(){
    this.UsuariosService.getUsuarios().subscribe((res : any)=>{
      let ultimo = res;
      let numero = res.length;
      this.ultimoUsuario =ultimo[numero-1]
      //console.log(this.ultimoUsuario);

      ///////////////
      if(this.ultimoUsuario.tipoUsuario == 'Director' || this.ultimoUsuario.tipoUsuario == 'Lider'){
        this.PermisosService.addPermisos(this.ultimoUsuario.id_usuario, this.permisosGerencia).subscribe(res =>{
          // console.log('Se agregaron Permisoso de Gerencia');
          
        });
      }
  
      if (this.ultimoUsuario.tipoUsuario == 'Coordinador' || this.ultimoUsuario.tipoUsuario == 'Supervisor') {
        this.PermisosService.addPermisos(this.ultimoUsuario.id_usuario, this.permisosSupervisor).subscribe(res =>{
           //console.log('Se agregaron Permisoso de permisosSupervisor');
          
        });
      }
  
      if (this.ultimoUsuario.tipoUsuario == 'Operativo') {
        this.PermisosService.addPermisos(this.ultimoUsuario.id_usuario, this.permisosOperativo).subscribe(res =>{
           //console.log('Se agregaron Permisoso de permisosOperativo');
          
        });
      }
      //////////////

           //////////Cargar Procesos ///////////
     for (let i = 0; i < this.logProcesos.length; i++) {
      let proceso = this.logProcesos[i].id_proceso;
      let body ={'id_usuario' :this.ultimoUsuario.id_usuario , 'id_proceso' : proceso};
        this.UsuariosService.addProcesos(body).subscribe((res:any)=>{
          //console.log(res);
          
        });
     }


     //////////Cargar Procesos ///////////

    });




  }

  getPreceso(body : any){
    this.UsuariosService.getProcesosUsuario(body).subscribe((res:any)=>{
      this.listProcesos = res;
    });
   };
  
  tipoProceso : any;

  muitiForm : any;
  getMuitiFormulario(){
    this.MultiProcesoService.getMultiProceso().subscribe((res:any)=>{
      this.muitiForm = res[0].multi_proceso;
      //console.log(this.muitiForm);
      
    });
  }

  ngOnInit(): void {
    this.getMuitiFormulario();
          /// Procesos ///
          const token: any = localStorage.getItem('token');
          this.tipoProceso =decode(token);
         //  //console.log(this.tipoProceso);
          if(this.tipoProceso.tipoUsuario == 1){
           //  //console.log('procesos 1');
            
            this.getProcesos();
          } else{

            let body ={'id_usuario' : this.tipoProceso.id_usuario};
            this.getPreceso(body);
            
           //  //console.log('Procesos 2');
            
          }
          /// Procesos ///
   
    this.permisosUsuarios();
    this.getCatUuarios();
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

}
