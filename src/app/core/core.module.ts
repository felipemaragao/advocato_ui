import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { GrowlModule} from 'primeng/growl';
import {JwtHelperService} from '@auth0/angular-jwt';


import { ErrorHandlerService } from './error-handler.service';


import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { AdvocatoHttp } from '../seguranca/advocato-http';
import { HttpClientModule } from '@angular/common/http';




registerLocaleData(localePt);



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    GrowlModule,
    ConfirmDialogModule,
    RouterModule,

  ],
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent,

  ],
  exports: [
    NavbarComponent,
    GrowlModule,
    ConfirmDialogModule
  ],
  providers: [
    ConfirmationService,
    MessageService,
    JwtHelperService,
    AdvocatoHttp,
    Title,

    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class CoreModule { }
