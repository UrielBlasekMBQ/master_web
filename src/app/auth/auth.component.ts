import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public formLogin: FormGroup;
  incorrecto = false;

  constructor (private formBuilder: FormBuilder, private AuthService: AuthService, private router: Router) { 
    this.formLogin = this.formBuilder.group({
      usuario:['',[Validators.required]],
      password:['',[Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  login(){
    this.formLogin.value
    console.log(this.formLogin.value);
    this.AuthService.singin(this.formLogin.value).subscribe((res: any)=>{
      console.log(res);
      
      if (res.length == 0) {
        console.log('No tiene token');
        this.incorrecto = true;
        
      }else{
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
        localStorage.setItem('inicio', '0');
      }
    });
    
  }

}
