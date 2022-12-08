import { EmailService } from 'src/app/services/email.service';
import { Component, OnInit } from '@angular/core';
import  decode  from 'jwt-decode';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-configura-usuario',
  templateUrl: './configura-usuario.component.html',
  styleUrls: ['./configura-usuario.component.css']
})
export class ConfiguraUsuarioComponent implements OnInit {

  public formUsuario: FormGroup; 
  public formUsuario1: FormGroup; 
  public formUsuario2: FormGroup; 
  public formUsuario3: FormGroup; 

  constructor(private UsuariosService :UsuariosService, private formBuilder: FormBuilder, private EmailService : EmailService) { 

    this.formUsuario= this.formBuilder.group({
      email: ['',[Validators.required]],
    });

    this.formUsuario1= this.formBuilder.group({
      password: ['',[Validators.required]],
    });
    this.formUsuario2= this.formBuilder.group({
      nombre: ['',[Validators.required]],
      apellidos: ['',[Validators.required]],
    });

    this.formUsuario3= this.formBuilder.group({
      foto: ['',[Validators.required]],
    });
    
   }

  tipoProceso : any;

  getDatosUusario(){
    let body ={'id_usuario' : this.tipoProceso.id_usuario};
    this.UsuariosService.get_un_usuario(body).subscribe((res : any)=>{
      //console.log(res);
      
    this.tipoProceso = res[0];
  });
  }

  /// Cambio de contraseña
  cambioPassword(){
    let body ={'id_usuario' : this.tipoProceso.id_usuario, 'password' : this.formUsuario1.value.password };
    this.UsuariosService.cambioPassword(body).subscribe((res:any)=>{
      //console.log(res);
      let text = 'Tu nueva contraseña es: ' + this.tipoProceso.password;
      let body_email ={'email' : this.tipoProceso.email, 'nombre' : this.tipoProceso.nombre,
                       'apellidos' : this.tipoProceso.apellidos, 'mensaje1' : 'El cambio de tu contraseña se realizo con exito', 'mensaje2' : text };
      this.EmailService.sendData(body_email).subscribe((res:any)=>{});
      
      this.mensajeUpdate(res);
    });
  }

    /// Cambio de contraseña
    cambioEmail(){
      let body ={'id_usuario' : this.tipoProceso.id_usuario, 'email' : this.formUsuario.value.email };
      this.UsuariosService.cambioEmail(body).subscribe((res:any)=>{
        //console.log(res);
        window.location.reload();
        this.mensajeUpdate(res);
      });
    }

    /// Cambio de nombres y apellidos
    cambioNombreApellidos(){
      let body ={'id_usuario' : this.tipoProceso.id_usuario, 'nombre' : this.formUsuario2.value.nombre, 'apellidos' : this.formUsuario2.value.apellidos };
      this.UsuariosService.cambioNombreApellidos(body).subscribe((res:any)=>{
        //console.log(res);
        window.location.reload();
        this.mensajeUpdate(res);
      });

    }

    archivos : any;

    // Captura de file 
    capturarFile(event: any){
      const [file]= event.target.files;
    
    this.archivos={
      fileRaw: file,
      fileName: file.name
    };
     console.log('si entro', this.archivos); 
  }

  /// Enviar de al back
  updateFotoPerfil(){
    let body_from={
      'myFile1' : this.archivos.fileRaw,
      'myFile2' : this.archivos.fileName
    }

    const body = new FormData();
    body.append('myFile', body_from.myFile1, body_from.myFile2);
    body.append('id_usuario', this.tipoProceso.id_usuario);
    console.log(body);

    this.UsuariosService.cambioFoto(body).subscribe((res:any)=>{
      this.formUsuario3.reset();
    });



  }




  ngOnInit(): void {
    /// Procesos ///
    const token: any = localStorage.getItem('token');
    this.tipoProceso =decode(token);
    console.log(this.tipoProceso);
    
    this.getDatosUusario();
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

}
