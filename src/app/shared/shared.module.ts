import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent
  ],
  exports:[
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ]
})
export class SharedModule { }
