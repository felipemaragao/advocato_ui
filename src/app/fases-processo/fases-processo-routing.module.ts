import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { FasesCadastroComponent } from './fases-cadastro/fases-cadastro.component';
import { FasesPesquisaComponent } from './fases-pesquisa/fases-pesquisa.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [

{
  path: 'fasesProcesso', component: FasesPesquisaComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_PESQUISAR_FASE_PROCESSO']}
},
{
  path: 'fasesProcesso/:codigo', component: FasesCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_FASE_PROCESSO']}
},
{
  path: 'fasesProcesso/novo', component: FasesCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_FASE_PROCESSO']}
}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FasesProcessoRoutingModule { }
