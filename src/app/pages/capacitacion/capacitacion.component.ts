import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProcesosService } from 'src/app/services/procesos.service';
import Swal from 'sweetalert2';
import { ViewPermisosService } from 'src/app/services/view-permisos.service';
import  decode  from 'jwt-decode';
import { environment } from './../../../environments/environment';
import { CapacitacionService } from 'src/app/services/capacitacion.service';


const base = environment.api;


@Component({
  selector: 'app-capacitacion',
  templateUrl: './capacitacion.component.html',
  styleUrls: ['./capacitacion.component.css']
})



export class CapacitacionComponent implements OnInit {

  public departamento : any;

tree : boolean = false;
vistaDepa : boolean =true;
viewPDF = false;
viewHistoria = false;
p: number = 1;



public documento : any ;



public formUsuario: FormGroup;
public formUsuario1: FormGroup;
public formUsuario11: FormGroup

  constructor(private ProcesosService : ProcesosService, private FormBuilder: FormBuilder, private CapacitacionService : CapacitacionService,
    private ViewPermisosService: ViewPermisosService) { 

      this.formUsuario= this.FormBuilder.group({
        nom_capacitacion : ['',[Validators.required]]
      });
  
      this.formUsuario1= this.FormBuilder.group({
        nom_capacitacion : ['',[Validators.required]],
        documento: ['',[Validators.required]],
      });
  
      this.formUsuario11= this.FormBuilder.group({
        nom_capacitacion : ['',[Validators.required]],
      });

    }

    listProcesos: any;
    listPadres: any;
    listHijos: any;
    proceso : any;

    backTree(){
      this.viewHistoria = false;
      this.tree =true;
      this.vistaDepa =false;
      this.viewPDF =false;
    }

    backProcesos(){
      this.viewHistoria = false;
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
    this.CapacitacionService.getPadres(departamento.id_proceso).subscribe(res=>{
      this.listPadres= <any> res;
     //  console.log(this.listPadres);
      
    });

   }
   
