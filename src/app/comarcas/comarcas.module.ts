import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/primeng';

import { InputMaskModule } from 'primeng/inputmask';


import { SharedModule } from './../shared/shared.module';
import { ComarcasRoutingModule } from './comarcas-routing.module';
import { ComarcasPesquisaComponent } from './comarcas-pesquisa/comarcas-pesquisa.component';
import { ComarcaCadastroComponent } from './comarca-cadastro/comarca-cadastro.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    CurrencyMaskModule,
    InputMaskModule,
    SharedModule,
    ComarcasRoutingModule,
    FieldsetModule,
    InputMaskModule
  ],
  declarations: [
    ComarcasPesquisaComponent,
    ComarcaCadastroComponent
  ],
    exports: []
})
export class ComarcasModule { }
