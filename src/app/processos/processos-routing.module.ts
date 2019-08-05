import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProcessoCadastroComponent } from './processo-cadastro/processo-cadastro.component';
import { ProcessosPesquisaComponent } from './processos-pesquisa/processos-pesquisa.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [

{
  path: '',
  component: ProcessosPesquisaComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_PESQUISAR_PROCESSO']}

},
{
  path: ':codigo',
  component: ProcessoCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_PROCESSO']}
},
{
  path: 'novo',
  component: ProcessoCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_PROCESSO']}
}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProcessosRoutingModule { }
