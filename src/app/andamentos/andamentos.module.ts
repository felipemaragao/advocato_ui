import { RouterModule } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { PdfViewerModule } from 'ng2-pdf-viewer';




import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { SharedModule } from '../shared/shared.module';

import { AndamentosRoutingModule } from './andamentos-routing.module';
import { AndamentosPesquisaComponent } from './andamentos-pesquisa/andamentos-pesquisa.component';
import { AndamentoCadastroComponent } from './andamento-cadastro/andamento-cadastro.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormGroup,

    AndamentosRoutingModule,
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
    DialogModule,
    PanelModule,
    FileUploadModule,
    ProgressSpinnerModule,
    PdfViewerModule
  ],
  declarations: [
    AndamentoCadastroComponent,
    AndamentosPesquisaComponent,

  ],
  exports: []
})
export class AndamentosModule { }
