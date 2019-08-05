import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { FaseCadastroComponent } from './fase-cadastro/fase-cadastro.component';
import { FasesPesquisaComponent } from './fases-pesquisa/fases-pesquisa.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [

{
  path: '', component: FasesPesquisaComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_PESQUISAR_FASE_PROCESSO']}
},
{
  path: ':codigo', component: FaseCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_FASE_PROCESSO']}
},
{
  path: 'novo', component: FaseCadastroComponent,
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
