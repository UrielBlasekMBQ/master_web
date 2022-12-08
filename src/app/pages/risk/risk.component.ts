import { UsuariosService } from 'src/app/services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import { ProcesosService } from 'src/app/services/procesos.service';
import { RiskService } from 'src/app/services/risk.service';
import  decode  from 'jwt-decode';
import { Logger } from '@syncfusion/ej2-angular-treegrid';
import { EmailService } from 'src/app/services/email.service';
import Swal from 'sweetalert2';





@Component({
  selector: 'app-risk',
  templateUrl: './risk.component.html',
  styleUrls: ['./risk.component.css']
})
export class RiskComponent implements OnInit {

public solicitaRiskForm : FormGroup;

public formValidaToken: FormGroup; 

public unoFormGroup: FormGroup; 
public dosFormGroup : FormGroup;
public tresFormGroup : FormGroup;
public cuatroFormGroup : FormGroup;
public cincoFormGroup : FormGroup;
public seisFormGroup : FormGroup;
public sieteFormGroup : FormGroup;
public ochoFormGroup : FormGroup;

  isLinear = false;

  validacionForm = true;

  constructor(private formBuilder: FormBuilder, private UsuariosService : UsuariosService, 
    private ProcesosService : ProcesosService, private RiskService : RiskService, private EmailService : EmailService) {

    this.solicitaRiskForm = this.formBuilder.group({
      proceso : ['',[Validators.required]], id_responde : ['',[Validators.required]]
    });

    this.formValidaToken= this.formBuilder.group({
      token: ['',[Validators.required]],
    });

    this.unoFormGroup = this.formBuilder.group({
      group1: ['',], group2: ['',], group3: ['',], group4: ['',], group5: ['',], group6: ['',], group7: ['',]
      });

    this.dosFormGroup = this.formBuilder.group({
      group8: ['',], group9: ['',], group10: ['',], group11: ['',], group12: ['',]
    });
  
    this.tresFormGroup = this.formBuilder.group({
      group13: ['',], group14: ['',], group15: ['',], group16: ['',]
    });
  
    this.cuatroFormGroup = this.formBuilder.group({
      group17: ['',], group18: ['',], group19: ['',], group20: ['',], group21: ['',]
    });
  
    this.cincoFormGroup = this.formBuilder.group({
      group22: ['',], group23: ['',], group24: ['',], group25: ['',]
    });
  
    this.seisFormGroup = this.formBuilder.group({
      group26: ['',], group27: ['',]
    });
  
    this.sieteFormGroup = this.formBuilder.group({
      group28: ['',]
    });
  
    this.ochoFormGroup = this.formBuilder.group({
      group29: ['',]
    });
  }

    viewTablaRick = true;
    viewRisk = false;
    textExpiroToken = false;
    textNoToken = false;
    respuesta: any = false;
    continuar: any = false;

  //Extraer risk 
  risk : any;
  riskCompleto= false;
  riskIncompleto = false;
  extraerRisk(risk : any){

    if (risk.estatus == 0) {
      console.log('incompleto');
       this.risk = risk;
       this.formValidaToken.reset();
       this.riskCompleto= false;
       this.riskIncompleto = true;
      
    }else{
      console.log('completo');
       this.risk = risk;
       this.formValidaToken.reset();
       this.riskCompleto= true;
       this.riskIncompleto = false;
      
    }

  
  
  // this.textExpiroToken = false;
  // this.respuesta = false;
  // this.continuar = false;
  // this.textNoToken = false;
  
  
  }

  //Genera Token 
  generaTokenRiskAdmin(){
    let primerToken : any;
  let body = {'id_risk' : this.risk.id_risk, 'id_autor' : this.tipoProceso.id_usuario};
  console.log(body);
  
  this.RiskService.generaTokenRiskAdmin(body).subscribe((res : any)=>{
    primerToken = res.token;
    console.log(primerToken);

      //////////// Email para revisor externo
      let text = `Ha recibido un token para responder el Risk Assessment, este token tiene una caducidad de 5 minutos, Token:`;
      let text1 = primerToken;
      let body_email ={'email' : this.tipoProceso.email, 'nombre' :this.tipoProceso.nombre ,
      'apellidos' : this.tipoProceso.apellidos, 'mensaje1' : text, 'mensaje2' : text1 };
      this.EmailService.sendData(body_email).subscribe((res:any)=>{});
      //////////// Email para revisor externo  
    
  });

  }

