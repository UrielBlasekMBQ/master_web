import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContratosService } from 'src/app/services/contratos.service';
import  decode  from 'jwt-decode';
import Swal from 'sweetalert2';
import { environment } from './../../../environments/environment';
import { EmailService } from 'src/app/services/email.service';


const base = environment.api;


@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

  public formUsuario: FormGroup; 
  public formEtapas: FormGroup; 
  public formActividad: FormGroup; 

  constructor(private formBuilder: FormBuilder, private ContratosService: ContratosService, private EmailService : EmailService) {
    this.formUsuario= this.formBuilder.group({
      nom_compania: ['',[Validators.required]],
      horas: ['',[Validators.required]],
    });

    this.formEtapas= this.formBuilder.group({
      nom_etapa: ['',[Validators.required]],});

    this.formActividad= this.formBuilder.group({
      nom_actividad: ['',[Validators.required]],
      num_horas_actividad: ['',[Validators.required]],
      nom_doc: ['',[Validators.required]],
    });


   }

  p : number =1;
  p1 : number =1;

  fContrato = true;
  fEtapas = false;
  btnAddEtapa = false;
  btnEditEtapa = false;
  tipoProceso : any;

  tablaContratos = true;
  tablaEtapas = false;
  tablaActividades = false;
  tablaHistorial = false;

  listaContratos : any;
  //add contrato
  addCantrato (){
    let body ={'id_usuario' : this.tipoProceso.id_usuario,'nom_compania' : this.formUsuario.value.nom_compania, 'horas' : this.formUsuario.value.horas};
    console.log(body);
    
    this.ContratosService.addContratos(body).subscribe((res:any)=>{
      this.getUltinoContrato();
    });

  }

  //Get ultimo contrato
  ultimoContrato : any;
  getUltinoContrato(){
    this.ContratosService.getAllContratos().subscribe((res:any)=>{
      let contratos = res;
      console.log(contratos);
      
      let numero = res.length;
      this.ultimoContrato = contratos[numero -1];
      console.log(this.ultimoContrato);

      // update numero de etapas
      let body ={'id_contrato': this.ultimoContrato.id_contrato, 'numero':this.listEtapas.length };
      this.ContratosService.updateNumEtapas(body).subscribe((res :any)=>{
        console.log(res);
        
      });
            
      
      for (let i  = 0; i < this.listEtapas.length; i++) {
        let body1 ={'id_contrato' : this.ultimoContrato.id_contrato, 'nom_etapa':this.listEtapas[i].nom_etapa };

        this.ContratosService.addEtapa(body1).subscribe((res:any)=>{
          console.log(res);
          
        });
        
      }
            /////// Email //////

            let mensaje1a ='El usuario'+this.tipoProceso.nombre+' '+this.tipoProceso.apellidos +' agrego un contrato con el nombre de compañia: '+this.formUsuario.value.nom_compania;
  
            let body_email1 ={'email' : this.usuarioMBQ.email, 'nombre' : this.usuarioMBQ.nombre,
            'apellidos' : this.usuarioMBQ.apellidos, 'mensaje1' : mensaje1a, 'mensaje2' : ''};
        
            this.EmailService.sendData(body_email1).subscribe((res:any)=>{});
      
            /////// Email //////
      this.getContratos();
      this.formUsuario.reset();
      this.formEtapas.reset();
      this.listEtapas=[];
      this.mensajeAdd(res);


      
    });

  
  }

  activaFormEtapa (){
    this.fContrato = false;
    this.fEtapas = true;
    this.btnAddEtapa = true;
    this.btnEditEtapa = false;
  }


  /////// Modal Etapas /////
  listEtapas : any=[];
  idEtapa : any;



  // Cargar Form para editar
  cargaEtapa(i : any, etapa :any){
    this.fContrato = false;
    this.fEtapas = true;
    this.btnAddEtapa = false;
    this.btnEditEtapa = true;

    this.formEtapas.setValue({'nom_etapa' : etapa.nom_etapa });
    console.log(this.p1);
    
    if(this.p1 >1){
      if (i ==0) {
        i = (this.p1 -1) * (10);
        this.idEtapa = i;
        console.log('nuevo ',i );        
      }else{
        i = i + ((this.p1-1)*(10));
        this.idEtapa = i;
      }

    }else{
      this.idEtapa = i;
    }

    console.log(this.idEtapa);
    
  }

  //Editar Etapa
  editEtapa(){
    this.fContrato = true;
    this.fEtapas = false;
    
    this.btnAddEtapa = false;
    this.btnEditEtapa = false;

    this.listEtapas[this.idEtapa].nom_etapa= this.formEtapas.value.nom_etapa;
    this.formEtapas.reset();
  }

  // Eliminar una etapa
  deleteEtapa(i : any){
    console.log(i);
    this.listEtapas.splice(i,1);
    

  }
  /////// Modal Etapas /////

  addEtapas(){
    this.fContrato = true;
    this.fEtapas = false;
    let body = {'nom_etapa' : this.formEtapas.value.nom_etapa};
    this.listEtapas.push(body);

    this.formEtapas.reset();

  }

  
  // Get Contratos 
  listEtapasTabla : any;
  contrato : any
  getEtapas(contrato : any){

    this.tablaContratos = false;
    this.tablaEtapas = true;
    this.tablaActividades = false;

    this.contrato = contrato;
    let body = {'id_contrato': contrato.id_contrato};
    this.ContratosService.getEtapas(body).subscribe((res : any)=>{
      this.listEtapasTabla = res;
      console.log(this.listEtapasTabla);
      
    });

  }
 /////// Modal Etapas /////


  /////// Actividades /////
  listActividades : any;
  etapa : any;
  getActividades(etapa: any){

    this.tablaContratos = false;
    this.tablaEtapas = false;
    this.tablaActividades = true;

    this. etapa = etapa;
    let body ={'id_etapa_contrato' : this.etapa.id_etapa_contrato};
    this.ContratosService.getActividades(body).subscribe((res: any)=>{
      this.listActividades = res;
      console.log(res);
      
    });


  };

  //DesactivarAlerta
  desactivaAlerta(){
    this.alerta = false;
  }

  horasARestar : any;
  horasEtapa : any;
  alerta = false;
  addActividad(){
    if (this.formActividad.value.num_horas_actividad >this.contrato.num_horas_restantes) {
        console.log('Es mayor ');
      this.alerta = true;
        
    }else{
      this.alerta = false;
      this.horasARestar = this.formActividad.value.num_horas_actividad;
      this.horasEtapa = this.formActividad.value.num_horas_actividad; 


      const body = new FormData();
      body.append('myFile', this.archivos.fileRaw, this.archivos.fileName);
      body.append('id_etapa_contrato',this.etapa.id_etapa_contrato);
      body.append('id_contrato', this.contrato.id_contrato);
      body.append('nom_actividad', this.formActividad.value.nom_actividad);
      body.append('num_horas_actividad', this.formActividad.value.num_horas_actividad);

      this.ContratosService.addActividades(body).subscribe((res: any)=>{
        this.updateActividadesContrato();
        this.updateHorasEtapas();
        this.getActividades(this.etapa);
        this.updateHoras();
              ///////Email /////////////

      let mensaje1 ='Se actualizo el contrato de la compañia '+this.contrato.nom_compania +' en la etapa ' 
      +this.etapa.nom_etapa;

      let mensaje2 ='La actividad que se agrego es: '+this.formActividad.value.nom_actividad+' con un numero de horas de :'+this.formActividad.value.num_horas_actividad
      + '. Al contrato le quedan '+ this.contrato.num_horas_restantes +' horas restantes';

    let body_email ={'email' : this.tipoProceso.email, 'nombre' : this.tipoProceso.nombre,
                     'apellidos' : this.tipoProceso.apellidos, 'mensaje1' : mensaje1, 'mensaje2' : mensaje2};

    this.EmailService.sendData(body_email).subscribe((res:any)=>{});

    let mensaje1a ='El usuario'+this.tipoProceso.nombre+' '+this.tipoProceso.apellidos +' actualizo el contrato de la compañia '+this.contrato.nom_compania +' en la etapa ' 
    +this.etapa.nom_etapa;

    let body_email1 ={'email' : this.usuarioMBQ.email, 'nombre' : this.usuarioMBQ.nombre,
    'apellidos' : this.usuarioMBQ.apellidos, 'mensaje1' : mensaje1a, 'mensaje2' : mensaje2};

    this.EmailService.sendData(body_email1).subscribe((res:any)=>{});

      ///////Email /////////////
        this.updateActividadesEtapa();
        this.formActividad.reset();
        this.mensajeAdd(res);

      

        
      });
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



  //Update horas Contrato
  updateHoras(){
    
    let horas = this.contrato.num_horas_restantes - this.horasARestar;
    let body ={'id_contrato' : this.contrato.id_contrato, 'horas': horas};
    this.ContratosService.updateHoras(body).subscribe((res : any)=>{
      console.log(res);
      this.contrato.num_horas_restantes = horas;
      this.getContratos();
      
    });

  }

    //Update horas Etapas
    updateHorasEtapas(){
      let horas = this.etapa.num_horas_etapa + this.horasEtapa;
      
      let body ={'id_etapa_contrato' : this.etapa.id_etapa_contrato, 'horas': horas};
      this.ContratosService.updateHorasEtapas(body).subscribe((res : any)=>{
        console.log(res);
        this.etapa.num_horas_etapa = horas;
        this.getEtapas(this.contrato);
        
      });
  
    }

  //Update Actividades etapa
  updateActividadesEtapa(){
    let num_actividades = this.etapa.num_actividades +1;
    this.etapa.num_actividades =num_actividades;
    console.log(num_actividades);
    
    let body ={'id_etapa_contrato' : this.etapa.id_etapa_contrato, 'num_actividades' :num_actividades };
    this.ContratosService.updateNumActividadesEtapas(body).subscribe((res:any)=>{
      this.getEtapas(this.contrato);
      this.backActividades();
      console.log(res);
      
    });
  }

    //Update Actividades contrato
    updateActividadesContrato(){
      let num_actividades = this.contrato.num_actividades +1;
      this.contrato.num_actividades =num_actividades;
      console.log(num_actividades);
      
      let body ={'id_contrato' : this.contrato.id_contrato, 'num_actividades' :num_actividades };
      this.ContratosService.updateNumActividadesContrato(body).subscribe((res:any)=>{
        console.log(res);
        
      });
      this.ContratosService.updateNumActividadesEtapas(body).subscribe((res:any)=>{
        this.getEtapas(this.contrato);
        console.log(res);
        
      });
    }

    usuarioMBQ : any;
  /////// Actividades /////
  getUsuarioBBM(){
    let body ={'id_proceso' : 1};
    this.ContratosService.getUsuarioMBQ(body).subscribe((res:any)=>{
      this.usuarioMBQ = res[0];
      console.log(res[0]);
      
    });
  }




  /////////HISTORIAL /////
  listHistorialActividad : any
  
    getHistorialActividades(contrato : any){
      this.contrato = contrato;
      this.tablaHistorial = true;
      this.tablaContratos = false;
      let body ={'id_contrato': contrato.id_contrato };
      this.ContratosService.getHistorialActividades(body).subscribe((res:any)=>{
        this.listHistorialActividad = res;
        console.log(res);
        
      });
    }
  /////////HISTORIAL /////

  ////// Navegacion //////
  
    backEtapas(){
      this.tablaContratos = false;
      this.tablaEtapas = true;
      this.tablaActividades = false;
    }

    backContratos(){
      this.tablaContratos = true;
      this.tablaEtapas = false;
      this.tablaActividades = false;
      this.tablaHistorial = false;
    }

    backActividades(){
      this.tablaContratos = false;
      this.tablaEtapas = false;
      this.tablaActividades = true;
    }

    downPDF =`${base}/contratos/`;



  ////// Navegacion //////




  getContratos(){
    let body ={'id_usuario' : this.tipoProceso.id_usuario};
    this.ContratosService.getContratosUsuario(body).subscribe((res:any)=>{
      this.listaContratos = res;
    });
  }

  ngOnInit(): void {
    const token: any = localStorage.getItem('token');
    this.tipoProceso =decode(token);
    
    this.getContratos();
    this.getUsuarioBBM();

    //Get contratos
    
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
        title:'Correcto',
        text: `Se agrego correctamente`,
        icon: 'success',
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

}
