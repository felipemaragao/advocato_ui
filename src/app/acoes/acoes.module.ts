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
import { AcoesRoutingModule } from './acoes-routing.module';
import { AcaoPesquisaComponent } from './acao-pesquisa/acao-pesquisa.component';
import { AcaoCadastroComponent } from './acao-cadastro/acao-cadastro.component';


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
    AcoesRoutingModule,
    FieldsetModule,
    InputMaskModule
  ],
  declarations: [
    AcaoPesquisaComponent,
    AcaoCadastroComponent
  ],
    exports: []
})
export class AcoesModule { }
