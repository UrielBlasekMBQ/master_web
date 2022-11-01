import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MultiProcesoService } from 'src/app/services/multi-proceso.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})


export class ConfiguracionComponent implements OnInit {

  public formUsuario: FormGroup;
  public formContrato: FormGroup;

  constructor(private formBuilder: FormBuilder, private  MultiProcesoService : MultiProcesoService) { 
    this.formUsuario= this.formBuilder.group({
      multi_proceso: ['',[Validators.required]]
    });

    this.formContrato= this.formBuilder.group({
      contrato_estatus: ['',[Validators.required]]
    });

  }

  updateMultiProceso(){
    let valor = this.formUsuario.value.multi_proceso;
    if (valor == true) {
      valor = 1;
    }else { valor = 0}    
    console.log(valor);
    
    let body ={ 'multi_proceso' : valor};
    this.MultiProcesoService.updateMultiProceso(body).subscribe((res:any)=>{
      console.log(res);
      if (res.ok) {
        Swal.fire({
          title:'Correcto',
          text: `Se actualizo correctamente`,
          icon: 'success',
          confirmButtonText: 'confirmar'
          
          
        })

              // Se recarga para hacer una funcion
              this.initFormulario();
              window.location.reload();
      } else {
        Swal.fire({
          title:'Error',
          text: `Eroro de registro: '${res.msg}' `,
          icon: 'error',
          confirmButtonText: 'confirmar'
        })
      }
      

    });
  }

  initFormulario(){
    this.MultiProcesoService.getMultiProceso().subscribe((res : any)=>{

      let valor = res[0].multi_proceso;
      console.log(valor);
      if (valor == 1) {
        valor = true;
      }else { valor = false}      
      this.formUsuario.setValue({
        multi_proceso : valor
      });

    });

  }


  updateContratos(){
    let valor = this.formContrato.value.contrato_estatus;
    if (valor == true) {
      valor = 1;
    }else { valor = 0}    
    console.log(valor);
    
    let body ={ 'contrato_estatus' : valor};
    this.MultiProcesoService.updatePermisoContrato(body).subscribe((res:any)=>{
      console.log(res);
      if (res.ok) {
        Swal.fire({
          title:'Correcto',
          text: `Se actualizo correctamente`,
          icon: 'success',
          confirmButtonText: 'confirmar'
          
          
        })

              // Se recarga para hacer una funcion
              this.initFormularioContrato();
              window.location.reload();
      } else {
        Swal.fire({
          title:'Error',
          text: `Eroro de registro: '${res.msg}' `,
          icon: 'error',
          confirmButtonText: 'confirmar'
        })
      }
      

    });
  }

  initFormularioContrato(){
    this.MultiProcesoService.getPermisoContrato().subscribe((res : any)=>{

      let valor = res[0].contrato_estatus;
      console.log(valor);
      if (valor == 1) {
        valor = true;
      }else { valor = false}      
      this.formContrato.setValue({
        contrato_estatus : valor
      });

    });

  }






  ngOnInit(): void {
    this.initFormulario();
    this.initFormularioContrato();
  }

}
