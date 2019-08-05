import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from '../seguranca/auth.guard';


import { AndamentoCadastroComponent } from './andamento-cadastro/andamento-cadastro.component';
import { AndamentosPesquisaComponent } from './andamentos-pesquisa/andamentos-pesquisa.component';



const routes: Routes = [
  {
    path: '',
    component: AndamentosPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_ANDAMENTO'] }
  },
  {
    path: 'novo',
    component: AndamentoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_ANDAMENTO'] }
  },
  {
    path: ':codigo',
    component: AndamentoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_ANDAMENTO'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AndamentosRoutingModule { }