   dataPadre: any;
   //Get Hijos
  getHola(padre: any){
   this.dataPadre=padre;
   padre.id_capacitacion;
  //  console.log(padre);
   this.listHijos=[];
    for(let i = 0; i < this.listPadres.length; i++ ){
     
        if (this.listPadres[i].id_capacitacion == padre.id_capacitacion ) {

          this.listPadres[i].id_vista=true;
          this.CapacitacionService.getHijos(padre).subscribe(res=>{
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

     let body ={'id_proceso' : 0, 'nom_capacitacion' : ''};

     body.id_proceso =this.proceso.id_proceso;
     body.nom_capacitacion =this.formUsuario.value.nom_capacitacion;     

     
 
     this.CapacitacionService.sendPost(body).subscribe((res : any) =>{
      //  console.log(res);
       if (res.ok) {
         Swal.fire({
           title:'Correcto',
           text: `Se ha registrado correctamente ${this.formUsuario.value.nom_capacitacion}`,
           icon: 'success',
           confirmButtonText: 'confirmar'
           
         })

               // Se recarga para hacer una funcion
     this.getPadres(this.proceso);
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

    //Enviar Documentos
    sendDatosDocument(){
      const body = new FormData();
      body.append('myFile', this.archivos.fileRaw, this.archivos.fileName);
      body.append('id_proceso',this.proceso.id_proceso);
      body.append('nom_capacitacion',this.formUsuario1.value.nom_capacitacion);
      body.append('id_capacitacion',this.dataPadre.id_capacitacion);

      this.CapacitacionService.sendPostDocument(body).subscribe((res: any)=>{
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

// padres e hijos CapacitacionService

getpadreshijo(){
this.CapacitacionService.getpadreshijos(this.padre).subscribe((res : any)=>{
  this.padresHijos = res;
 //  console.log(this.padresHijos);
  for (let i = 0; i <= this.padresHijos.length; i++) {
    if(this.padresHijos[i]?.carp_capacitacion == 1){
     //  console.log( i ,"Es padre");

      this.CapacitacionService.deleteDocPadre(this.padre).subscribe((res : any)=>{
       //  console.log(res);              
      });

      this.CapacitacionService.deletepadreshijos(this.padre).subscribe((res : any)=>{
        this.CapacitacionService.deleteCapacitacion(this.padre).subscribe((res:any)=>{});
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
    if(this.padresHijos[i]?.carp_capacitacion == 0){
     //  console.log( i ,"Es hijo");
      this.CapacitacionService.deleteDocHijo(this.padresHijos[i]).subscribe((res : any)=>{
       //  console.log(res);              
      });
    }
    
    
   }
  
});

}


//////Eliminar Padre e hijos  /////

//Eliminar hijo 
deletehijo(){
  console.log(this.padre);
  this.CapacitacionService.deleteCapacitacion(this.padre).subscribe((res : any)=>{});
  
this.CapacitacionService.deleteDocHijo(this.padre).subscribe((res: any)=>{
 //  console.log(res);        
});

this.CapacitacionService.deletehijos(this.padre).subscribe((res : any)=>{
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
        nom_capacitacion : this.padre.nom_capacitacion
      });
    }

    editarCampos(){
      //this.CapacitacionService.editCampo(this.padre.id_capacitacion, this.padre).
      this.CapacitacionService.editCampo(this.padre.id_capacitacion, this.formUsuario11.value).subscribe((res: any) =>{
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

    

  // downPDFPagre ='http://3.19.235.131:3000/capacitacion_legal_descarga/';
  // downPDFHijo ='http://3.19.235.131:3000/capacitacion_legal_descarga_hijo/';

  downPDFPagre = `${base}/capacitacion_legal_descarga/`;
  downPDFHijo = `${base}/capacitacion_legal_descarga_hijo/`;
  pdfSrc ='';

  getPdf(padre: any){
    this.pdfSrc ='';

    this.tree =false;
    this.vistaDepa =false;
    this.viewPDF =true;

    // this.pdfSrc=this.pdfSrc='http://3.19.235.131:3000/capacitacion_legal_vistaPadre/';
    this.pdfSrc=this.pdfSrc = `${base}/capacitacion_legal_vistaPadre/`;
    

   //  console.log();

    this.pdfSrc =this.pdfSrc+padre.dir_capacitacion;
   //  console.log(padre.dir_capacitacion);
  }

  dataHistorial : any;

  getPdfHijo(hijo : any){
    this.dataHistorial = hijo;
    this.pdfSrc ='';
    this.tree =false;
    this.vistaDepa =false;
    this.viewPDF =true;
    this.addviewHistorial();

    // this.pdfSrc=this.pdfSrc='http://3.19.235.131:3000/capacitacion_legal_hijos/';
    this.pdfSrc=this.pdfSrc = `${base}/capacitacion_legal_hijos/`;

   //  console.log();

    this.pdfSrc =this.pdfSrc+hijo.dir_capacitacion;
   //  console.log(hijo.dir_capacitacion);
  }

  downDPFPadre(padre : any){
    this.pdfSrc ='';
    this.tree =false;
    this.vistaDepa =false;
    this.viewPDF =true;

    // this.pdfSrc=this.pdfSrc='http://3.19.235.131:3000/capacitacion_legal_descarga/';
    this.pdfSrc=this.pdfSrc = `${base}/capacitacion_legal_descarga/`;

   //  console.log();

    this.pdfSrc =this.pdfSrc+padre.dir_capacitacion;
   //  console.log(padre.dir_capacitacion);
  }

  //clean modal
  cleanModal(){
    this.formUsuario.setValue({
      nom_capacitacion : ''
    });
    this.formUsuario1.setValue({
      nom_capacitacion : '',
      documento : ''
    });
  };

  usuarioLog : any;

  permisosUsuario(){
    this.ViewPermisosService.getPermisos().subscribe((res: any)=>{
      this.usuarioLog=res[0];
     //  console.log(this.usuarioLog);
      
    });
  }

  getPreceso(body : any){
    this.ProcesosService.getProcesosUsuario(body).subscribe((res)=>{
      this.listProcesos = res;
    });
   };
  
  tipoProceso : any;


  //////////// Historial //////////////
  listaHistorial : any;

  addviewHistorial(){    
    const fecha = new Date();
    let body = {'id_capacitacion' : this.dataHistorial.id_capacitacion, 'id_usuario'  : this.tipoProceso.id_usuario, 'fecha_actual' : fecha};

    this.CapacitacionService.sendDataHistorial(body).subscribe((res:any)=>{
      console.log(res);
      
    });
    
  }

  viewHistorial(hijo : any){
    this.listaHistorial=[];
    this.viewHistoria = true;
    this.tree= false;
    let body ={'id_capacitacion' : hijo.id_capacitacion};
    this.CapacitacionService.viewDataHistorial(body).subscribe((res:any)=>{
      this.listaHistorial= res;
    });
  }

  //////////// Historial //////////////


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
