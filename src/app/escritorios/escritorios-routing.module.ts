import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { EscritoriosPesquisaComponent } from './escritorios-pesquisa/escritorios-pesquisa.component';
import { EscritorioCadastroComponent } from './escritorio-cadastro/escritorio-cadastro.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [

{
  path: '', component: EscritoriosPesquisaComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_PESQUISAR_ESCRITORIO']}
},
{
  path: ':codigo', component: EscritorioCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_ESCRITORIO']}
},
{
  path: 'novo', component: EscritorioCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_ESCRITORIO']}
}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EscritoriosRoutingModule { }
