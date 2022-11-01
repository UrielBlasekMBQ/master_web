
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
  public formCarpetaHijo: FormGroup;
  public formUsuario1: FormGroup;
  public formUsuario11: FormGroup;
  constructor( private FormBuilder :FormBuilder, private RegistrosService : RegistrosService, private ViewPermisosService : ViewPermisosService) {

    this.formUsuario= this.FormBuilder.group({
      nom_registro : ['',[Validators.required]]
    });

    this.formCarpetaHijo= this.FormBuilder.group({
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
  listHijos0: any;
  listHijos1 : any;
  listHijos2 : any;
  listHijos3 : any;
  listHijos4 : any;
  listHijos5 : any;
  listHijos6 : any;
  listHijos7 : any;
  listHijos8 : any;
  listHijos9 : any;
  listHijos10 : any;

  usuarioLog :any;
  viewPDF=false;
  tree = true;

  nivel_carpeta : any;
  id_padre : any ;


  changeNivel2(padre : any){
  this.nivel_carpeta = 2;
  this.dataPadre = padre;
  this.id_padre = padre.id_registro ;
  
  console.log(this.nivel_carpeta, this.id_padre);
  this.getHola(padre);

  }

  changeNivel3(padre : any){
    this.nivel_carpeta = 3;
    this.dataPadre = padre;
    this.id_padre = padre.id_registro ;
    console.log(this.nivel_carpeta, this.id_padre);
    this.getNivelTres(padre);
    }

  changeNivel4(padre : any){

    this.nivel_carpeta = 4;
    this.dataPadre = padre;
    this.id_padre = padre.id_registro ;
    console.log(this.nivel_carpeta, this.id_padre);
    this.getNivelCuatro(padre);
    }

  changeNivel5(padre : any){
    this.nivel_carpeta = 5;
    this.dataPadre = padre;
    this.id_padre = padre.id_registro ;
    console.log(this.nivel_carpeta, this.id_padre);
    this.getNivelQuinto(padre);
    }

  changeNivel6(padre : any){
    this.nivel_carpeta = 6;
    this.dataPadre = padre;
    this.id_padre = padre.id_registro ;
    console.log(this.nivel_carpeta, this.id_padre);
    this.getNivelSexto(padre);
    }

  changeNivel7(padre : any){
    this.nivel_carpeta = 7;
    this.dataPadre = padre;
    this.id_padre = padre.id_registro ;
    console.log(this.nivel_carpeta, this.id_padre);
    this.getNivelSeptimo(padre);
    }

  changeNivel8(padre : any){
    this.nivel_carpeta = 8;
    this.dataPadre = padre;
    this.id_padre = padre.id_registro ;
    console.log(this.nivel_carpeta, this.id_padre);
    this.getNivelOctavo(padre);
    }

  changeNivel9(padre : any){
    this.nivel_carpeta = 9;
    this.dataPadre = padre;
    this.id_padre = padre.id_registro ;
    console.log(this.nivel_carpeta, this.id_padre);
    this.getNivelNoveno(padre);
    }

  changeNivel10(padre : any){
    this.nivel_carpeta = 10;
    this.dataPadre = padre;
    this.id_padre = padre.id_registro ;
    console.log(this.nivel_carpeta, this.id_padre);
    this.getNivelDiez(padre);
    }

    getCarpetas(){
      switch (this.nivel_carpeta) {
        case 1:
          this.getPadres();
          break;
        
        case 2:
        this.getHola(this.dataPadre);
          break;
          
        case 3:
          this.getNivelTres(this.dataPadre);
        break;       

        case 4:
        this.getNivelCuatro(this.dataPadre);
        break; 

        case 5:
        this.getNivelQuinto(this.dataPadre);
        break; 

        case 6:
        this.getNivelSexto(this.dataPadre);
        break; 

        case 7:
        this.getNivelSeptimo(this.dataPadre);
        break; 

        case 8:
        this.getNivelOctavo(this.dataPadre);
        break; 

        case 9:
        this.getNivelNoveno(this.dataPadre);
        break; 

        case 10:
        this.getNivelDiez(this.dataPadre);
        break; 

        case 11:
          this.getNivelDiez(this.dataPadre);
          break;
      
        default:
          break;
      }
    }
      

      //Enviar Documentos
      sendDatos(){

        let body ={ 'nom_registro' : this.formUsuario.value.nom_registro,
                    'nivel_carpeta' : this.nivel_carpeta,
                    'carp_padre' : this.id_padre};
        console.log(body);
        
        this.RegistrosService.sendPost(body).subscribe((res : any) =>{
          console.log(res);
          this.mensajeAdd(res);
          this.formUsuario.reset();
          this.getCarpetas();

          
        });
      
      }


     //Get Hijos
     getHola(padre: any){
      console.log(padre);
      
      this.dataPadre=padre;
      padre.id_registro;
     //  console.log(padre);
      this.listHijos0=[];
       for(let i = 0; i < this.listPadres.length; i++ ){
        
           if (this.listPadres[i].id_registro == padre.id_registro ) {
  
             this.listPadres[i].id_vista=true;
             this.RegistrosService.getHijos(padre).subscribe(res=>{
                this.listHijos0 = <any> res;
                this.validaEliminacion(this.listHijos0);

               //  console.log(this.listHijos);
             });
          }else{
             this.listPadres[i].id_vista=false;;
         }
        
       }
     }
      //Get Hijos
      getNivelTres(padre: any){
        console.log(padre);
        this.dataPadre=padre;
        padre.id_registro;
        //  console.log(padre);
        this.listHijos1=[];
         for(let i = 0; i < this.listHijos0.length; i++ ){
          
             if (this.listHijos0[i].id_registro == padre.id_registro ) {
    
               this.listHijos0[i].id_vista=true;
               this.RegistrosService.getHijos(padre).subscribe(res=>{
                  this.listHijos1 = <any> res;
                  this.validaEliminacion(this.listHijos1);
                 //  console.log(this.listHijos);
               });
            }else{
               this.listHijos0[i].id_vista=false;;
           }
          
         }
        }

              //Get Hijos
      getNivelCuatro(padre: any){
        console.log(padre);
        this.dataPadre=padre;
        padre.id_registro;
        //  console.log(padre);
        this.listHijos2=[];
         for(let i = 0; i < this.listHijos1.length; i++ ){
          
             if (this.listHijos1[i].id_registro == padre.id_registro ) {
    
               this.listHijos1[i].id_vista=true;
               this.RegistrosService.getHijos(padre).subscribe(res=>{
                  this.listHijos2 = <any> res;
                  this.validaEliminacion(this.listHijos2);
                 //  console.log(this.listHijos);
               });
            }else{
               this.listHijos1[i].id_vista=false;;
           }
          
         }
        }

      //Get Hijos
      getNivelQuinto(padre: any){
        console.log(padre);
        this.dataPadre=padre;
        padre.id_registro;
        //  console.log(padre);
        this.listHijos3=[];
          for(let i = 0; i < this.listHijos2.length; i++ ){
          
              if (this.listHijos2[i].id_registro == padre.id_registro ) {
    
                this.listHijos2[i].id_vista=true;
                this.RegistrosService.getHijos(padre).subscribe(res=>{
                  this.listHijos3 = <any> res;
                  this.validaEliminacion(this.listHijos3);
                  //  console.log(this.listHijos);
                });
            }else{
                this.listHijos2[i].id_vista=false;;
            }
          
          }

        }       
        
        
      //Get Hijos
      getNivelSexto(padre: any){
        console.log(padre);
        this.dataPadre=padre;
        padre.id_registro;
        //  console.log(padre);
        this.listHijos4=[];
          for(let i = 0; i < this.listHijos3.length; i++ ){
          
              if (this.listHijos3[i].id_registro == padre.id_registro ) {
    
                this.listHijos3[i].id_vista=true;
                this.RegistrosService.getHijos(padre).subscribe(res=>{
                  this.listHijos4 = <any> res;
                  this.validaEliminacion(this.listHijos4);
                  //  console.log(this.listHijos);
                });
            }else{
                this.listHijos3[i].id_vista=false;;
            }
          
          }

        }   
        
      //Get Hijos
      getNivelSeptimo(padre: any){
        console.log(padre);
        this.dataPadre=padre;
        padre.id_registro;
        //  console.log(padre);
        this.listHijos5=[];
          for(let i = 0; i < this.listHijos4.length; i++ ){
          
              if (this.listHijos4[i].id_registro == padre.id_registro ) {

                this.listHijos4[i].id_vista=true;
                this.RegistrosService.getHijos(padre).subscribe(res=>{
                  this.listHijos5 = <any> res;
                  this.validaEliminacion(this.listHijos5);
                  //  console.log(this.listHijos);
                });
            }else{
                this.listHijos4[i].id_vista=false;;
            }
          
          }

        } 

      //Get Hijos
      getNivelOctavo(padre: any){
        console.log(padre);
        this.dataPadre=padre;
        padre.id_registro;
        //  console.log(padre);
        this.listHijos6=[];
          for(let i = 0; i < this.listHijos5.length; i++ ){
          
              if (this.listHijos5[i].id_registro == padre.id_registro ) {

                this.listHijos5[i].id_vista=true;
                this.RegistrosService.getHijos(padre).subscribe(res=>{
                  this.listHijos6 = <any> res;
                  this.validaEliminacion(this.listHijos6);
                  //  console.log(this.listHijos);
                });
            }else{
                this.listHijos5[i].id_vista=false;;
            }
          
          }

        } 

      //Get Hijos
      getNivelNoveno(padre: any){
        console.log(padre);
        this.dataPadre=padre;
        padre.id_registro;
        //  console.log(padre);
        this.listHijos7=[];
          for(let i = 0; i < this.listHijos6.length; i++ ){
          
              if (this.listHijos6[i].id_registro == padre.id_registro ) {

                this.listHijos6[i].id_vista=true;
                this.RegistrosService.getHijos(padre).subscribe(res=>{
                  this.listHijos7 = <any> res;
                  this.validaEliminacion(this.listHijos7);
                  //  console.log(this.listHijos);
                });
            }else{
                this.listHijos6[i].id_vista=false;
            }
          
          }

        } 

      //Get Hijos
      getNivelDiez(padre: any){
        console.log(padre);
        this.dataPadre=padre;
        padre.id_registro;
        //  console.log(padre);
        this.listHijos8=[];
          for(let i = 0; i < this.listHijos7.length; i++ ){
          
              if (this.listHijos7[i].id_registro == padre.id_registro ) {

                this.listHijos7[i].id_vista=true;
                this.RegistrosService.getHijos(padre).subscribe(res=>{
                  this.listHijos8 = <any> res;
                  this.validaEliminacion(this.listHijos8);
                  //  console.log(this.listHijos);
                });
            }else{
                this.listHijos7[i].id_vista=false;
            }
          
          }

        } 


    dataPadre: any;
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


     //Get Padres
     getPadres(){
      this.RegistrosService.getPadres().subscribe((res: any)=>{
        this.listPadres= res;
       //  console.log(this.listPadres);
        
      });
  
     }
    
  

    //Enviar Documentos
    sendDatosDocument(){
      const body = new FormData();
      body.append('myFile', this.archivos.fileRaw, this.archivos.fileName);
      body.append('nom_registro',this.formUsuario1.value.nom_registro);
      body.append('file_registro',this.dataPadre.id_registro);
      body.append('nivel_carpeta',this.nivel_carpeta);
      body.append('carp_padre',this.id_padre);

      this.RegistrosService.sendPostDocument(body).subscribe((res: any)=>{
        //  console.log(res);
                //Se recarga para hacer una funcion
                //this.getHola(this.dataPadre);
                this.mensajeAdd(res);
                this.formUsuario1.reset();
                this.getCarpetas();
        
      });
      
    }

    validaEliminacion(datos : any){
      if(datos.length == 0){
        this.siElimina = true;
        console.log('No tiene registros');
      }else{
        this.siElimina = false;
        console.log('Si tiene registros');
      }
    }


    siElimina = false

    validarArrayBacio(padre : any){
      this.padre = padre;
      this.siElimina = false;
      console.log(padre);
      this.nivel_carpeta = padre.nivel_carpeta;
      this.dataPadre = padre;

      if(padre.carp_registro){
        
        console.log('no');
        
        switch (padre.nivel_carpeta) {
          case 1:
          this.getHola(padre);

          break;
          
          case 2:
            console.log(2);
            this.getNivelTres(padre);
            break;
            
          case 3:
            this.getNivelCuatro(padre);
          break;       
  
          case 4:
          this.getNivelQuinto(padre);
          break; 
  
          case 5:
            this.getNivelSexto(padre);
          break; 
  
          case 6:
          this.getNivelSeptimo(padre);
          break; 
  
          case 7:
          this.getNivelOctavo(padre);
          break; 
  
          case 8:
          this.getNivelNoveno(padre);
          break; 
  
          case 9:
            console.log(9);
            
          this.getNivelDiez(padre);
          break; 
  
        //   case 10:
        //   this.getNivelDiez(this.dataPadre);
        //   break; 
  
        //   case 11:
        //     this.getNivelDiez(this.dataPadre);
        //     break;
        
          default:
            break;
        }

      }else{
        console.log('si');
        this.siElimina = true;
      }
      

    }








    backTree(){
      this.viewPDF = false;
      this.tree=true;
    }

    public padre : any;
    extraerPadre(padre : any){
      this.cleanModal();
      this.dataPadre = padre;    
      
     //  console.log(this.padre);
      
    }


     //////Eliminar Padre e hijos  /////
 padresHijos : any;
 deletePadre(){
  console.log(this.dataPadre);
  
  this.RegistrosService.deleteDocHijo(this.dataPadre).subscribe((res:any)=>{});
  this.RegistrosService.deletepadreshijos(this.dataPadre).subscribe((res:any)=>{
    this.mensajeDelete(res);
    this.getCarpetas();
  });
 }
 
 // padres e hijos registroLegalService
 

 //////Eliminar Padre e hijos  /////





    cargarModalEdit(padre : any){
      this.padre = padre;
      this.dataPadre = padre;
      this.nivel_carpeta = this.padre.nivel_carpeta;
       console.log(this.padre);
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
       this.mensajeUpdate(res);
       this.getCarpetas();

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
      this.nivel_carpeta = 1;
      this.id_padre =0;
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
        text: `Se Elimino correctamente`,
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

}
