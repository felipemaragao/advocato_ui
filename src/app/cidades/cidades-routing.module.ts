import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CidadePesquisaComponent } from './cidade-pesquisa/cidade-pesquisa.component';
import { CidadeCadastroComponent } from './cidade-cadastro/cidade-cadastro.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [

{
  path: 'cidade', component: CidadePesquisaComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_PESQUISAR_CIDADE']}
},
{
  path: 'cidade/:codigo', component: CidadeCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_CIDADE']}
},
{
  path: 'cidade/novo', component: CidadeCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_CIDADE']}
}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CidadesRoutingModule { }
