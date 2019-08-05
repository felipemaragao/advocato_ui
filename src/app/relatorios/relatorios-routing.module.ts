import { AuthGuard } from '../seguranca/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelatorioAndamentoComponent } from './relatorio-andamento/relatorio-andamento.component';
import { RelatorioProcessoComponent } from './relatorio-processo/relatorio-processo.component';
import { RelatorioAgendaAdvogadoComponent } from './relatorio-agenda-advogado/relatorio-agenda-advogado.component';

const routes: Routes = [
  {
    path: 'andamentos',
    component: RelatorioAndamentoComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_RELATORIO_ANDAMENTO']}
  },
  {
    path: 'processos',
    component: RelatorioProcessoComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_RELATORIO_PROCESSO']}
  },
  {
    path: 'agendaAdvogado',
    component: RelatorioAgendaAdvogadoComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_RELATORIO_AGENDA_ADVOGADO']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatoriosRoutingModule { }
