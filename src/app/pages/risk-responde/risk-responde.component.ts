import { Logger } from '@syncfusion/ej2-angular-treegrid';
import { Component, OnInit } from '@angular/core';
import { RiskService } from 'src/app/services/risk.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  decode  from 'jwt-decode';
import { EmailService } from 'src/app/services/email.service';
import Swal from 'sweetalert2';
import { ProcesosService } from 'src/app/services/procesos.service';



@Component({
  selector: 'app-risk-responde',
  templateUrl: './risk-responde.component.html',
  styleUrls: ['./risk-responde.component.css']
})
export class RiskRespondeComponent implements OnInit {

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

  constructor(private RiskService: RiskService, private formBuilder : FormBuilder, private EmailService : EmailService, private ProcesosService : ProcesosService) {
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

  p : number =1;
  listRisk : any;
  listRiskFunction(){
    let body = {'id_usuario': this.tipoProceso.id_usuario};
    this.RiskService.listRsk(body).subscribe((res: any)=>{
      this.listRisk = res;
    });
  }

//Extraer risk 
risk : any;
extraerRisk(risk : any){
 this.risk = risk;
 this.formValidaToken.reset();
 this.textExpiroToken = false;
 this.respuesta = false;
 this.continuar = false;
 this.textNoToken = false;
 //console.log(this.risk);
 
}

//Genera Token 
  generarToken(){
    let primerToken : any;
  let body = {'id_risk' : this.risk.id_risk, 'id_responde' : this.tipoProceso.id_usuario};
  this.RiskService.generaTokenRisk(body).subscribe((res : any)=>{
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

  textExpiroToken = false;
  textNoToken = false;
  respuesta: any = false;
  continuar: any = false;
  validaToken(){

    let body ={'token': this.formValidaToken.value.token, 'id_risk': this.risk.id_risk, 'id_responde' : this.tipoProceso.id_usuario};
    this.RiskService.validaTokenRisk(body).subscribe((res:any)=>{
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

  viewBotonActualiza = true;
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
      if (resultado.estatus == 0) {
        this.viewBotonActualiza = true;
      }else{
        this.viewBotonActualiza = false;
      }
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

  ////////////////////////Risk Assessments///////////////////////////////////

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
  
  respuesta1(codigo :any){this.contRes[0].cont = (this.contRes[0].cont >0) ? this.contRes[0].cont : this.CG1= this.CG1 +1 ; this.historial1(codigo);}
  respuesta2(codigo :any){this.contRes[1].cont = (this.contRes[1].cont >0) ? this.contRes[1].cont : this.CG1= this.CG1 +1 ; this.historial2(codigo);}
  respuesta3(codigo :any){this.contRes[2].cont = (this.contRes[2].cont >0) ? this.contRes[2].cont : this.CG1= this.CG1 +1 ; this.historial3(codigo);}
  respuesta4(codigo :any){this.contRes[3].cont = (this.contRes[3].cont >0) ? this.contRes[3].cont : this.CG1= this.CG1 +1 ; this.historial4(codigo);}
  respuesta5(codigo :any){this.contRes[4].cont = (this.contRes[4].cont >0) ? this.contRes[4].cont : this.CG1= this.CG1 +1 ; this.historial5(codigo);}
  respuesta6(codigo :any){this.contRes[5].cont = (this.contRes[5].cont >0) ? this.contRes[5].cont : this.CG1= this.CG1 +1 ; this.historial6(codigo);}
  respuesta7(codigo :any){this.contRes[6].cont = (this.contRes[6].cont >0) ? this.contRes[6].cont : this.CG1= this.CG1 +1 ; this.historial7(codigo);}

  CG2 : any =0;
  //contador8 =0; contador9 =0; contador10 =0; contador11 =0; contador12 =0;

  respuesta8(codigo :any){this.contRes[7].cont = (this.contRes[7].cont >0) ? this.contRes[7].cont : this.CG2= this.CG2 +1 ;this.historial8(codigo);}
  respuesta9(codigo :any){this.contRes[8].cont = (this.contRes[8].cont >0) ? this.contRes[8].cont : this.CG2= this.CG2 +1 ;this.historial9(codigo);}
  respuesta10(codigo :any){this.contRes[9].cont = (this.contRes[9].cont >0) ? this.contRes[9].cont : this.CG2= this.CG2 +1 ;this.historial10(codigo);}
  respuesta11(codigo :any){this.contRes[10].cont = (this.contRes[10].cont >0) ? this.contRes[10].cont : this.CG2= this.CG2 +1 ;this.historial11(codigo);}
  respuesta12(codigo :any){this.contRes[11].cont = (this.contRes[11].cont >0) ? this.contRes[11].cont : this.CG2= this.CG2 +1 ;this.historial12(codigo);}

  CG3: any =0;
  //contador13 =0; contador14 =0; contador15 =0; contador16 =0;

  respuesta13(codigo :any){this.contRes[12].cont = (this.contRes[12].cont >0) ? this.contRes[12].cont : this.CG3= this.CG3 +1 ;this.historial13(codigo);}
  respuesta14(codigo :any){this.contRes[13].cont = (this.contRes[13].cont >0) ? this.contRes[13].cont : this.CG3= this.CG3 +1 ;this.historial14(codigo);}
  respuesta15(codigo :any){this.contRes[14].cont = (this.contRes[14].cont >0) ? this.contRes[14].cont : this.CG3= this.CG3 +1 ;this.historial15(codigo);}
  respuesta16(codigo :any){this.contRes[15].cont = (this.contRes[15].cont >0) ? this.contRes[15].cont : this.CG3= this.CG3 +1 ;this.historial16(codigo);}

  CG4 : any =0;
  //contador17 =0; contador18 =0; contador19 =0; contador20 =0; contador21 =0;

  respuesta17(codigo :any){this.contRes[16].cont = (this.contRes[16].cont >0) ? this.contRes[16].cont : this.CG4= this.CG4 +1 ;this.historial17(codigo);}
  respuesta18(codigo :any){this.contRes[17].cont = (this.contRes[17].cont >0) ? this.contRes[17].cont : this.CG4= this.CG4 +1 ;this.historial18(codigo);}
  respuesta19(codigo :any){this.contRes[18].cont = (this.contRes[18].cont >0) ? this.contRes[18].cont : this.CG4= this.CG4 +1 ;this.historial19(codigo);}
  respuesta20(codigo :any){this.contRes[19].cont = (this.contRes[19].cont >0) ? this.contRes[19].cont : this.CG4= this.CG4 +1 ;this.historial20(codigo);}
  respuesta21(codigo :any){this.contRes[20].cont = (this.contRes[20].cont >0) ? this.contRes[20].cont : this.CG4= this.CG4 +1 ;this.historial21(codigo);}


  CG5 : any =0;
  //contador22 =0; contador23 =0; contador24 =0; contador25 =0; 

  respuesta22(codigo :any){this.contRes[21].cont = (this.contRes[21].cont >0) ? this.contRes[21].cont : this.CG5= this.CG5 +1 ;this.historial22(codigo);}
  respuesta23(codigo :any){this.contRes[22].cont = (this.contRes[22].cont >0) ? this.contRes[22].cont : this.CG5= this.CG5 +1 ;this.historial23(codigo);}
  respuesta24(codigo :any){this.contRes[23].cont = (this.contRes[23].cont >0) ? this.contRes[23].cont : this.CG5= this.CG5 +1 ;this.historial24(codigo);}
  respuesta25(codigo :any){this.contRes[24].cont = (this.contRes[24].cont >0) ? this.contRes[24].cont : this.CG5= this.CG5 +1 ;this.historial25(codigo);}


  CG6 : any =0;
  //contador26 =0; contador27 =0; 

  respuesta26(codigo :any){this.contRes[25].cont = (this.contRes[25].cont >0) ? this.contRes[25].cont : this.CG6= this.CG6 +1 ;this.historial26(codigo);}
  respuesta27(codigo :any){this.contRes[26].cont = (this.contRes[26].cont >0) ? this.contRes[26].cont : this.CG6= this.CG6 +1 ;this.historial27(codigo);}


  CG7 : any =0;
  //contador28 =0; 

  respuesta28(codigo :any){this.contRes[27].cont = (this.contRes[27].cont >0) ? this.contRes[27].cont : this.CG7= this.CG7 +1 ;this.historial28(codigo);}

  CG8 : any =0;
  //contador29 =0; 

  respuesta29(codigo :any){this.contRes[28].cont = (this.contRes[28].cont >0) ? this.contRes[28].cont : this.CG8= this.CG8 +1 ;this.historial28(codigo);}

  

  contadorRes (numero : any){
    
    console.log(numero);
    
    
    if (numero > 0) {
      return 1;
    }else{
      return  0 ;
    }
  }

  functCerrarRisk(){
    if (this.CG1== 7 && this.CG2==5 && this.CG3==4 && this.CG4==5 && this.CG5==4 && this.CG6==2 && this.CG7==1 && this.CG8==1) {
      console.log('El risk fue completafo');
      
    }
  }



  ////////////////////////Risk Assessments///////////////////////////////////


  ////////////////////////Actualizar Risk////////////////////////////////////////
  //Uno 
  unoRespuestasRisk(){
    let body = {'id_risk' : this.risk.id_risk, 'group1': this.unoFormGroup.value.group1, 'group2': this.unoFormGroup.value.group2, 'group3': this.unoFormGroup.value.group3,
     'group4': this.unoFormGroup.value.group4, 'group5': this.unoFormGroup.value.group5, 'group6': this.unoFormGroup.value.group6, 'group7': this.unoFormGroup.value.group7};
    this.RiskService.unoRespuestasRisk(body).subscribe((res:any)=>{
      this.mensajeAdd(res);
      this.functValidaTermino();
      // insertar historial
      let co =0;
      for (let i = 0; i < this.seccion1.length; i++) {        
        this.RiskService.datosHistorial(this.seccion1[i]).subscribe((res:any)=>{co= co+1});
      }
      co == this.seccion1.length ? this.seccion1 =[]: co;
    });
  }

  //Dos
  dosRespuestasRisk(){
    let body = {'id_risk' : this.risk.id_risk, 'group8': this.dosFormGroup.value.group8, 'group9': this.dosFormGroup.value.group9, 'group10': this.dosFormGroup.value.group10,
     'group11': this.dosFormGroup.value.group11, 'group12': this.dosFormGroup.value.group12};
     console.log(body);
     
    this.RiskService.dosRespuestasRisk(body).subscribe((res:any)=>{
      this.mensajeAdd(res);
      this.functValidaTermino();
      // insertar historial
      let co =0;
      for (let i = 0; i < this.seccion2.length; i++) {        
        this.RiskService.datosHistorial(this.seccion2[i]).subscribe((res:any)=>{co= co+1});
      }
      co == this.seccion2.length ? this.seccion2 =[]: co;
    });
  }

  //Tres
  tresRespuestasRisk(){
    let body = {'id_risk' : this.risk.id_risk, 'group13': this.tresFormGroup.value.group13, 'group14': this.tresFormGroup.value.group14, 'group15': this.tresFormGroup.value.group15,
      'group16': this.tresFormGroup.value.group16};
    this.RiskService.tresRespuestasRisk(body).subscribe((res:any)=>{
      this.mensajeAdd(res);
      this.functValidaTermino();
      // insertar historial
      let co =0;
      for (let i = 0; i < this.seccion3.length; i++) {        
        this.RiskService.datosHistorial(this.seccion3[i]).subscribe((res:any)=>{co= co+1});
      }
      co == this.seccion3.length ? this.seccion3 =[]: co;
    });
  }

    //Cuatro
    cuatroRespuestasRisk(){
      let body = {'id_risk' : this.risk.id_risk, 'group17': this.cuatroFormGroup.value.group17, 'group18': this.cuatroFormGroup.value.group18, 'group19': this.cuatroFormGroup.value.group19,
        'group20': this.cuatroFormGroup.value.group20, 'group21': this.cuatroFormGroup.value.group21};
      this.RiskService.cuatroRespuestasRisk(body).subscribe((res:any)=>{
        this.mensajeAdd(res);
        this.functValidaTermino();
        // insertar historial
        let co =0;
        for (let i = 0; i < this.seccion4.length; i++) {        
          this.RiskService.datosHistorial(this.seccion4[i]).subscribe((res:any)=>{co= co+1});
        }
        co == this.seccion4.length ? this.seccion4 =[]: co;
      });
    }

    //Cinco
    cincoRespuestasRisk(){
      let body = {'id_risk' : this.risk.id_risk, 'group22': this.cincoFormGroup.value.group22, 'group23': this.cincoFormGroup.value.group23, 'group24': this.cincoFormGroup.value.group24,
        'group25': this.cincoFormGroup.value.group25};
      this.RiskService.cincoRespuestasRisk(body).subscribe((res:any)=>{
        this.mensajeAdd(res);
        this.functValidaTermino();
        // insertar historial
        let co =0;
        for (let i = 0; i < this.seccion5.length; i++) {        
          this.RiskService.datosHistorial(this.seccion5[i]).subscribe((res:any)=>{co= co+1});
        }
        co == this.seccion5.length ? this.seccion5 =[]: co;
      });
    }

    //Seis
    seisRespuestasRisk(){
      let body = {'id_risk' : this.risk.id_risk, 'group26': this.seisFormGroup.value.group26, 'group27': this.seisFormGroup.value.group27};
      this.RiskService.seisRespuestasRisk(body).subscribe((res:any)=>{
        this.mensajeAdd(res);
        this.functValidaTermino();
        // insertar historial
        let co =0;
        for (let i = 0; i < this.seccion6.length; i++) {        
          this.RiskService.datosHistorial(this.seccion6[i]).subscribe((res:any)=>{co= co+1});
        }
        co == this.seccion6.length ? this.seccion6 =[]: co;
      });
    }

    //Seis
    sieteRespuestasRisk(){
      let body = {'id_risk' : this.risk.id_risk, 'group28': this.sieteFormGroup.value.group28};
      this.RiskService.sieteRespuestasRisk(body).subscribe((res:any)=>{
        this.mensajeAdd(res);
        this.functValidaTermino();
        // insertar historial
        let co =0;
        for (let i = 0; i < this.seccion7.length; i++) {        
          this.RiskService.datosHistorial(this.seccion7[i]).subscribe((res:any)=>{co= co+1});
        }
        co == this.seccion7.length ? this.seccion7 =[]: co;
      });
    }

    //Ocho
    ochoRespuestasRisk(){
      let body = {'id_risk' : this.risk.id_risk, 'group29': this.ochoFormGroup.value.group29};
      this.RiskService.ochoRespuestasRisk(body).subscribe((res:any)=>{
        this.mensajeAdd(res);
        this.functValidaTermino();
        // insertar historial
        let co =0;
        for (let i = 0; i < this.seccion8.length; i++) {        
          this.RiskService.datosHistorial(this.seccion8[i]).subscribe((res:any)=>{co= co+1});
        }
        co == this.seccion8.length ? this.seccion8 =[]: co;
      });
    }

  

  ////////////////////////Actualizar Risk////////////////////////////////////////}

  ///////////////////// ValidaTERMINO DEL Risk//////////////////////////////
  functValidaTermino(){
    let body ={'id_risk' : this.risk.id_risk};
    let contadorFinal = 0;
    this.RiskService.listRespuestasRisk(body).subscribe((res : any)=>{
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
          contadorFinal = contadorFinal +1;
        }
      }

      if (contadorFinal == 29) {
        console.log('Se termino');
        this.RiskService.finalRisk(body).subscribe((res:any)=>{
          this.mensajeFinal(res);
        });
        
      }else{
        console.log('Aun no termina');
        
      }


    });
    
  }
  ///////////////////// ValidaTERMINO DEL Risk//////////////////////////////

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

  //Cambio de persona Risk
  cambioPersonaRisk(){
    let body = {'id_risk' : this.risk.id_risk, 'id_responde': this.solicitaRiskForm.value.id_responde};
    console.log(this.solicitaRiskForm.value.id_responde);

    let body_usuario ={'id_usuario' : this.solicitaRiskForm.value.id_responde};
    let usuario ;
    this.RiskService.datosUsuario(body_usuario).subscribe((res:any)=>{
    usuario = res[0];
    //////////// Email para revisor externo
    let text = `Estimado usuario se le notifica que ha sido asignado para seguir respondiendo el Risk Assessment`;
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

    // Se agrega al historial
    const fecha = new Date();
    let body_historial = {'id_risk' : this.risk.id_risk, 'id_pasa': this.tipoProceso.id_usuario, 'id_responde': this.solicitaRiskForm.value.id_responde, 'id_pregunta': 30, 'codigo' : 'a','fecha' : fecha};
    this.RiskService.datosHistorial(body_historial).subscribe((res:any)=>{});
    
  }

  //Clear formulario
  clearFormPasar(){
    this.solicitaRiskForm.reset();
  }

  /////////////////Funciones del historial/////////////////
  /// Seccion 1
    seccion1 : any =[];
    historial1(codigo : any){
      const fecha = new Date();
      let body = {'id_risk' : this.risk.id_risk, 'id_pasa': 0, 'id_responde': this.tipoProceso.id_usuario, 'id_pregunta': 1, 'codigo' : codigo,'fecha' : fecha};
      this.seccion1.push(body);
      console.log(this.seccion1);      
    }
    historial2(codigo : any){
      const fecha = new Date();
      let body = {'id_risk' : this.risk.id_risk, 'id_pasa': 0, 'id_responde': this.tipoProceso.id_usuario, 'id_pregunta': 2, 'codigo' : codigo,'fecha' : fecha};
      this.seccion1.push(body);
      console.log(this.seccion1);      
    }
    historial3(codigo : any){
      const fecha = new Date();
      let body = {'id_risk' : this.risk.id_risk, 'id_pasa': 0, 'id_responde': this.tipoProceso.id_usuario, 'id_pregunta': 3, 'codigo' : codigo,'fecha' : fecha};
      this.seccion1.push(body);
      console.log(this.seccion1);      
    }
    historial4(codigo : any){
      const fecha = new Date();
      let body = {'id_risk' : this.risk.id_risk, 'id_pasa': 0, 'id_responde': this.tipoProceso.id_usuario, 'id_pregunta': 4, 'codigo' : codigo,'fecha' : fecha};
      this.seccion1.push(body);
      console.log(this.seccion1);      
    }
    historial5(codigo : any){
      const fecha = new Date();
      let body = {'id_risk' : this.risk.id_risk, 'id_pasa': 0, 'id_responde': this.tipoProceso.id_usuario, 'id_pregunta': 5, 'codigo' : codigo,'fecha' : fecha};
      this.seccion1.push(body);
      console.log(this.seccion1);      
    }
    historial6(codigo : any){
      const fecha = new Date();
      let body = {'id_risk' : this.risk.id_risk, 'id_pasa': 0, 'id_responde': this.tipoProceso.id_usuario, 'id_pregunta': 6, 'codigo' : codigo,'fecha' : fecha};
      this.seccion1.push(body);
      console.log(this.seccion1);      
    }
    historial7(codigo : any){
      const fecha = new Date();
      let body = {'id_risk' : this.risk.id_risk, 'id_pasa': 0, 'id_responde': this.tipoProceso.id_usuario, 'id_pregunta': 7, 'codigo' : codigo,'fecha' : fecha};
      this.seccion1.push(body);
      console.log(this.seccion1);      
    }

  /// Seccion 1


  /// Seccion 2
  seccion2 : any =[];
  historial8(codigo : any){
    const fecha = new Date();
    let body = {'id_risk' : this.risk.id_risk, 'id_pasa': 0, 'id_responde': this.tipoProceso.id_usuario, 'id_pregunta': 8, 'codigo' : codigo,'fecha' : fecha};
    this.seccion2.push(body);
    console.log(this.seccion2);    
  }
  historial9(codigo : any){
    const fecha = new Date();
    let body = {'id_risk' : this.risk.id_risk, 'id_pasa': 0, 'id_responde': this.tipoProceso.id_usuario, 'id_pregunta': 9, 'codigo' : codigo,'fecha' : fecha};
    this.seccion2.push(body);
    console.log(this.seccion2);    
  }
  historial10(codigo : any){
    const fecha = new Date();
    let body = {'id_risk' : this.risk.id_risk, 'id_pasa': 0, 'id_responde': this.tipoProceso.id_usuario, 'id_pregunta': 10, 'codigo' : codigo,'fecha' : fecha};
    this.seccion2.push(body);
    console.log(this.seccion2);    
  }
  historial11(codigo : any){
    const fecha = new Date();
    let body = {'id_risk' : this.risk.id_risk, 'id_pasa': 0, 'id_responde': this.tipoProceso.id_usuario, 'id_pregunta': 11, 'codigo' : codigo,'fecha' : fecha};
    this.seccion2.push(body);
    console.log(this.seccion2);    
  }
  historial12(codigo : any){
    const fecha = new Date();
    let body = {'id_risk' : this.risk.id_risk, 'id_pasa': 0, 'id_responde': this.tipoProceso.id_usuario, 'id_pregunta': 12, 'codigo' : codigo,'fecha' : fecha};
    this.seccion2.push(body);
    console.log(this.seccion2);    
  }
  /// Seccion 2


  /// Seccion 3
  seccion3 : any =[];
  historial13(codigo : any){
    const fecha = new Date();
    let body = {'id_risk' : this.risk.id_risk, 'id_pasa': 0, 'id_responde': this.tipoProceso.id_usuario, 'id_pregunta': 13, 'codigo' : codigo,'fecha' : fecha};
    this.seccion3.push(body);
    console.log(this.seccion3);    
  }
  historial14(codigo : any){
    const fecha = new Date();
    let body = {'id_risk' : this.risk.id_risk, 'id_pasa': 0, 'id_responde': this.tipoProceso.id_usuario, 'id_pregunta': 14, 'codigo' : codigo,'fecha' : fecha};
    this.seccion3.push(body);
    console.log(this.seccion3);    
  }
  historial15(codigo : any){
    const fecha = new Date();
    let body = {'id_risk' : this.risk.id_risk, 'id_pasa': 0, 'id_responde': this.tipoProceso.id_usuario, 'id_pregunta': 15, 'codigo' : codigo,'fecha' : fecha};
    this.seccion3.push(body);
    console.log(this.seccion3);    
  }
  historial16(codigo : any){
    const fecha = new Date();
    let body = {'id_risk' : this.risk.id_risk, 'id_pasa': 0, 'id_responde': this.tipoProceso.id_usuario, 'id_pregunta': 16, 'codigo' : codigo,'fecha' : fecha};
    this.seccion3.push(body);
    console.log(this.seccion3);    
  }
  /// Seccion 3


  /// Seccion 4
  seccion4 : any =[];
  historial17(codigo : any){
    const fecha = new Date();
    let body = {'id_riskid_risk' : this.risk.id_risk, 'id_pasa': 0, 'id_responde': this.tipoProceso.id_usuario, 'id_pregunta': 17, 'codigo' : codigo,'fecha' : fecha};
    this.seccion4.push(body);
    console.log(this.seccion4);    
  }
  historial18(codigo : any){
    const fecha = new Date();
    let body = {'id_risk' : this.risk.id_risk, 'id_pasa': 0, 'id_responde': this.tipoProceso.id_usuario, 'id_pregunta': 18, 'codigo' : codigo,'fecha' : fecha};
    this.seccion4.push(body);
    console.log(this.seccion4);    
  }
  historial19(codigo : any){
    const fecha = new Date();
    let body = {'id_risk' : this.risk.id_risk, 'id_pasa': 0, 'id_responde': this.tipoProceso.id_usuario, 'id_pregunta': 19, 'codigo' : codigo,'fecha' : fecha};
    this.seccion4.push(body);
    console.log(this.seccion4);    
  }
  historial20(codigo : any){
    const fecha = new Date();
    let body = {'id_risk' : this.risk.id_risk, 'id_pasa': 0, 'id_responde': this.tipoProceso.id_usuario, 'id_pregunta': 20, 'codigo' : codigo,'fecha' : fecha};
    this.seccion4.push(body);
    console.log(this.seccion4);    
  }
  historial21(codigo : any){
    const fecha = new Date();
    let body = {'id_risk' : this.risk.id_risk, 'id_pasa': 0, 'id_responde': this.tipoProceso.id_usuario, 'id_pregunta': 21, 'codigo' : codigo,'fecha' : fecha};
    this.seccion4.push(body);
    console.log(this.seccion4);    
  }
  /// Seccion 4


  /// Seccion 5
  seccion5 : any =[];
  historial22(codigo : any){
    const fecha = new Date();
    let body = {'id_risk' : this.risk.id_risk, 'id_pasa': 0, 'id_responde': this.tipoProceso.id_usuario, 'id_pregunta': 22, 'codigo' : codigo,'fecha' : fecha};
    this.seccion5.push(body);
    console.log(this.seccion5);    
  }
  historial23(codigo : any){
    const fecha = new Date();
    let body = {'id_risk' : this.risk.id_risk, 'id_pasa': 0, 'id_responde': this.tipoProceso.id_usuario, 'id_pregunta': 23, 'codigo' : codigo,'fecha' : fecha};
    this.seccion5.push(body);
    console.log(this.seccion5);    
  }
  historial24(codigo : any){
    const fecha = new Date();
    let body = {'id_risk' : this.risk.id_risk, 'id_pasa': 0, 'id_responde': this.tipoProceso.id_usuario, 'id_pregunta': 24, 'codigo' : codigo,'fecha' : fecha};
    this.seccion5.push(body);
    console.log(this.seccion5);    
  }
  historial25(codigo : any){
    const fecha = new Date();
    let body = {'id_risk' : this.risk.id_risk, 'id_pasa': 0, 'id_responde': this.tipoProceso.id_usuario, 'id_pregunta': 25, 'codigo' : codigo,'fecha' : fecha};
    this.seccion5.push(body);
    console.log(this.seccion5);    
  }
  
  /// Seccion 5

  /// Seccion 6
  seccion6 : any =[];
  historial26(codigo : any){
    const fecha = new Date();
    let body = {'id_risk' : this.risk.id_risk, 'id_pasa': 0, 'id_responde': this.tipoProceso.id_usuario, 'id_pregunta': 26, 'codigo' : codigo,'fecha' : fecha};
    this.seccion6.push(body);
    console.log(this.seccion6);    
  }
  historial27(codigo : any){
    const fecha = new Date();
    let body = {'id_risk' : this.risk.id_risk, 'id_pasa': 0, 'id_responde': this.tipoProceso.id_usuario, 'id_pregunta': 27, 'codigo' : codigo,'fecha' : fecha};
    this.seccion6.push(body);
    console.log(this.seccion6);    
  }
  /// Seccion 6

  /// Seccion 7
  seccion7 : any =[];
  historial28(codigo : any){
    const fecha = new Date();
    let body = {'id_risk' : this.risk.id_risk, 'id_pasa': 0, 'id_responde': this.tipoProceso.id_usuario, 'id_pregunta': 28, 'codigo' : codigo,'fecha' : fecha};
    this.seccion7.push(body);
    console.log(this.seccion7);    
  }
  /// Seccion 7

  /// Seccion 8
  seccion8 : any =[];
  historial29(codigo : any){
    const fecha = new Date();
    let body = {'id_risk' : this.risk.id_risk, 'id_pasa': 0, 'id_responde': this.tipoProceso.id_usuario, 'id_pregunta': 29, 'codigo' : codigo,'fecha' : fecha};
    this.seccion8.push(body);
    console.log(this.seccion8);    
  }
  /// Seccion 8

  
  /////////////////Funciones del historial/////////////////




  tipoProceso : any;
  ngOnInit(): void {
    const token: any = localStorage.getItem('token');
    this.tipoProceso =decode(token);
    this.listRiskFunction();
    this.listProcesosFunct();
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

     ////// Mensajes //////
     mensajeFinal(res : any){
      if (res.ok) {
        Swal.fire({
          title:'Correcto',
          text: `El Risk Asssessment se culmino de forma correcta`,
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
