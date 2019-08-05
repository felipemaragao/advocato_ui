import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { EstadoCadastroComponent } from './estado-cadastro/estado-cadastro.component';
import { EstadosPesquisaComponent } from './estados-pesquisa/estados-pesquisa.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [

{
  path: '', component: EstadosPesquisaComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_PESQUISAR_ESTADO']}
},
{
  path: ':codigo', component: EstadoCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_ESTADO']}
},
{
  path: 'novo', component: EstadoCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_ESTADO']}
}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EstadosRoutingModule { }
