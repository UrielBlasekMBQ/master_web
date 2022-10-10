import { MenuService } from './../../services/menu.service';
import { Component, OnInit } from '@angular/core';
import { ViewPermisosService } from 'src/app/services/view-permisos.service';
import  decode  from 'jwt-decode';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private ViewPermisosService : ViewPermisosService, private MenuService : MenuService) { }

  usuarioLog ={
  calidad: true,
  operacion: true,
  registros: true,
  marcoLegal: true,
  norma: true,
  marco: true,
  diagramas : true,
  foda : true,
  toruga : true,
  amef : true,
  amef_amef : true,
  efecto_fallo : true,
  acompanamiento : true,
  solicitaAcom : true,
  revisaAcom : true,
  controlDocumento: true,
  asigna: true,
  revisa: true,
  aprueba: true,
  proceso: true,
  usuarios: true,
  usuario: true,
  permiso: true,
  historial : true,
  configuracion : true
  };

  getPermisos(){
    this.ViewPermisosService.getPermisos().subscribe((res : any)=>{
      
      this.usuarioLog= res[0];
      console.log(this.usuarioLog);
      
    });
  }

  usuario : any;
  nombre: any;
  apellidos : any
  body ={'id_usuario' : 0};

  getUsuario(){
    const token: any = localStorage.getItem('token');
    this.usuario =decode(token);
    console.log(this.usuario);
    this.body.id_usuario=this.usuario.id_usuario;
    this.MenuService.getUsuario(this.body).subscribe((res: any)=>{
      this.usuario = res[0];
      console.log(res[0]);
      
    });
    
  }

    // Borrar token 
    salida(){
      console.log('limpieza');
      
      localStorage.setItem('token', '');
  
    }
  

  ngOnInit(): void {
    this.getPermisos();
    this.getUsuario();
   
  }
  

}
