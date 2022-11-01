import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProcesosService } from 'src/app/services/procesos.service';
import Swal from 'sweetalert2';
import { ManualCalidadService } from 'src/app/services/manual-calidad.service';
import { ViewPermisosService } from 'src/app/services/view-permisos.service';
import  decode  from 'jwt-decode';
import { environment } from './../../../environments/environment';

const base = environment.api;




@Component({
  selector: 'app-manual-calidad',
  templateUrl: './manual-calidad.component.html',
  styleUrls: ['./manual-calidad.component.css']
})
export class ManualCalidadComponent {

  
  public departamento : any;

  tree : boolean = false;
  vistaDepa : boolean =true;
  viewPDF = false;

  public documento : any ;
  

public formUsuario: FormGroup;
public formUsuario1: FormGroup;
public formUsuario11: FormGroup


  constructor(private ProcesosService : ProcesosService,private FormBuilder: FormBuilder, private ManualCalidadService: ManualCalidadService,
              private ViewPermisosService: ViewPermisosService) { 
    this.formUsuario= this.FormBuilder.group({
      nom_calidad : ['',[Validators.required]]
    });

    this.formUsuario1= this.FormBuilder.group({
      nom_calidad : ['',[Validators.required]],
      documento: ['',[Validators.required]],
    });

    this.formUsuario11= this.FormBuilder.group({
      nom_calidad : ['',[Validators.required]],
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
   this.ManualCalidadService.getPadres(departamento.id_proceso).subscribe(res=>{
     this.listPadres= <any> res;
    //  console.log(this.listPadres);
     
   });

  }
  
  dataPadre: any;
   //Get Hijos
  getHola(padre: any){
   this.dataPadre=padre;
   padre.id_calidad;
  //  console.log(padre);
   this.listHijos=[];
    for(let i = 0; i < this.listPadres.length; i++ ){
     
        if (this.listPadres[i].id_calidad == padre.id_calidad ) {

          this.listPadres[i].id_vista=true;
          this.ManualCalidadService.getHijos(padre).subscribe(res=>{
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
     
    let body ={'id_proceso' : 0, 'nom_calidad' : ''};

    body.id_proceso =this.proceso.id_proceso;
    body.nom_calidad =this.formUsuario.value.nom_calidad;     
     
 
     this.ManualCalidadService.sendPost(body).subscribe((res : any) =>{
      //  console.log(res);
       if (res.ok) {
         Swal.fire({
           title:'Correcto',
           text: `Se ha registrado correctamente ${this.formUsuario.value.nom_calidad}`,
           icon: 'success',
           confirmButtonText: 'confirmar'
           
         })

               // Se recarga para hacer una funcion
     this.getPadres(this.proceso);
       } else {
         Swal.fire({
           title:'Error',
           text: `Se ha registrado correctamente ${this.formUsuario.value.nom_calidad}`,
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
       body.append('nom_calidad',this.formUsuario1.value.nom_calidad);
       body.append('id_calidad',this.dataPadre.id_calidad);

       this.ManualCalidadService.sendPostDocument(body).subscribe((res : any)=>{
        //  console.log(res);
                 //Se recarga para hacer una funcion
       
       if (res.ok) {
        Swal.fire({
          title:'Correcto',
          text: `Se ha registrado correctamente ${this.archivos.fileName}`,
          icon: 'success',
          confirmButtonText: 'confirmar'
          
        })

              // Se recarga para hacer una funcion
              this.getHola(this.dataPadre);
      } else {
        Swal.fire({
          title:'Error',
          text: `Se ha registrado correctamente ${this.archivos.fileName}`,
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

     //////Eliminar Padre e hijos  /////
     padresHijos : any;
     deletePadre(){
       this.getpadreshijo();
     }
     
     // padres e hijos 
     
     getpadreshijo(){
      this.ManualCalidadService.getpadreshijos(this.padre).subscribe((res : any)=>{
        this.padresHijos = res;
       //  console.log(this.padresHijos);
        for (let i = 0; i <= this.padresHijos.length; i++) {
          if(this.padresHijos[i]?.carp_calidad == 1){
           //  console.log( i ,"Es padre");

            this.ManualCalidadService.deleteDocPadre(this.padre).subscribe((res : any)=>{
             //  console.log(res);              
            });

            this.ManualCalidadService.deletepadreshijos(this.padre).subscribe((res : any)=>{
              this.getPadres(this.proceso);
                 if (res.ok) {
                   Swal.fire({
                     title:'Correcto',
                     text: `Se ha eliminado de forma correcta `,
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
          if(this.padresHijos[i]?.carp_calidad == 0){
           //  console.log( i ,"Es hijo");
            this.ManualCalidadService.deleteDocHijo(this.padresHijos[i]).subscribe((res : any)=>{
             //  console.log(res);              
            });
          }
          
          
         }
        
      });

     }


     //////Eliminar Padre e hijos  /////

     //Eliminar hijo 
     deletehijo(){
      this.ManualCalidadService.deleteDocHijo(this.padre).subscribe((res: any)=>{
       //  console.log(res);        
      });

      this.ManualCalidadService.deletehijos(this.padre).subscribe((res : any)=>{
        this.getHola(this.dataPadre);
        if (res.ok) {
          Swal.fire({
            title:'Correcto',
            text: `Se ha eliminado de forma correcta `,
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
         nom_calidad : this.padre.nom_calidad
       });
     }

     editarCampos(){
       //this.ManualCalidadService.editCampo(this.padre.id_calidad, this.padre).
       this.ManualCalidadService.editCampo(this.padre.id_calidad, this.formUsuario11.value).subscribe((res: any) =>{
        //  console.log(res);
         if (res.ok) {
           Swal.fire({
             title:'Correcto',
             text: `Se ha edito de forma correcta`,
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

     

  //  downPDFPagre ='http://3.19.235.131:3000/calidad_legal_descarga/';
  //  downPDFHijo ='http://3.19.235.131:3000/calidad_legal_descarga_hijo/';
  downPDFPagre =`${base}/calidad_legal_descarga/`;
  downPDFHijo =`${base}/calidad_legal_descarga_hijo/`;
   pdfSrc ='';

   getPdf(padre: any){
     this.pdfSrc ='';

     this.tree =false;
     this.vistaDepa =false;
     this.viewPDF =true;

     this.pdfSrc=this.pdfSrc=`${base}/calidad_legal_vistaPadre/`;

    //  console.log();

     this.pdfSrc =this.pdfSrc+padre.dir_calidad;
    //  console.log(padre.dir_calidad);
   }

   getPdfHijo(hijo : any){
     this.pdfSrc ='';
     this.tree =false;
     this.vistaDepa =false;
     this.viewPDF =true;
     this.pdfSrc=this.pdfSrc=`${base}/calidad_legal_hijos/`;

    //  console.log();

     this.pdfSrc =this.pdfSrc+hijo.dir_calidad;
    //  console.log(hijo.dir_calidad);
   }

   downDPFPadre(padre : any){
     this.pdfSrc ='';
     this.tree =false;
     this.vistaDepa =false;
     this.viewPDF =true;

     this.pdfSrc=this.pdfSrc =`${base}/calidad_legal_descarga/`;
     

    //  console.log();

     this.pdfSrc =this.pdfSrc+padre.dir_calidad;
    //  console.log(padre.dir_calidad);
   }

   //clean modal
   cleanModal(){
     this.formUsuario.setValue({
       nom_calidad : ''
     });
     this.formUsuario1.setValue({
       nom_calidad : '',
       documento : ''
     });
   };

   usuarioLog : any;

   permisosUsuario(){
    this.ViewPermisosService.getPermisos().subscribe((res:any)=>{
      this.usuarioLog =res[0];
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
    
    this.permisosUsuario();
    /// Procesos ///
    const token: any = localStorage.getItem('token');
    this.tipoProceso =decode(token);
   //  console.log(this.tipoProceso);
    if(this.tipoProceso.tipoUsuario == 1){
      this.getProcesos();
    } else{
      let body ={'id_usuario' : this.tipoProceso.id_usuario};
      this.getPreceso(body);
    }
    /// Procesos ///
  }

  

}
