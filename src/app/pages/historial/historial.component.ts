import { Component, OnInit } from '@angular/core';
import { HistorialService } from 'src/app/services/historial.service';
import { ProcesosService } from 'src/app/services/procesos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import  decode  from 'jwt-decode';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {


  constructor(private ProcesosService : ProcesosService, private UsuariosService : UsuariosService,
              private HistorialService: HistorialService) { }
  listProcesos : any;
  procesos = true;
  viewUsuarios= false;
  historial = false;
  listarUsuarios : any;
  proceso : any;
  listHistorial : any =[];
  p: number = 1;
    //Get procesos
    getProcesos(){
      this.ProcesosService.getProcesos().subscribe((res : any)=>{
        this.listProcesos = res;
      });
    }

      //Listar de Usuarios
  lisUsuarios(proceso : any){
    this.proceso = proceso;
    this.procesos=false;
    this.viewUsuarios=true;
   //  console.log(this.proceso.id_proceso);    
    this.UsuariosService.getUnUsuairio(this.proceso.id_proceso).subscribe(res=>{
      this.listarUsuarios = <any> res;
     //  console.log(res);      
    });
  }

  //Listado de historial
  getListadoHistorial(usuario : any){
    this.viewUsuarios=false;
    this.historial = true;
    this.HistorialService.getHistorial(usuario).subscribe((res : any)=>{
      this.listHistorial = res;
    });
  }

  // back usuarios
  backUsuarios(){
    this.historial = false;
    this.viewUsuarios = true;
  }

  backProcesos(){
    this.procesos = true;
    this.historial = false;
    this.viewUsuarios = false;

  }

  getPreceso(body : any){
    this.ProcesosService.getProcesosUsuario(body).subscribe((res)=>{
      this.listProcesos = res;
    });
   };

   tipoProceso : any;


  ngOnInit(): void {
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
