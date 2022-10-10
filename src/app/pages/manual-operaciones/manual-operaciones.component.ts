import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProcesosService } from 'src/app/services/procesos.service';
import Swal from 'sweetalert2';
import { ManualOperacionesService } from 'src/app/services/manual-operaciones.service';
import { ViewPermisosService } from 'src/app/services/view-permisos.service';
import  decode  from 'jwt-decode';
import { environment } from './../../../environments/environment';

const base = environment.api;







@Component({
  selector: 'app-manual-operaciones',
  templateUrl: './manual-operaciones.component.html',
  styleUrls: ['./manual-operaciones.component.css']
})
export class ManualOperacionesComponent {

  public departamento : any;

  tree : boolean = false;
  vistaDepa : boolean =true;
  viewPDF = false;



  public documento : any ;
  


public formUsuario: FormGroup;
public formUsuario1: FormGroup;
public formUsuario11: FormGroup


constructor(private ProcesosService : ProcesosService, private FormBuilder: FormBuilder ,private ManualOperacionesService: ManualOperacionesService, 
            private ViewPermisosService: ViewPermisosService) { 
  
  this.formUsuario= this.FormBuilder.group({
    nom_operacion : ['',[Validators.required]]
  });

  this.formUsuario1= this.FormBuilder.group({
    nom_operacion : ['',[Validators.required]],
    documento: ['',[Validators.required]],
  });

  this.formUsuario11= this.FormBuilder.group({
    nom_operacion : ['',[Validators.required]],
  });

 }

 listProcesos: any;
 listPadres: any;
 listHijos: any;
 proceso : any;

 backTree(){
   this.tree =true;
   this.vistaDepa =false;
   this.viewPDF =false;
 }

 backProcesos(){
   this.tree =false;
   this.vistaDepa =true;
   this.viewPDF =false;
 }

// Get Procesos
getProcesos(){
 this.ProcesosService.getProcesos().subscribe(res=>{
   this.listProcesos= <any> res;
 });
}

//Get Padres
getPadres(departamento : any){

 this.tree =true;
 this.vistaDepa =false;
 this.viewPDF =false;

 this.proceso = departamento;
//  console.log(departamento);
 this.ManualOperacionesService.getPadres(departamento.id_proceso).subscribe(res=>{
   this.listPadres= <any> res;
  //  console.log(this.listPadres);
   
 });

}

dataPadre: any;
 //Get Hijos
getHola(padre: any){
 this.dataPadre=padre;
 padre.id_operacion;
//  console.log(padre);
 this.listHijos=[];
  for(let i = 0; i < this.listPadres.length; i++ ){
   
      if (this.listPadres[i].id_operacion == padre.id_operacion ) {

        this.listPadres[i].id_vista=true;
        this.ManualOperacionesService.getHijos(padre).subscribe(res=>{
           this.listHijos = <any> res;
          //  console.log(this.listHijos);
        });
     }else{
        this.listPadres[i].id_vista=false;;
    }
   
  }
}

public archivos: any =[];

// Captura de file 
capturarFile(event: any){
 const [file]= event.target.files;

 this.archivos={
   fileRaw: file,
   fileName: file.name
 };
//  console.log('si entro');    
}

 //Enviar Documentos
 sendDatos(){
   
  let body ={'id_proceso' : 0, 'nom_operacion' : ''};

  body.id_proceso =this.proceso.id_proceso;
  body.nom_operacion =this.formUsuario.value.nom_operacion;     

   this.ManualOperacionesService.sendPost(body).subscribe((res : any) =>{
    //  console.log(res);
     if (res.ok) {
       Swal.fire({
         title:'Correcto',
         text: `Se a registrado correctamente ${this.formUsuario.value.nom_operacion}`,
         icon: 'success',
         confirmButtonText: 'confirmar'
         
       })

             // Se recarga para hacer una funcion
   this.getPadres(this.proceso);
     } else {
       Swal.fire({
         title:'Error',
         text: `Se a registrado correctamente ${this.archivos.fileName}`,
         icon: 'error',
         confirmButtonText: 'confirmar'
       })
     }
     
   });
 
 }

   //Enviar Documentos
   sendDatosDocument(){
     const body = new FormData();
     body.append('myFile', this.archivos.fileRaw, this.archivos.fileName);
     body.append('id_proceso',this.proceso.id_proceso);
     body.append('nom_operacion',this.formUsuario1.value.nom_operacion);
     body.append('id_operacion',this.dataPadre.id_operacion);

     this.ManualOperacionesService.sendPostDocument(body).subscribe((res: any)=>{
      //  console.log(res);
               //Se recarga para hacer una funcion
     
     if (res.ok) {
      Swal.fire({
        title:'Correcto',
        text: `Se a registrado correctamente ${this.archivos.fileName}`,
        icon: 'success',
        confirmButtonText: 'confirmar'
        
      })

            // Se recarga para hacer una funcion
        this.getHola(this.dataPadre);
    } else {
      Swal.fire({
        title:'Error',
        text: `Se a registrado correctamente ${this.archivos.fileName}`,
        icon: 'error',
        confirmButtonText: 'confirmar'
      })
    }
       
     });

     
   }

   public padre : any;
   extraerPadre(padre : any){
     this.cleanModal();
     this.padre = padre;
    //  console.log(this.padre);
     
   }

   //Eliminar Padre 
   padresHijos : any;
   deletePadre(){
    //  console.log(this.padre);
    this.getpadreshijo();
   }

    // padres e hijos 
     
