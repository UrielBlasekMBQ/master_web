import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
import {filter} from 'rxjs/operators';
import  decode  from 'jwt-decode';
import { HistorialService } from './services/historial.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'master_web';

  currentRoute: string;
  tipoProceso : any;
  listHistorial : any=[];

  constructor(private router: Router, private HistorialService : HistorialService) {
    this.currentRoute = "Demo";
    this.router.events.subscribe((event: Event) => {

        if (event instanceof NavigationEnd) {
            this.currentRoute = event.url;
              console.log(event);
              let modulo =this.separar(event.url);
              //console.log(modulo);
              
              const fecha = new Date();

              const token: any = localStorage.getItem('token');
              this.tipoProceso =decode(token);

              let body ={
                'id_usuario': this.tipoProceso.id_usuario,                
                'modulo_acceso' : modulo,
                'fecha_actual' : fecha
              };
              console.log(body);
              this.HistorialService.addHistorial(body).subscribe((res:any)=>{
                console.log(res);
                
              });
              
        }


    });

    

}
separar(text: any){
  let texto = text;
  let name = texto.split('/');

  return name[2];
 }

  
}
