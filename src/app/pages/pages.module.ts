import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManualCalidadComponent } from './manual-calidad/manual-calidad.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { TreeModule } from '@circlon/angular-tree-component';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import  { PdfViewerModule  }  from  'ng2-pdf-viewer';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { NgSelectModule } from '@ng-select/ng-select';

import {A11yModule} from '@angular/cdk/a11y';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import { ManualOperacionesComponent } from './manual-operaciones/manual-operaciones.component';
import { ProcedimientosComponent } from './procedimientos/procedimientos.component';
import { HttpClientModule } from '@angular/common/http';
import { ControlDocumentoComponent } from './control-documento/control-documento.component';
import { NormasIsoComponent } from './normas-iso/normas-iso.component';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { PermisosComponent } from './usuarios/permisos/permisos.component';

import { AprobacionComponent } from './control-documento/aprobacion/aprobacion.component';
import { RevisionComponent } from './control-documento/revision/revision.component';
import { LegalComponent } from './normas-iso/legal/legal.component';
import { SettingsComponent } from './settings/settings.component';

//Provider
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { SolicitaAcomComponent } from './acompanamiento/solicita-acom/solicita-acom.component';
import { RevisaAcomComponent } from './acompanamiento/revisa-acom/revisa-acom.component';
import { FodaComponent } from './diagramas/foda/foda.component';
import { TortugaComponent } from './diagramas/tortuga/tortuga.component';
import { EfectoFalloComponent } from './amef/efecto-fallo/efecto-fallo.component';
import { AmefComponent } from './amef/amef/amef.component';
import { HistorialComponent } from './historial/historial.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { ConfiguraUsuarioComponent } from './configura-usuario/configura-usuario.component';
import { CapacitacionComponent } from './capacitacion/capacitacion.component';
import { ContratosComponent } from './contratos/contratos.component';

  




@NgModule({
  declarations: [
    ManualCalidadComponent,
    PagesComponent,
    DashboardComponent,
    NopageFoundComponent,
    UsuariosComponent,
    ManualOperacionesComponent,
    ProcedimientosComponent,
    ControlDocumentoComponent,
    NormasIsoComponent,
    DepartamentosComponent,
    PermisosComponent,
    AprobacionComponent,
    RevisionComponent,
    LegalComponent,
    SettingsComponent,
    SolicitaAcomComponent,
    RevisaAcomComponent,
    FodaComponent,
    TortugaComponent,
    EfectoFalloComponent,
    AmefComponent,
    HistorialComponent,
    ConfiguracionComponent,
    ConfiguraUsuarioComponent,
    CapacitacionComponent,
    ContratosComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    TreeGridModule,
    MatTreeModule,
    MatIconModule,
    A11yModule,
    CdkAccordionModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    PdfViewerModule,
    NgxPaginationModule,
    NgSelectModule,

    
    
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,


  ],

  providers:[
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService
  ],
  exports:[
    PagesComponent,
    DashboardComponent,
  ],
})
export class PagesModule { }
