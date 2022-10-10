
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Component, Injectable} from '@angular/core';
import { ProcesosService } from 'src/app/services/procesos.service';
import Swal from 'sweetalert2';
import { ViewPermisosService } from 'src/app/services/view-permisos.service';
import  decode  from 'jwt-decode';
import { RegistrosService } from 'src/app/services/registros.service';
import { environment } from './../../../environments/environment';

const base = environment.api;





@Component({
  selector: 'app-procedimientos',
  templateUrl: './procedimientos.component.html',
  styleUrls: ['./procedimientos.component.css'],
})
export class ProcedimientosComponent {
  public formUsuario: FormGroup;
  public formUsuario1: FormGroup;
  public formUsuario11: FormGroup;
  constructor( private FormBuilder :FormBuilder, private RegistrosService : RegistrosService, private ViewPermisosService : ViewPermisosService) {

    this.formUsuario= this.FormBuilder.group({
      nom_registro : ['',[Validators.required]]
    });

    this.formUsuario1= this.FormBuilder.group({
      nom_registro : ['',[Validators.required]],
      documento: ['',[Validators.required]],
    });

    this.formUsuario11= this.FormBuilder.group({
      nom_registro : ['',[Validators.required]],
    });

  }

  listPadres: any;
  listHijos : any;
  usuarioLog :any;
  viewPDF=false;
  tree = true;


  backTree(){
    this.viewPDF = false;
    this.tree=true;
  }


     //Get Padres
     getPadres(){
      this.RegistrosService.getPadres().subscribe(res=>{
        this.listPadres= <any> res;
       //  console.log(this.listPadres);
        
      });
  
     }

     dataPadre: any;
     //Get Hijos
    getHola(padre: any){
     this.dataPadre=padre;
     padre.id_registro;
    //  console.log(padre);
     this.listHijos=[];
      for(let i = 0; i < this.listPadres.length; i++ ){
       
          if (this.listPadres[i].id_registro == padre.id_registro ) {
 
            this.listPadres[i].id_vista=true;
            this.RegistrosService.getHijos(padre).subscribe(res=>{
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
  
        let body ={ 'nom_registro' : ''};
  

        body.nom_registro =this.formUsuario.value.nom_registro;     
  
        
    
        this.RegistrosService.sendPost(body).subscribe((res : any) =>{
         //  console.log(res);
          if (res.ok) {
            Swal.fire({
              title:'Correcto',
              text: `Se a registrado correctamente ${this.formUsuario.value.nom_registro}`,
              icon: 'success',
              confirmButtonText: 'confirmar'
              
            })
  
                  // Se recarga para hacer una funcion
        this.getPadres();
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
          body.append('nom_registro',this.formUsuario1.value.nom_registro);
          body.append('id_registro',this.dataPadre.id_registro);
  
          this.RegistrosService.sendPostDocument(body).subscribe((res: any)=>{
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


     //////Eliminar Padre e hijos  /////
 padresHijos : any;
 deletePadre(){
   this.getpadreshijo();
 }
 
 // padres e hijos registroLegalService
 
 getpadreshijo(){
  this.RegistrosService.getpadreshijos(this.padre).subscribe((res : any)=>{
    this.padresHijos = res;
   //  console.log(this.padresHijos);
    for (let i = 0; i <= this.padresHijos.length; i++) {
      if(this.padresHijos[i]?.carp_registro == 1){
       //  console.log( i ,"Es padre");

        this.RegistrosService.deleteDocPadre(this.padre).subscribe((res : any)=>{
         //  console.log(res);              
        });

        this.RegistrosService.deletepadreshijos(this.padre).subscribe((res : any)=>{
          this.getPadres();
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
      if(this.padresHijos[i]?.carp_registro == 0){
       //  console.log( i ,"Es hijo");
        this.RegistrosService.deleteDocHijo(this.padresHijos[i]).subscribe((res : any)=>{
         //  console.log(res);              
        });
      }
      
      
     }
    
  });

 }


 //////Eliminar Padre e hijos  /////

 //Eliminar hijo 
 deletehijo(){
  this.RegistrosService.deleteDocHijo(this.padre).subscribe((res: any)=>{
   //  console.log(res);        
  });

  this.RegistrosService.deletehijos(this.padre).subscribe((res : any)=>{
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
        nom_registro : this.padre.nom_registro
      });
    }

    editarCampos(){
      //this.registroLegalService.editCampo(this.padre.id_registro, this.padre).
      let body ={'id_registro' : 0, 'nom_registro' : ''};
      body.id_registro = this.padre.id_registro;
      body.nom_registro = this.formUsuario11.value.nom_registro;
      this.RegistrosService.editCampo( body).subscribe((res: any) =>{
       //  console.log(res);
        if (res.ok) {
          Swal.fire({
            title:'Correcto',
            text: `Se a edito de forma correcta`,
            icon: 'success',
            confirmButtonText: 'confirmar'
            
          })

                // Se recarga para hacer una funcion
      this.getPadres();
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



    downPDFPagre =`${base}/registro_legal_descarga/`;
    downPDFHijo =`${base}/registro_legal_descarga_hijo/`;
    pdfSrc ='';

    getPdf(padre: any){
      this.pdfSrc ='';


      // this.pdfSrc=this.pdfSrc='http://3.19.235.131:3000/registro_legal_vistaPadre/';
      this.pdfSrc=this.pdfSrc= `${base}/registro_legal_vistaPadre/`;

     //  console.log();

      this.pdfSrc =this.pdfSrc+padre.dir_registro;
     //  console.log(padre.dir_registro);
    }



    getPdfHijo(hijo : any){
      
      this.viewPDF = true;
      this.tree=false;
      this.pdfSrc ='';

      // this.pdfSrc=this.pdfSrc='http://3.19.235.131:3000/registro_legal_hijos/';
      this.pdfSrc=this.pdfSrc= `${base}/registros_hijos/`;

      this.pdfSrc =this.pdfSrc+hijo.dir_registro;
     //  console.log(this.pdfSrc);
    }

    downDPFPadre(padre : any){
      this.pdfSrc ='';

      // this.pdfSrc=this.pdfSrc='http://3.19.235.131:3000/registro_legal_descarga/';      
      this.pdfSrc=this.pdfSrc= `${base}/registro_legal_descarga/`;
      

     //  console.log();

      this.pdfSrc =this.pdfSrc+padre.dir_registro;
     //  console.log(padre.dir_registro);
    }

    //clean modal
    cleanModal(){
      this.formUsuario.setValue({
        nom_registro : ''
      });
      this.formUsuario1.setValue({
        nom_registro : '',
        documento : ''
      });
    };


    

    permisosUsuario(){
      this.ViewPermisosService.getPermisos().subscribe((res: any)=>{
        this.usuarioLog=res[0];
       //  console.log(this.usuarioLog);
        
      });
    }


  ngOnInit(): void {
    this.permisosUsuario();
    this.getPadres();

  }

}
