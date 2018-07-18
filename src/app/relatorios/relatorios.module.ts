import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './../shared/shared.module';

import { CalendarModule } from 'primeng/calendar';


import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatorioAndamentosComponent } from './relatorio-andamentos/relatorio-andamentos.component';
import { RelatorioProcessosComponent } from './relatorio-processos/relatorio-processos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    CalendarModule,
    RelatoriosRoutingModule,
    SharedModule
  ],
  declarations: [RelatorioAndamentosComponent, RelatorioProcessosComponent]
})
export class RelatoriosModule { }
