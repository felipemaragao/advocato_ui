import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LocalizacaoCadastroComponent } from './localizacao-cadastro/localizacao-cadastro.component';
import { LocalizacoesPesquisaComponent } from './localizacoes-pesquisa/localizacoes-pesquisa.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [

{
  path: '', component: LocalizacoesPesquisaComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_PESQUISAR_LOCALIZACAO']}
},
{
  path: ':codigo', component: LocalizacaoCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_LOCALIZACAO']}
},
{
  path: 'novo', component: LocalizacaoCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_LOCALIZACAO']}
}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LocalizacoesRoutingModule { }
