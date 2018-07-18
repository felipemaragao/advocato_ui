import { AuthGuard } from './../seguranca/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelatorioAndamentosComponent } from './relatorio-andamentos/relatorio-andamentos.component';

const routes: Routes = [
  {
    path: 'andamentos',
    component: RelatorioAndamentosComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_PESQUISAR_PROCESSO']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatoriosRoutingModule { }
