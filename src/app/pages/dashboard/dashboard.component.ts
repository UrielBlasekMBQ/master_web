import { EmailService } from './../../services/email.service';
import { Component, OnInit } from '@angular/core';
import  decode  from 'jwt-decode';
import { DashboardService } from 'src/app/services/dashboard.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  constructor(private DashboardService: DashboardService, private EmailService : EmailService) { }

  listAcompanamiento : any;
  listAprueba : any;
  listRevisa : any;
  listAmef : any;
  list : any;
  body ={ 'id_usuario' : 0 };
  usuario : any;

  numAcompana : any;
  numAprueba : any;
  numRevisa : any;
  numAmef : any;

  //get acompañamiento
  getAcompanamiento(){
    const token: any = localStorage.getItem('token');
    this.usuario =decode(token);
   //  console.log(this.usuario);

    this.body.id_usuario = this.usuario.id_usuario;

    this.DashboardService.getAcompanamiento(this.body).subscribe((res:any)=>{
      this.listAcompanamiento = res;
     //  console.log(this.listAcompanamiento);
      this.numAcompana = this.listAcompanamiento.length;
     //  console.log(this.numAcompana);
      
      
    });
  }

    //get aprueba
    getDocAprueba(){
      const token: any = localStorage.getItem('token');
      this.usuario =decode(token);
     //  console.log(this.usuario);
  
      this.body.id_usuario = this.usuario.id_usuario;
  
      this.DashboardService.getDocAprueba(this.body).subscribe((res:any)=>{
        this.listAprueba = res;
       //  console.log(this.listAprueba);
        this.numAprueba = this.listAprueba.length;
       //  console.log(this.numAprueba);
        
        
      });
    }

    //get amef
    getAmef(){
      const token: any = localStorage.getItem('token');
      this.usuario =decode(token);

      this.body.id_usuario = this.usuario.id_usuario;
      this.DashboardService.getAmef(this.usuario).subscribe((res:any)=>{
        this.listAmef=res;
        this.numAmef= this.listAmef.length;

      });

    }
    

    //get aprueba
    getDocRevisa(){
      const token: any = localStorage.getItem('token');
      this.usuario =decode(token);
      //  console.log(this.usuario);
  
      this.body.id_usuario = this.usuario.id_usuario;
  
      this.DashboardService.getRevisa(this.body).subscribe((res:any)=>{
        this.listRevisa = res;
        //  console.log(this.listRevisa);
        this.numRevisa = this.listRevisa.length;
        //  console.log(this.numRevisa);
        
        
      });
    }



  
  inicio(){
    localStorage.setItem('inicio', '1');
  }

  ngOnInit(): void {
    let variable = localStorage.getItem('inicio');
    if(variable =='0'){
      localStorage.setItem('inicio', '1');
      location.reload();
      window.location.reload();
    }else{
     //  console.log('next');
      
    }
    this.getAcompanamiento();
    this.getDocAprueba();
    this.getDocRevisa();
    this.getAmef();

  }

}
