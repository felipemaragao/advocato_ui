import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { SharedModule } from '../shared/shared.module';


import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatorioAndamentoComponent } from './relatorio-andamento/relatorio-andamento.component';
import { RelatorioProcessoComponent } from './relatorio-processo/relatorio-processo.component';
import { RelatorioAgendaAdvogadoComponent } from './relatorio-agenda-advogado/relatorio-agenda-advogado.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    CalendarModule,
    DropdownModule,
    RelatoriosRoutingModule,
    InputTextModule,
    ButtonModule,
    SharedModule
  ],
  declarations: [RelatorioAndamentoComponent, RelatorioProcessoComponent, RelatorioAgendaAdvogadoComponent]
})
export class RelatoriosModule { }
