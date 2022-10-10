import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-foda',
  templateUrl: './foda.component.html',
  styleUrls: ['./foda.component.css']
})
export class FodaComponent implements OnInit {

  public convertToPDF(){
    html2canvas(document.getElementById("contentToConvert")!).then(canvas => {
    // Few necessary setting options
     
    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
    var width = pdf.internal.pageSize.getWidth();
    var height = canvas.height * width / canvas.width;
    pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height)
    pdf.save('FODA.pdf'); // Generated PDF
    });
    }
    


  public formFortaleza: FormGroup;
  public formOportunidad : FormGroup;
  public formDebilidad : FormGroup;
  public formAmenaza : FormGroup;

  constructor( private formBuilder : FormBuilder) {

    this.formFortaleza= this.formBuilder.group({
      fortaleza: ['',[Validators.required]]
    });

    this.formOportunidad= this.formBuilder.group({
      oportinidad: ['',[Validators.required]]
    });

    this.formDebilidad= this.formBuilder.group({
      debilidad: ['',[Validators.required]]
    });

    this.formAmenaza= this.formBuilder.group({
      amenaza: ['',[Validators.required]]
    });


   }



   public lisFortaleza : any =[];
   public lisOportunidad : any =[];
   public lisDebilidad : any =[];
   public listAmenaza : any =[];
   index : any;

   add: any = true;
   conf : any = false;
   
      /////// Fortalizas /////
   //add
   saveFortaleza(){
    this.lisFortaleza.push(this.formFortaleza.value);
   //  console.log(this.lisFortaleza);
   }

   //update
   updateFortaleza(){  
    this.lisFortaleza[this.index].fortaleza=this.formFortaleza.value.fortaleza;
   }

   //Delete 
   deleteFortaleza(){
    this.lisFortaleza.splice(this.index, 1);
   }

   clicFortaleza(fortaleza : any,i : any ){
    this.index = i;
    this.formFortaleza.setValue({
      fortaleza : fortaleza.fortaleza
    });
      this.add = false;
      this.conf = true;
   }

      /////// Fortalizas /////


            /////// Oportunidades /////
   //add
   saveOportunidad(){
    this.lisOportunidad.push(this.formOportunidad.value);
   //  console.log(this.lisOportunidad);
   }

   //update
   updateOportunidad(){  
    this.lisOportunidad[this.index].oportinidad=this.formOportunidad.value.oportinidad;
   }

   //Delete 
   deleteOportunidad(){
   //  console.log(this.index);
    
    this.lisOportunidad.splice(this.index, 1);
   }

   clicOportunidad(oportinidad : any,i : any ){
   //  console.log(i);
    
    this.index = i;
    this.formOportunidad.setValue({
      oportinidad : oportinidad.oportinidad
    });
      this.add = false;
      this.conf = true;
   }

      /////// Oportunidades /////


               /////// Debilidad /////
        //add
        saveDebilidad(){
          this.lisDebilidad.push(this.formDebilidad.value);
         //  console.log(this.lisDebilidad);
        }

        //update
        updateDebilidad(){  
          this.lisDebilidad[this.index].debilidad=this.formDebilidad.value.debilidad;
        }

        //Delete 
        deleteDebilidad(){
         //  console.log(this.index);
          
          this.lisDebilidad.splice(this.index, 1);
        }

        clicDebilidad(debilidad : any,i : any ){
         //  console.log(i);
          
          this.index = i;
          this.formDebilidad.setValue({
            debilidad : debilidad.debilidad
          });
            this.add = false;
            this.conf = true;
        }

      /////// Debilidad /////

                     /////// Amenaza /////
        //add
        saveAmenaza(){
          this.listAmenaza.push(this.formAmenaza.value);
         //  console.log(this.listAmenaza);
        }

        //update
        updateAmenaza(){  
          this.listAmenaza[this.index].amenaza=this.formAmenaza.value.amenaza;
        }

        //Delete 
        deleteAmenaza(){
         //  console.log(this.index);
          
          this.listAmenaza.splice(this.index, 1);
        }

        clicAmenaza(amenaza : any,i : any ){
         //  console.log(i);
          
          this.index = i;
          this.formAmenaza.setValue({
            amenaza : amenaza.amenaza
          });
            this.add = false;
            this.conf = true;
        }

      /////// Amenaza /////



  




   cleanForm(){
    this.add = true;
    this.conf = false;
    this.formFortaleza.setValue({
      fortaleza : ''
    });
    this.formOportunidad.setValue({
      oportinidad : ''
    });
    this.formDebilidad.setValue({
      debilidad : ''
    });
    this.formAmenaza.setValue({
      amenaza : ''
    });
   }


  ngOnInit(): void {
  }

}