    getpadreshijo(){
      this.ManualOperacionesService.getpadreshijos(this.padre).subscribe((res : any)=>{
        this.padresHijos = res;
       //  console.log(this.padresHijos);
        for (let i = 0; i <= this.padresHijos.length; i++) {
          if(this.padresHijos[i]?.carp_operacion == 1){
           //  console.log( i ,"Es padre");

            this.ManualOperacionesService.deleteDocPadre(this.padre).subscribe((res : any)=>{
             //  console.log(res);              
            });

            this.ManualOperacionesService.deletepadreshijos(this.padre).subscribe((res : any)=>{
              this.getPadres(this.proceso);
                 if (res.ok) {
                   Swal.fire({
                     title:'Correcto',
                     text: `Se a eliminado de forma correcta `,
                     icon: 'success',
                     confirmButtonText: 'confirmar'
                   })
                 } else {
                   Swal.fire({
                     title:'Error',
                     text: `Error`,
                     icon: 'error',
                     confirmButtonText: 'confirmar'
                   })
                 }
            });
            
          }
          if(this.padresHijos[i]?.carp_operacion == 0){
           //  console.log( i ,"Es hijo");
            this.ManualOperacionesService.deleteDocHijo(this.padresHijos[i]).subscribe((res : any)=>{
             //  console.log(res);              
            });
          }
          
          
         }
        
      });

     }


     //////Eliminar Padre e hijos  /////

     //Eliminar hijo 
     deletehijo(){
      this.ManualOperacionesService.deleteDocHijo(this.padre).subscribe((res: any)=>{
       //  console.log(res);        
      });

      this.ManualOperacionesService.deletehijos(this.padre).subscribe((res : any)=>{
        this.getHola(this.dataPadre);
        if (res.ok) {
          Swal.fire({
            title:'Correcto',
            text: `Se a eliminado de forma correcta `,
            icon: 'success',
            confirmButtonText: 'confirmar'
          })
        } else {
          Swal.fire({
            title:'Error',
            text: `Error`,
            icon: 'error',
            confirmButtonText: 'confirmar'
          })
        }
      });
     }


   cargarModalEdit(padre : any){
     this.padre = padre;
    //  console.log(this.padre);
     this.formUsuario11.setValue({
       nom_operacion : this.padre.nom_operacion
     });
   }

   editarCampos(){
     //this.ManualOperacionesService.editCampo(this.padre.id_operacion, this.padre).
     this.ManualOperacionesService.editCampo(this.padre.id_operacion, this.formUsuario11.value).subscribe((res: any) =>{
      //  console.log(res);
       if (res.ok) {
         Swal.fire({
           title:'Correcto',
           text: `Se a edito de forma correcta`,
           icon: 'success',
           confirmButtonText: 'confirmar'
           
         })

               // Se recarga para hacer una funcion
     this.getPadres(this.proceso);
       } else {
         Swal.fire({
           title:'Error',
           text: `Ocurrio un error`,
           icon: 'error',
           confirmButtonText: 'confirmar'
         })
       }
     });

   }

   

//  downPDFPagre ='http://3.19.235.131:3000/operacion_legal_descarga/';
//  downPDFHijo ='http://3.19.235.131:3000/operacion_legal_descarga_hijo/';

downPDFPagre =`${base}/operacion_legal_descarga/`;

downPDFHijo =`${base}/operacion_legal_descarga_hijo/`;
 pdfSrc ='';

 getPdf(padre: any){
   this.pdfSrc ='';

   this.tree =false;
   this.vistaDepa =false;
   this.viewPDF =true;

   this.pdfSrc=this.pdfSrc =`${base}/operacion_legal_vistaPadre/`;
   

  //  console.log();

   this.pdfSrc =this.pdfSrc+padre.dir_operacion;
  //  console.log(padre.dir_operacion);
 }

 getPdfHijo(hijo : any){
   this.pdfSrc ='';
   this.tree =false;
   this.vistaDepa =false;
   this.viewPDF =true;

   this.pdfSrc=this.pdfSrc =`${base}/operacion_legal_hijos/`;

  //  console.log();

   this.pdfSrc =this.pdfSrc+hijo.dir_operacion;
  //  console.log(hijo.dir_operacion);
 }

 downDPFPadre(padre : any){
   this.pdfSrc ='';
   this.tree =false;
   this.vistaDepa =false;
   this.viewPDF =true;
   
   this.pdfSrc=this.pdfSrc =`${base}/operacion_legal_descarga/`;

  //  console.log();

   this.pdfSrc =this.pdfSrc+padre.dir_operacion;
  //  console.log(padre.dir_operacion);
 }

 //clean modal
 cleanModal(){
   this.formUsuario.setValue({
     nom_operacion : ''
     
   });
   this.formUsuario1.setValue({
     nom_operacion : '',
     documento : ''
   });
 };

usuarioLog : any;

permisoUsuario(){
this.ViewPermisosService.getPermisos().subscribe((res:any)=>{
  this.usuarioLog = res[0];
 //  console.log(this.usuarioLog);
  
});
}

getPreceso(body : any){
  this.ProcesosService.getProcesosUsuario(body).subscribe((res)=>{
    this.listProcesos = res;
  });
 };

tipoProceso : any;

ngOnInit(): void {

  this.permisoUsuario();

 /// Procesos ///
 const token: any = localStorage.getItem('token');
 this.tipoProceso =decode(token);
//  console.log(this.tipoProceso);
 if(this.tipoProceso.tipoUsuario == 0){
   this.getProcesos();
 } else{
   let body ={'id_usuario' : this.tipoProceso.id_usuario};
   this.getPreceso(body);
 }
 /// Procesos ///

}

}
