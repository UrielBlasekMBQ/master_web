import { MenuService } from './../../services/menu.service';
import { Component, OnInit } from '@angular/core';
import  decode  from 'jwt-decode';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private MenuService : MenuService) { }

  usuario : any;
  nombre: any;
  apellidos : any;
  body ={'id_usuario' : 0};
  

  getUsuario(){
    const token: any = localStorage.getItem('token');
    this.usuario =decode(token);
    //console.log(this.usuario);
    this.body.id_usuario=this.usuario.id_usuario;
    this.MenuService.getUsuario(this.body).subscribe((res: any)=>{
      this.usuario = res[0];
      //console.log(res[0]);
      
    });
  }

  // Borrar token 
  salida(){
    //console.log('limpieza');
    
    localStorage.setItem('token', '');

  }


  ngOnInit(): void {
    this.getUsuario();
  }

}
