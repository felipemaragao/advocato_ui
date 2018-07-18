import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RelatoriosModule } from './relatorios/relatorios.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './core/nao-autorizado.component';

import { ProcessoCadastroComponent } from './processos/processo-cadastro/processo-cadastro.component';
import { ProcessosPesquisaComponent } from './processos/processos-pesquisa/processos-pesquisa.component';

import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';

import { AndamentoCadastroComponent } from './andamentos/andamento-cadastro/andamento-cadastro.component';
import { AndamentosPesquisaComponent } from './andamentos/andamentos-pesquisa/andamentos-pesquisa.component';

import { AcaoCadastroComponent } from './acoes/acao-cadastro/acao-cadastro.component';
import { AcaoPesquisaComponent } from './acoes/acao-pesquisa/acao-pesquisa.component';

import { LitiganteCadastroComponent } from './litigantes/litigante-cadastro/litigante-cadastro.component';
import { LitigantesPesquisaComponent } from './litigantes/litigantes-pesquisa/litigantes-pesquisa.component';

import { AdvogadoCadastroComponent } from './advogados/advogado-cadastro/advogado-cadastro.component';
import { AdvogadosPesquisaComponent } from './advogados/advogados-pesquisa/advogados-pesquisa.component';

import { EscritorioCadastroComponent } from './escritorios/escritorio-cadastro/escritorio-cadastro.component';
import { EscritoriosPesquisaComponent } from './escritorios/escritorios-pesquisa/escritorios-pesquisa.component';

import { UsuarioCadastroComponent } from './usuarios/usuario-cadastro/usuario-cadastro.component';
import { UsuariosPesquisaComponent } from './usuarios/usuarios-pesquisa/usuarios-pesquisa.component';

import { ComarcaCadastroComponent } from './comarcas/comarca-cadastro/comarca-cadastro.component';
import { ComarcasPesquisaComponent } from './comarcas/comarcas-pesquisa/comarcas-pesquisa.component';


const routes: Routes = [

  { path: 'processos', loadChildren: 'app/processos/processos.module#ProcessosModule' },
  { path: 'andamentos', loadChildren: 'app/andamentos/andamentos.module#AndamentosModule' },
  { path: 'pessoas', loadChildren: 'app/pessoas/pessoas.module#PessoasModule' },
  { path: 'tiposAcao', loadChildren: 'app/acoes/acoes.module#AcoesModule' },
  { path: 'litigantes', loadChildren: 'app/litigantes/litigantes.module#LitigantesModule' },

  { path: 'advogados', loadChildren: 'app/advogados/advogados.module#AdvogadosModule' },
  { path: 'escritorios', loadChildren: 'app/escritorios/escritorios.module#EscritoriosModule' },

  { path: 'comarcas', loadChildren: 'app/comarcas/comarcas.module#ComarcasModule' },

  { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule'},
  { path: 'relatorios', loadChildren: 'app/relatorios/relatorios.module#RelatoriosModule' },

  { path: 'usuarios', loadChildren: 'app/usuarios/usuarios.module#UsuariosModule' },


  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'nao-autorizado', component: NaoAutorizadoComponent},
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada'}

];


@NgModule({

  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule
  ]

})
export class AppRoutingModule { }
