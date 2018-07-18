import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdvogadosPesquisaComponent } from './advogados-pesquisa/advogados-pesquisa.component';
import { AdvogadoCadastroComponent } from './advogado-cadastro/advogado-cadastro.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [

{
  path: '', component: AdvogadosPesquisaComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_PESQUISAR_ADVOGADO']}
},
{
  path: ':codigo', component: AdvogadoCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_ADVOGADO']}
},
{
  path: 'novo', component: AdvogadoCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_ADVOGADO']}
}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdvogadosRoutingModule { }
