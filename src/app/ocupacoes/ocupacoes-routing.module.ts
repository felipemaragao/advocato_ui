import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { OcupacoesPesquisaComponent } from './ocupacoes-pesquisa/ocupacoes-pesquisa.component';
import { OcupacaoCadastroComponent } from './ocupacao-cadastro/ocupacao-cadastro.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [

{
  path: '', component: OcupacoesPesquisaComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_PESQUISAR_OCUPACAO']}
},
{
  path: ':codigo', component: OcupacaoCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_OCUPACAO']}
},
{
  path: 'novo', component: OcupacaoCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_OCUPACAO']}
}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OcupacoesRoutingModule { }
