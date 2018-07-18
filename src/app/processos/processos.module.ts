import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { FieldsetModule, FileUploadModule } from 'primeng/primeng';
import { PanelModule, Panel } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';




import { InputMaskModule } from 'primeng/components/inputmask/inputmask';


import { SharedModule } from './../shared/shared.module';
import { ProcessosGridComponent } from './processos-grid/processos-grid.component';
import { ProcessosPesquisaComponent } from './processos-pesquisa/processos-pesquisa.component';
import { ProcessoCadastroComponent } from './processo-cadastro/processo-cadastro.component';
import { ProcessosRoutingModule } from './processos-routing.module';
import { ProcessoCadastroAcompanhamentoComponent } from './processo-cadastro-acompanhamento/processo-cadastro-acompanhamento.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FieldsetModule,

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
    ProcessosRoutingModule,
    DialogModule,
    PanelModule,
    FileUploadModule
  ],
  declarations: [
    ProcessoCadastroComponent,
    ProcessosPesquisaComponent,
    ProcessosGridComponent,
    ProcessoCadastroAcompanhamentoComponent
  ],
  exports: []
})
export class ProcessosModule { }
