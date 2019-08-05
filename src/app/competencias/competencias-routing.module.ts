import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CompetenciaCadastroComponent } from './competencia-cadastro/competencia-cadastro.component';
import { CompetenciasPesquisaComponent } from './competencias-pesquisa/competencias-pesquisa.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [

{
  path: '', component: CompetenciasPesquisaComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_PESQUISAR_COMPETENCIA']}
},
{
  path: ':codigo', component: CompetenciaCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_COMPETENCIA']}
},
{
  path: 'novo', component: CompetenciaCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_COMPETENCIA']}
}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CompetenciasRoutingModule { }
