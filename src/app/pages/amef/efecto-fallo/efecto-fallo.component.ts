import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EfectoService } from 'src/app/services/efecto.service';


@Component({
  selector: 'app-efecto-fallo',
  templateUrl: './efecto-fallo.component.html',
  styleUrls: ['./efecto-fallo.component.css']
})
export class EfectoFalloComponent implements OnInit {

  public formUsuario: FormGroup;
  public formUsuario1: FormGroup;

  constructor(private formBuilder : FormBuilder, private EfectoService : EfectoService) {

    this.formUsuario= this.formBuilder.group({
      nom_efecto: ['',[Validators.required]]
    });

    this.formUsuario1= this.formBuilder.group({
      nom_efecto: ['',[Validators.required]]
    });

   }

  p : number =1;
  listEfectos : any;
  efecto : any
  body: any ={
    id_efecto : 0,
    nom_efecto : ''
  };

  // Get efectos
  getEfectos(){
    this.EfectoService.getEfectos().subscribe((res: any)=>{
      this.listEfectos = res;
     //  console.log(this.listEfectos);
      
    });
  }

  //Add Efecto
  addEfecto (){
    this.body.nom_efecto=this.formUsuario.value.nom_efecto;
    this.EfectoService.addEfecto(this.body).subscribe((res: any) =>{
     //  console.log(res);
      this.getEfectos();
      
    });

  }

    // update Efecto
  updateEfectos(){
    this.body.id_efecto = this.efecto.id_efecto;
    this.body.nom_efecto = this.formUsuario1.value.nom_efecto;
    this.EfectoService.updateEfecto(this.body).subscribe((res : any)=>{
     //  console.log(res);
      this.getEfectos();

      
    });
  }

  deleteEfecto(){
    this.EfectoService.deleteEfecto(this.efecto).subscribe((res : any)=>{
     //  console.log(res);
      this.getEfectos();
      
    });
  }

  llenarModal(efecto :any){
    this.efecto = efecto;
    this.formUsuario1.setValue({
      nom_efecto : this.efecto.nom_efecto
    });
    
  }


cleanForm(){
  this.formUsuario.setValue({
    nom_efecto : ''
  });

}

  ngOnInit(): void {
    this.getEfectos();
  }

}
