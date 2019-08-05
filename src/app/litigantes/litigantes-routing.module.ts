import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LitigantesPesquisaComponent } from './litigantes-pesquisa/litigantes-pesquisa.component';
import { LitiganteCadastroComponent } from './litigante-cadastro/litigante-cadastro.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [

{
  path: '', component: LitigantesPesquisaComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_PESQUISAR_LITIGANTE']}
},
{
  path: ':codigo', component: LitiganteCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_LITIGANTE']}
},
{
  path: 'novo', component: LitiganteCadastroComponent,
  canActivate: [AuthGuard],
  data: {roles: ['ROLE_CADASTRAR_LITIGANTE']}
}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LitigantesRoutingModule { }
