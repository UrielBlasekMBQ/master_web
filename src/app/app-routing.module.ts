import { CapacitacionComponent } from './pages/capacitacion/capacitacion.component';
import { ConfiguraUsuarioComponent } from './pages/configura-usuario/configura-usuario.component';
import { PermisosComponent } from './pages/usuarios/permisos/permisos.component';
import { DepartamentosComponent } from './pages/departamentos/departamentos.component';
import { NopageFoundComponent } from './pages/nopage-found/nopage-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ManualCalidadComponent } from './pages/manual-calidad/manual-calidad.component';
import { PagesComponent } from './pages/pages.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ManualOperacionesComponent } from './pages/manual-operaciones/manual-operaciones.component';
import { ProcedimientosComponent } from './pages/procedimientos/procedimientos.component';
import { ControlDocumentoComponent } from './pages/control-documento/control-documento.component';
import { NormasIsoComponent } from './pages/normas-iso/normas-iso.component';


import { AprobacionComponent } from './pages/control-documento/aprobacion/aprobacion.component';
import { RevisionComponent } from './pages/control-documento/revision/revision.component';
import { LegalComponent } from './pages/normas-iso/legal/legal.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AuthGuard } from './guards/auth.guard';
import { SolicitaAcomComponent } from './pages/acompanamiento/solicita-acom/solicita-acom.component';
import { RevisaAcomComponent } from './pages/acompanamiento/revisa-acom/revisa-acom.component';
import { FodaComponent } from './pages/diagramas/foda/foda.component';
import { TortugaComponent } from './pages/diagramas/tortuga/tortuga.component';
import { EfectoFalloComponent } from './pages/amef/efecto-fallo/efecto-fallo.component';
import { AmefComponent } from './pages/amef/amef/amef.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { ContratosComponent } from './pages/contratos/contratos.component';
import { RiskComponent } from './pages/risk/risk.component';
import { RiskRespondeComponent } from './pages/risk-responde/risk-responde.component';




const routes: Routes = [
  {path: 'dashboard', component:PagesComponent,canActivate: [AuthGuard],
  children: [
    {path: '', component:DashboardComponent },
    {path: 'manual-calidad', component:ManualCalidadComponent, canActivate: [AuthGuard]  },
    {path: 'manual-operaciones', component:ManualOperacionesComponent,canActivate: [AuthGuard] },
    {path: 'registros', component: ProcedimientosComponent, canActivate: [AuthGuard]},
    {path: 'normas-iso', component: NormasIsoComponent, canActivate: [AuthGuard]},
    {path: 'asignacion-documentos', component: ControlDocumentoComponent, canActivate: [AuthGuard]},
    {path: 'procesos' , component: DepartamentosComponent, canActivate: [AuthGuard]},
    {path: 'usuarios', component:UsuariosComponent, canActivate: [AuthGuard]},
    {path: 'permisos-usuarios', component:PermisosComponent, canActivate: [AuthGuard]},
    {path: 'revision-documentos', component:RevisionComponent, canActivate: [AuthGuard]},
    {path: 'aprobacion-documentos', component:AprobacionComponent, canActivate: [AuthGuard]},
    {path: 'marco-legal', component:LegalComponent, canActivate: [AuthGuard]},
    {path: 'settings', component:SettingsComponent, canActivate: [AuthGuard]},
    {path: 'revisa_acompanamiento', component:RevisaAcomComponent, canActivate: [AuthGuard]},
    {path: 'solicita-acompanamiento', component:SolicitaAcomComponent, canActivate: [AuthGuard]},
    {path: 'diagrama-foda', component:FodaComponent, canActivate: [AuthGuard]},
    {path: 'diagrama-tortuga', component:TortugaComponent, canActivate: [AuthGuard]},
    {path: 'efecto', component:EfectoFalloComponent, canActivate: [AuthGuard]},
    {path: 'amef', component:AmefComponent, canActivate: [AuthGuard]},
    {path: 'historial', component: HistorialComponent, canActivate: [AuthGuard]},
    {path: 'configuracion', component: ConfiguracionComponent, canActivate: [AuthGuard]},
    {path: 'configuracion_usuario', component: ConfiguraUsuarioComponent, canActivate: [AuthGuard]},
    {path: 'capacitacion', component: CapacitacionComponent, canActivate: [AuthGuard]},
    {path: 'contratos', component: ContratosComponent, canActivate: [AuthGuard]},
    {path: 'risk', component: RiskComponent, canActivate: [AuthGuard]},
    {path: 'risk_responde', component: RiskRespondeComponent, canActivate: [AuthGuard]},
  ]
},
  {path:'',redirectTo:'/dashboard',pathMatch:'full'},
  {path: 'login', component: AuthComponent},
  {path: '**', component: NopageFoundComponent},
  {path: 'notFound', component:NopageFoundComponent},
  {path: 'notFound', component:NopageFoundComponent},


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
