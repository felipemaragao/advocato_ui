import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { VaraCadastroComponent } from './vara-cadastro/vara-cadastro.component';
import { VarasPesquisaComponent } from './varas-pesquisa/varas-pesquisa.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [

{
  path: '', component: VarasPesquisaComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_PESQUISAR_VARA']}
},
{
  path: ':codigo', component: VaraCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_VARA']}
},
{
  path: 'novo', component: VaraCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_VARA']}
}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class VarasRoutingModule { }
