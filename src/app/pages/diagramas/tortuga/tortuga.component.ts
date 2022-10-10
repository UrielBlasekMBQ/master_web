import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-tortuga',
  templateUrl: './tortuga.component.html',
  styleUrls: ['./tortuga.component.css']
})
export class TortugaComponent implements OnInit {

  public convertToPDF(){
    html2canvas(document.getElementById("contentToConvert")!).then(canvas => {
    // Few necessary setting options
     
    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
    var width = pdf.internal.pageSize.getWidth();
    var height = canvas.height * width / canvas.width;
    pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height)
    pdf.save('Tortuga.pdf'); // Generated PDF
    });
    }
  
  public formConque: FormGroup;
  public formConquien: FormGroup;
  public formEntrada: FormGroup;
  public formProceso: FormGroup;
  public formSalida: FormGroup;
  public formCriterio: FormGroup;
  public formComo: FormGroup;

  constructor(private formBuilder : FormBuilder) {

    this.formConque= this.formBuilder.group({
      conque: ['',[Validators.required]]
    });

    this.formConquien= this.formBuilder.group({
      conquien: ['',[Validators.required]]
    });

    this.formEntrada= this.formBuilder.group({
      entrada: ['',[Validators.required]]
    });

    this.formProceso= this.formBuilder.group({
      proceso: ['',[Validators.required]]
    });

    this.formSalida= this.formBuilder.group({
      salida: ['',[Validators.required]]
    });

    this.formCriterio= this.formBuilder.group({
      criterio: ['',[Validators.required]]
    });

    this.formComo= this.formBuilder.group({
      como: ['',[Validators.required]]
    });



   }


   listConque : any = [];
   listConquien : any = [];
   listEntrada : any = [];
   listProceso : any = [];
   listSalida : any = [];
   listCriterio : any = [];
   listComo : any = [];
   index : any;

   add: any = true;
   conf : any = false;


    /////// Con que  /////
   //add
   saveConque(){
    this.listConque.push(this.formConque.value);
   //  console.log(this.listConque);
   }

   //update
   updateConque(){  
    this.listConque[this.index].conque=this.formConque.value.conque;
   }

   //Delete 
   deleteConque(){
    this.listConque.splice(this.index, 1);
   }

   clicConque(conque : any,i : any ){
    this.index = i;
    this.formConque.setValue({
      conque : conque.conque
    });
      this.add = false;
      this.conf = true;
   }

      /////// Con que  /////



          /////// Con quien  /////
   //add
   saveConquien(){
    this.listConquien.push(this.formConquien.value);
   //  console.log(this.listConquien);
   }

   //update
   updateConquien(){  
    this.listConquien[this.index].conquien=this.formConquien.value.conquien;
   }

   //Delete 
   deleteConquien(){
    this.listConquien.splice(this.index, 1);
   }

   clicConquien(conquien : any,i : any ){
    this.index = i;
    this.formConquien.setValue({
      conquien : conquien.conquien
    });
      this.add = false;
      this.conf = true;
   }

      /////// Con quien  /////


                /////// Con quien  /////
   //add
   saveEntrada(){
    this.listEntrada.push(this.formEntrada.value);
   //  console.log(this.listEntrada);
   }

   //update
   updateEntrada(){  
    this.listEntrada[this.index].entrada=this.formEntrada.value.entrada;
   }

   //Delete 
   deleteEntrada(){
    this.listEntrada.splice(this.index, 1);
   }

   clicEntrada(entrada : any,i : any ){
    this.index = i;
    this.formEntrada.setValue({
      entrada : entrada.entrada
    });
      this.add = false;
      this.conf = true;
   }

      /////// Con quien  /////


          /////// Proceso  /////
   //add
   saveProceso(){
    this.listProceso.push(this.formProceso.value);
   //  console.log(this.listProceso);
   }

   //update
   updateProceso(){  
    this.listProceso[this.index].proceso=this.formProceso.value.proceso;
   }

   //Delete 
   deleteProceso(){
    this.listProceso.splice(this.index, 1);
   }

   clicProceso(proceso : any,i : any ){
    this.index = i;
    this.formProceso.setValue({
      proceso : proceso.proceso
    });
      this.add = false;
      this.conf = true;
   }

      /////// Proceso /////////

                /////// Salida  /////
   //add
   saveSalida(){
    this.listSalida.push(this.formSalida.value);
   //  console.log(this.listSalida);
   }

   //update
   updateSalida(){  
    this.listSalida[this.index].salida=this.formSalida.value.salida;
   }

   //Delete 
   deleteSalida(){
    this.listSalida.splice(this.index, 1);
   }

   clicSalida(salida : any,i : any ){
    this.index = i;
    this.formSalida.setValue({
      salida : salida.salida
    });
      this.add = false;
      this.conf = true;
   }

      /////// Salida /////////


            /////// Criterio  /////
   //add
   saveCriterio(){
    this.listCriterio.push(this.formCriterio.value);
   //  console.log(this.listCriterio);
   }

   //update
   updateCriterio(){  
    this.listCriterio[this.index].criterio=this.formCriterio.value.criterio;
   }

   //Delete 
   deleteCriterio(){
    this.listCriterio.splice(this.index, 1);
   }

   clicCriterio(criterio : any,i : any ){
    this.index = i;
    this.formCriterio.setValue({
      criterio : criterio.criterio
    });
      this.add = false;
      this.conf = true;
   }

      /////// Criterio /////////

                  /////// Como  /////
   //add
   saveComo(){
    this.listComo.push(this.formComo.value);
   //  console.log(this.listComo);
   }

   //update
   updateComo(){  
    this.listComo[this.index].como=this.formComo.value.como;
   }

   //Delete 
   deleteComo(){
    this.listComo.splice(this.index, 1);
   }

   clicComo(como : any,i : any ){
    this.index = i;
    this.formComo.setValue({
      como : como.como
    });
      this.add = false;
      this.conf = true;
   }

      /////// Como /////////



      cleanForm(){
        this.add = true;
        this.conf = false;
        this.formConque.setValue({
          conque : ''
        });

        this.formConquien.setValue({
          conquien : ''
        });

        this.formEntrada.setValue({
          entrada : ''
        });

        this.formProceso.setValue({
          proceso : ''
        });

        this.formSalida.setValue({
          salida : ''
        });

        this.formCriterio.setValue({
          criterio : ''
        });

        this.formComo.setValue({
          como : ''
        });

        

       }

  ngOnInit(): void {
  }

}
