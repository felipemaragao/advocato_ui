import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AcaoPesquisaComponent } from './acao-pesquisa/acao-pesquisa.component';
import { AcaoCadastroComponent } from './acao-cadastro/acao-cadastro.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [

{
  path: '', component: AcaoPesquisaComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_PESQUISAR_TIPO_ACAO']}
},
{
  path: ':codigo', component: AcaoCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_TIPO_ACAO']}
},
{
  path: 'novo', component: AcaoCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_TIPO_ACAO']}
}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AcoesRoutingModule { }