    //Genera Token 
    generaTokenRiskAdministrador(){
      let primerToken : any;
    let body = {'id_risk' : this.risk.id_risk};
    this.RiskService.generaTokenRiskAdministrador(body).subscribe((res : any)=>{
      primerToken = res.token;
      console.log(primerToken);
  
      //////////// Email para revisor externo
      let text = `Ha recibido un token para responder el Risk Assessment, este token tiene una caducidad de 5 minutos, Token:`;
      let text1 = primerToken;
      let body_email ={'email' : this.tipoProceso.email, 'nombre' :this.tipoProceso.nombre ,
      'apellidos' : this.tipoProceso.apellidos, 'mensaje1' : text, 'mensaje2' : text1 };
      this.EmailService.sendData(body_email).subscribe((res:any)=>{});
      //////////// Email para revisor externo  
      
    });
  
    }

    validaTokenRiskGenera(){

    let body ={'token': this.formValidaToken.value.token, 'id_risk': this.risk.id_risk, 'id_autor' : this.tipoProceso.id_usuario};
    this.RiskService.validaTokenRiskGenera(body).subscribe((res:any)=>{
      this.respuesta = res.respuesta;
      console.log(res.respuesta);

      if (this.respuesta == true) {
        this.continuar = true;
      }else{
        this.textNoToken = true;
      }
    if (this.respuesta == 'expiro') {this.textExpiroToken = true }
    }); 
  }

  validaTokenRiskAdministrador(){

    let body ={'token': this.formValidaToken.value.token, 'id_risk': this.risk.id_risk};
    this.RiskService.validaTokenRiskAdministrador(body).subscribe((res:any)=>{
      this.respuesta = res.respuesta;
      console.log(res.respuesta);

      if (this.respuesta == true) {
        this.continuar = true;
      }else{
        this.textNoToken = true;
      }
    if (this.respuesta == 'expiro') {this.textExpiroToken = true }
    }); 
  }

//Limpiar formulario 
clearFormulario(){
  this.solicitaRiskForm.reset();
}


  //Cambio de persona Risk
  cambioPersonaRisk(){
    let body = {'id_risk' : this.risk.id_risk, 'id_responde': this.solicitaRiskForm.value.id_responde};
    console.log(this.solicitaRiskForm.value.id_responde);

    let body_usuario ={'id_usuario' : this.solicitaRiskForm.value.id_responde};
    let usuario ;

    this.RiskService.datosUsuario(body_usuario).subscribe((res:any)=>{
      usuario = res[0]; 
    //////////// Email para revisor externo
    let text = `Estimado usuario se le notifica que ha sido asignado para seguir respondiendo un Risk Assessment`;
    let text1 = 'Favor de responderlo';
    let body_email ={'email' : usuario.email, 'nombre' : usuario.nombre ,
    'apellidos' : usuario.apellidos, 'mensaje1' : text, 'mensaje2' : text1 };
    this.EmailService.sendData(body_email).subscribe((res:any)=>{});
    //////////// Email para revisor externo  

    });
    
    this.RiskService.cambiaUsuarioResponde(body).subscribe((res : any)=>{
      location.reload();
      window.location.reload();
    });
    
  }

  // Mandar a edicion 
  sendEdithRisk(){
    let body ={'id_risk': this.risk.id_risk, 'id_responde' : this.solicitaRiskForm.value.id_responde};

    let body_usuario ={'id_usuario' : this.solicitaRiskForm.value.id_responde};
    let usuario ;
    this.RiskService.datosUsuario(body_usuario).subscribe((res:any)=>{
      usuario = res[0];
    //////////// Email para revisor externo
    let text = `Estimado usuario se le notifica que ha sido asignado para seguir respondiendo un Risk Assessment`;
    let text1 = 'Favor de responderlo';
    let body_email ={'email' : usuario.email, 'nombre' : usuario.nombre ,
    'apellidos' : usuario.apellidos, 'mensaje1' : text, 'mensaje2' : text1 };
    this.EmailService.sendData(body_email).subscribe((res:any)=>{});
    //////////// Email para revisor externo  
    });

    this.RiskService.mandarAEdicionRisk(body).subscribe((res : any)=>{
      location.reload();
      window.location.reload();
    });
  }

  //Clear formulario
  clearFormPasar(){
    this.solicitaRiskForm.reset();
  }


/////////////////////////////////Cargar Risk ///////////////////////////////////////////
respuestas : any = [];
//Continuar para contesrar
continuarRisk(){
  let body ={'id_risk' : this.risk.id_risk};
  this.viewTablaRick = false;
  this.viewRisk = true;
  console.log(body);
  
  this.RiskService.listRespuestasRisk(body).subscribe((res:any)=>{
    let resultado = res[0];
    console.log(resultado.group1);
    this.respuestas =[{'res' : resultado.group1}, {'res' : resultado.group2}, {'res' : resultado.group3},{'res' :resultado.group4 },{'res' : resultado.group5},{'res' : resultado.group6},{'res' : resultado.group7},{'res' : resultado.group8},{'res' : resultado.group9},{'res' : resultado.group10},
    {'res' : resultado.group11},{'res' : resultado.group12},{'res' : resultado.group13},{'res' : resultado.group14},{'res' : resultado.group15},{'res' : resultado.group16},{'res' : resultado.group17},{'res' : resultado.group18},{'res' : resultado.group19},{'res' : resultado.group20},
    {'res' : resultado.group21},{'res' : resultado.group22},{'res' : resultado.group23},{'res' : resultado.group24},{'res' : resultado.group25},{'res' : resultado.group26},{'res' : resultado.group27},{'res' : resultado.group28},{'res' : resultado.group29}]
    
    console.log(this.respuestas[0].res);

    for (let i = 0; i < this.respuestas.length; i++) {
      this.resFrom[i].res = this.respuestas[i].res;
      //console.log(this.resFrom[i].res);
      
      if (this.respuestas[i].res == null || this.respuestas[i].res =='null' || this.respuestas[i].res=='undefined') {
        
      }else{
        this.contRes[i].cont = 1;
      }
    }

    this.functCG1();
    this.functCG2();
    this.functCG3();
    this.functCG4();
    this.functCG5();
    this.functCG6();
    this.functCG7();
    this.functCG8();

    console.log(this.contRes);
    
    
  });

}


resFrom :any = [{res : ''},{res : ''},{res : ''},{res : ''},{res : ''},{res : ''},{res : ''},{res : ''},{res : ''},{res : ''},
{res : ''},{res : ''},{res : ''},{res : ''},{res : ''},{res : ''},{res : ''},{res : ''},{res : ''},{res : ''},
{res : ''},{res : ''},{res : ''},{res : ''},{res : ''},{res : ''},{res : ''},{res : ''},{res : ''}];

contRes : any =[{'cont' : 0},{'cont' : 0},{'cont' : 0},{'cont' : 0},{'cont' : 0},{'cont' : 0},{'cont' : 0},{'cont' : 0},{'cont' : 0},{'cont' : 0},
{'cont' : 0},{'cont' : 0},{'cont' : 0},{'cont' : 0},{'cont' : 0},{'cont' : 0},{'cont' : 0},{'cont' : 0},{'cont' : 0},{'cont' : 0},
{'cont' : 0},{'cont' : 0},{'cont' : 0},{'cont' : 0},{'cont' : 0},{'cont' : 0},{'cont' : 0},{'cont' : 0},{'cont' : 0}];  


functCG1(){
  let cont =0;
  for (let i = 0; i <= 6; i++) {
    if (this.contRes[i].cont > 0) {
      this.CG1 = this.CG1 +1;
    }
    
  }
}
functCG2(){
  let cont =0;
  for (let i = 7; i <= 11; i++) {
    if (this.contRes[i].cont > 0) {
      this.CG2 = this.CG2 +1;
    }
    
  }
}
functCG3(){
  let cont =0;
  for (let i = 12; i <= 15; i++) {
    if (this.contRes[i].cont > 0) {
      this.CG3 = this.CG3 +1;
    }
    
  }
}
functCG4(){
  let cont =0;
  for (let i = 16; i <= 20; i++) {
    if (this.contRes[i].cont > 0) {
      this.CG4 = this.CG4 +1;
    }
    
  }
}
functCG5(){
  let cont =0;
  for (let i = 21; i <= 24; i++) {
    if (this.contRes[i].cont > 0) {
      this.CG5 = this.CG5 +1;
    }
    
  }
}
functCG6(){
  let cont =0;
  for (let i = 25; i <= 26; i++) {
    if (this.contRes[i].cont > 0) {
      this.CG6 = this.CG6 +1;
    }
    
  }
}
functCG7(){
  let cont =0;
  for (let i = 27; i <= 27; i++) {
    if (this.contRes[i].cont > 0) {
      this.CG7 = this.CG7 +1;
    }
    
  }
}
functCG8(){
  let cont =0;
  for (let i = 28; i <= 28; i++) {
    if (this.contRes[i].cont > 0) {
      this.CG8 = this.CG8 +1;
    }
    
  }
}


CG1 : any =0;
//contador1 =0; contador2 =0; contador3 =0; contador4 =0; contador5 =0; contador6 =0; contador7 =0;

respuesta1(){this.contRes[0].cont = (this.contRes[0].cont >0) ? this.contRes[0].cont : this.CG1= this.CG1 +1 ;}
respuesta2(){this.contRes[1].cont = (this.contRes[1].cont >0) ? this.contRes[1].cont : this.CG1= this.CG1 +1 ;}
respuesta3(){this.contRes[2].cont = (this.contRes[2].cont >0) ? this.contRes[2].cont : this.CG1= this.CG1 +1 ;}
respuesta4(){this.contRes[3].cont = (this.contRes[3].cont >0) ? this.contRes[3].cont : this.CG1= this.CG1 +1 ;}
respuesta5(){this.contRes[4].cont = (this.contRes[4].cont >0) ? this.contRes[4].cont : this.CG1= this.CG1 +1 ;}
respuesta6(){this.contRes[5].cont = (this.contRes[5].cont >0) ? this.contRes[5].cont : this.CG1= this.CG1 +1 ;}
respuesta7(){this.contRes[6].cont = (this.contRes[6].cont >0) ? this.contRes[6].cont : this.CG1= this.CG1 +1 ;}

CG2 : any =0;
//contador8 =0; contador9 =0; contador10 =0; contador11 =0; contador12 =0;

respuesta8(){this.contRes[7].cont = (this.contRes[7].cont >0) ? this.contRes[7].cont : this.CG2= this.CG2 +1 ;}
respuesta9(){this.contRes[8].cont = (this.contRes[8].cont >0) ? this.contRes[8].cont : this.CG2= this.CG2 +1 ;}
respuesta10(){this.contRes[9].cont = (this.contRes[9].cont >0) ? this.contRes[9].cont : this.CG2= this.CG2 +1 ;}
respuesta11(){this.contRes[10].cont = (this.contRes[10].cont >0) ? this.contRes[10].cont : this.CG2= this.CG2 +1 ;}
respuesta12(){this.contRes[11].cont = (this.contRes[11].cont >0) ? this.contRes[11].cont : this.CG2= this.CG2 +1 ;}

CG3: any =0;
//contador13 =0; contador14 =0; contador15 =0; contador16 =0;

respuesta13(){this.contRes[12].cont = (this.contRes[12].cont >0) ? this.contRes[12].cont : this.CG3= this.CG3 +1 ;}
respuesta14(){this.contRes[13].cont = (this.contRes[13].cont >0) ? this.contRes[13].cont : this.CG3= this.CG3 +1 ;}
respuesta15(){this.contRes[14].cont = (this.contRes[14].cont >0) ? this.contRes[14].cont : this.CG3= this.CG3 +1 ;}
respuesta16(){this.contRes[15].cont = (this.contRes[15].cont >0) ? this.contRes[15].cont : this.CG3= this.CG3 +1 ;}

CG4 : any =0;
//contador17 =0; contador18 =0; contador19 =0; contador20 =0; contador21 =0;

respuesta17(){this.contRes[16].cont = (this.contRes[16].cont >0) ? this.contRes[16].cont : this.CG4= this.CG4 +1 ;}
respuesta18(){this.contRes[17].cont = (this.contRes[17].cont >0) ? this.contRes[17].cont : this.CG4= this.CG4 +1 ;}
respuesta19(){this.contRes[18].cont = (this.contRes[18].cont >0) ? this.contRes[18].cont : this.CG4= this.CG4 +1 ;}
respuesta20(){this.contRes[19].cont = (this.contRes[19].cont >0) ? this.contRes[19].cont : this.CG4= this.CG4 +1 ;}
respuesta21(){this.contRes[20].cont = (this.contRes[20].cont >0) ? this.contRes[20].cont : this.CG4= this.CG4 +1 ;}


CG5 : any =0;
//contador22 =0; contador23 =0; contador24 =0; contador25 =0; 

respuesta22(){this.contRes[21].cont = (this.contRes[21].cont >0) ? this.contRes[21].cont : this.CG5= this.CG5 +1 ;}
respuesta23(){this.contRes[22].cont = (this.contRes[22].cont >0) ? this.contRes[22].cont : this.CG5= this.CG5 +1 ;}
respuesta24(){this.contRes[23].cont = (this.contRes[23].cont >0) ? this.contRes[23].cont : this.CG5= this.CG5 +1 ;}
respuesta25(){this.contRes[24].cont = (this.contRes[24].cont >0) ? this.contRes[24].cont : this.CG5= this.CG5 +1 ;}


CG6 : any =0;
//contador26 =0; contador27 =0; 

respuesta26(){this.contRes[25].cont = (this.contRes[25].cont >0) ? this.contRes[25].cont : this.CG6= this.CG6 +1 ;}
respuesta27(){this.contRes[26].cont = (this.contRes[26].cont >0) ? this.contRes[26].cont : this.CG6= this.CG6 +1 ;}


CG7 : any =0;
//contador28 =0; 

respuesta28(){this.contRes[27].cont = (this.contRes[27].cont >0) ? this.contRes[27].cont : this.CG7= this.CG7 +1 ;}

CG8 : any =0;
//contador29 =0; 

respuesta29(){this.contRes[28].cont = (this.contRes[28].cont >0) ? this.contRes[28].cont : this.CG8= this.CG8 +1 ;}



contadorRes (numero : any){
  
  console.log(numero);
  
  
  if (numero > 0) {
    return 1;
  }else{
    return  0 ;
  }
}

/////////////////////////////////Cargar Risk ///////////////////////////////////////////



  p : number = 1;

  listRisk : any;
  functListarRisk(){

  }

  usuario : any;
  listUsuarios : any ;

  capturaProceso(){
    this.proceso = this.solicitaRiskForm.value.proceso;
    console.log(this.proceso);
    let body={'id_proceso': this.proceso};
    this.RiskService.getUsuarios(body).subscribe((res: any)=>{
      this.listUsuarios = res;
    });
    
  }

  proceso : any ;
  listProcesos: any;
  listProcesosFunct(){
    this.ProcesosService.getProcesos().subscribe((res: any)=>{
      this.listProcesos = res; 
    });
  };

  tipoProceso : any;
  generaRisk(){
    const fecha = new Date();
    console.log(fecha);
    let body_usuario ={'id_usuario' : this.solicitaRiskForm.value.id_responde};
    let usuario ;
    this.RiskService.datosUsuario(body_usuario).subscribe((res:any)=>{
      usuario = res[0]; 

    //////////// Email para revisor externo
    let text = `Estimado usuario se le notifica que se ha sido asignado para responder el Risk Assessment`;
    let text1 = 'Favor de responderlo';
    let body_email ={'email' : usuario.email, 'nombre' : usuario.nombre ,
    'apellidos' : usuario.apellidos, 'mensaje1' : text, 'mensaje2' : text1 };
    this.EmailService.sendData(body_email).subscribe((res:any)=>{});
    //////////// Email para revisor externo  
    this.inicioTabla();
     });
    
    
    let boby ={'id_autor' : this.tipoProceso.id_usuario , 'id_responde' : this.solicitaRiskForm.value.id_responde, 'fecha' : fecha}
    console.log(boby);


    
    this.RiskService.generaRisk(boby).subscribe((res : any)=>{
      this.mensajeGenerarisk(res);
    });
  }


  ngOnInit(): void {
    this.listProcesosFunct();
    /// Procesos ///
    this.inicioTabla();

  }

  inicioTabla(){
    const token: any = localStorage.getItem('token');
    this.tipoProceso =decode(token);

    if(this.tipoProceso.tipoUsuario == 1){
      //console.log('procesos 1');
       this.RiskService.listRiskAdmin().subscribe((res : any)=>{
        this.listRisk= res;
        console.log(this.listRisk);
       });
       
     } else{

       let body ={'id_usuario' : this.tipoProceso.id_usuario};
       
       this.RiskService.listRiskUsuario(body).subscribe((res: any)=>{
        this.listRisk = res;
        console.log(this.listRisk);
        
       });
       
      //console.log('Procesos 2');
       
     }
  }


       ////// Mensajes //////
       mensajeGenerarisk(res : any){
        if (res.ok) {
          Swal.fire({
            title:'Correcto',
            text: `El Risk Asssessment ha sido generado correctamente`,
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
