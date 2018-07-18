import { CidadesRoutingModule } from './cidades-routing.module';
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
import { DataTableModule } from 'primeng/datatable';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/primeng';

import { InputMaskModule } from 'primeng/inputmask';


import { SharedModule } from './../shared/shared.module';
import { CidadeCadastroComponent } from './cidade-cadastro/cidade-cadastro.component';
import { CidadePesquisaComponent } from './cidade-pesquisa/cidade-pesquisa.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    CurrencyMaskModule,
    InputMaskModule,
    SharedModule,
    CidadesRoutingModule,
    FieldsetModule,
    InputMaskModule
  ],
  declarations: [CidadeCadastroComponent, CidadePesquisaComponent]
})
export class CidadesModule { }
