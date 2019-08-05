import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { StatusEscritorioCadastroComponent } from './status-escritorio-cadastro/status-escritorio-cadastro.component';
import { StatusEscritoriosPesquisaComponent } from './status-escritorios-pesquisa/status-escritorios-pesquisa.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [

{
  path: '', component: StatusEscritoriosPesquisaComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_PESQUISAR_STATUS_ESCRITORIO']}
},
{
  path: ':codigo', component: StatusEscritorioCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_STATUS_ESCRITORIO']}
},
{
  path: 'novo', component: StatusEscritorioCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_STATUS_ESCRITORIO']}
}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StatusEscritoriosRoutingModule { }
