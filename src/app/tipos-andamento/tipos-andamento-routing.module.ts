import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { TiposAndamentoPesquisaComponent } from './tipos-andamento-pesquisa/tipos-andamento-pesquisa.component';
import { TipoAndamentoCadastroComponent } from './tipo-andamento-cadastro/tipo-andamento-cadastro.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [

{
  path: '', component: TiposAndamentoPesquisaComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_PESQUISAR_TIPO_ANDAMENTO']}
},
{
  path: ':codigo', component: TipoAndamentoCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_TIPO_ANDAMENTO']}
},
{
  path: 'novo', component: TipoAndamentoCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_TIPO_ANDAMENTO']}
}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TiposAndamentoRoutingModule { }
