import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';
import { Component, OnInit } from '@angular/core';

import { AcaoFiltro } from './../../acoes/acao.service';
import { Title } from '@angular/platform-browser';


import { TipoAcao } from '../../core/model';
import { AcaoService } from './../acao.service';

import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-acao-cadastro',
  templateUrl: './acao-cadastro.component.html',
  styleUrls: ['./acao-cadastro.component.css']
})
export class AcaoCadastroComponent implements OnInit {

  acao = new TipoAcao();
  totalRegistros = 0;
  filtro = new AcaoFiltro();



  constructor(
    private acaoService: AcaoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit() {

  const idAcao = this.route.snapshot.params['codigo'];
  this.title.setTitle(`Nova Ação`);
   if (idAcao > 0) {
      this.carregarAcao(idAcao);
    }
  }


carregarAcao(codigo: number) {
  this.acaoService.buscarPorCodigo(codigo)
    .then(acao => {
      this.acao = acao;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
}


salvar(form: FormControl) {
  if (this.editando) {
    this.atualizarAcao(form);
  } else {
    this.adicionarAcao(form);
  }
}


adicionarAcao(form: FormControl) {
  this.acaoService.adicionar(this.acao)
  .then(acaoAdicionada => {
    this.messageService.add({severity: 'error', detail: 'Ação salva com sucesso.'});
    this.router.navigate(['/tiposAcao', acaoAdicionada.codigo]);
  })
  .catch(erro => this.errorHandler.handle(erro));

}

atualizarAcao(form: FormControl) {
  this.acaoService.atualizar(this.acao)
  .then(acao => {
   this.acao = acao;
   this.messageService.add({severity: 'success', detail: 'Ação atualizada com sucesso.'});
   this.atualizarTituloEdicao();
  })
  .catch(erro => this.errorHandler.handle(erro));

}

get editando() {
  return Boolean(this.acao.codigo);
}

nova(form: FormControl) {
  form.reset();
  setTimeout(function() {
    this.acao = new TipoAcao();
  }.bind(this), 1);
  this.router.navigate(['/tiposAcao/novo']);
}

atualizarTituloEdicao() {
  this.title.setTitle(`Edição de ação: ${this.acao.descricao}`);
}


}

