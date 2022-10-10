import { Proceso } from './../../services/procesos.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProcesosService } from 'src/app/services/procesos.service';
import { Router } from '@angular/router';
import { ViewPermisosService } from 'src/app/services/view-permisos.service';
import  decode  from 'jwt-decode';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {
  
  public formUsuario: FormGroup;
  
  public formUsuario1: FormGroup;

  listProcesos?: Proceso[];


  

  public viewDepartamento: boolean =true;
  public viewDataDepartamento: boolean =false;

  public departamento : any ;
  dataDepartamento(departamento: any){

    this.viewDepartamento = false;
    this.viewDataDepartamento = true;

    this.departamento = departamento;
    this.formUsuario.setValue({
      departamento : departamento.departamento,
      direccion : departamento.direccion,
      descripcion : departamento.descripcion
    });
   //  console.log(this.formUsuario.value);
  }

  backDepartamento(){
    this.viewDepartamento = true;
    this.viewDataDepartamento = false;
  }


  
  constructor(private ProcesosService: ProcesosService ,private formBuilder: FormBuilder, public router: Router, private ViewPermisosService :ViewPermisosService) { 
    this.formUsuario= this.formBuilder.group({
      departamento: ['',[Validators.required]],
      direccion: ['',[Validators.required]],
      descripcion: ['',[Validators.required]],
    });

    this.formUsuario1= this.formBuilder.group({
      departamento: ['',[Validators.required]],
      direccion: ['',[Validators.required]],
      descripcion: ['',[Validators.required]],
    });


  }
  //Listar procesos
  listProceso(){
    this.ProcesosService.getProcesos().subscribe(res =>{
      this.listProcesos =<any> res;
     //  console.log(res);
      
    });
  }

  //agregar proceso
  addDepartamento(){
    this.ProcesosService.addProceso(this.formUsuario1.value).subscribe(res=>{
     //  console.log('Se agreco con exito');
     this.mensajeAdd(res);
      this.listProceso();
      this.formUsuario1.reset();
      
    });
  }

  // Actualizar procesos
  updateProceso(){
    
   //  console.log(this.departamento.id_proceso);

    this.ProcesosService.updateProceso(this.departamento.id_proceso, this.formUsuario.value).subscribe(res=>{
      //this.updateProceso =<any> res;
     //  console.log('Se actualizo el Proceso');
     this.mensajeUpdate(res);
      this.listProceso();
      this.backDepartamento();
    });
  }

  usuarioLog ={
    procesoAdd: true,
    procesoUpdate: true
  }

  permisoUsuario(){
    this.ViewPermisosService.getPermisos().subscribe((res : any)=>{
      this.usuarioLog=res[0];
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
    this.listProceso();
      /// Procesos ///
      const token: any = localStorage.getItem('token');
      this.tipoProceso =decode(token);
     //  console.log(this.tipoProceso);
      if(this.tipoProceso.tipoUsuario == 0){
       //  console.log('procesos 1');
        
        this.listProceso();
      } else{
        let body ={'id_usuario' : this.tipoProceso.id_usuario};
        this.getPreceso(body);
        
       //  console.log('Procesos 2');
        
      }
      /// Procesos ///
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

}
