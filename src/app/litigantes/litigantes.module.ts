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

import { SharedModule } from '../shared/shared.module';
import { LitigantesRoutingModule } from './litigantes-routing.module';

import { LitiganteCadastroComponent } from './litigante-cadastro/litigante-cadastro.component';
import { LitigantesPesquisaComponent } from './litigantes-pesquisa/litigantes-pesquisa.component';

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
    LitigantesRoutingModule,
    FieldsetModule,
    InputMaskModule
  ],
  declarations: [
    LitiganteCadastroComponent,
    LitigantesPesquisaComponent
  ],
  exports: []
})
export class LitigantesModule { }
