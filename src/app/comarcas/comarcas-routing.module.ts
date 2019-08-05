import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ComarcasPesquisaComponent } from './comarcas-pesquisa/comarcas-pesquisa.component';
import { ComarcaCadastroComponent } from './comarca-cadastro/comarca-cadastro.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [

{
  path: '', component: ComarcasPesquisaComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_PESQUISAR_COMARCA']}
},
{
  path: ':codigo', component: ComarcaCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_COMARCA']}
},
{
  path: 'novo', component: ComarcaCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_COMARCA']}
}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ComarcasRoutingModule { }
