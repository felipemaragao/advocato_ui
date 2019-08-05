import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';
import { Component, OnInit } from '@angular/core';

import { LocalizacaoFiltro } from '../localizacao.service';
import { Title } from '@angular/platform-browser';


import { Localizacao } from '../../core/model';
import { LocalizacaoService } from '../localizacao.service';

import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-localizacao-cadastro',
  templateUrl: './localizacao-cadastro.component.html',
  styleUrls: ['./localizacao-cadastro.component.css']
})
export class LocalizacaoCadastroComponent implements OnInit {

  localizacao = new Localizacao();
  totalRegistros = 0;
  filtro = new LocalizacaoFiltro();

  comarcaSelecionada: number;
  competenciaSelecionada: number;
  varaSelecionada: number;

  comarcas: any[];
  competencias: any[];
  varas: any[];



  constructor(
    private localizacaoService: LocalizacaoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit() {

  const idLocalizacao = this.route.snapshot.params['codigo'];
  this.title.setTitle(`Nova Localizacao`);

  if (idLocalizacao > 0) {
      this.carregarLocalizacao(idLocalizacao);

    }

    this.carregarComarca();
    this.carregarCompetencia();
    this.carregarVara();
  }

  carregarComarca() {
    this.localizacaoService.listarComarcas().then(comarca => {
      this.comarcas = comarca.map(p => ({ label: p.nome, value: p.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }



  carregarCompetencia() {
    this.localizacaoService.listarCompetencias().then(competencia => {
      this.competencias = competencia.map(p => ({ label: p.nome, value: p.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));

  }

  carregarVara() {
    this.localizacaoService.listarVaras().then(vara => {
      this.varas = vara.map(p => ({ label: p.nome, value: p.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }


  carregarLocalizacao(codigo: number) {
  this.localizacaoService.buscarPorCodigo(codigo)
    .then(localizacao => {
      this.localizacao = localizacao;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
}


salvar(form: FormControl) {
  if (this.editando) {
    this.atualizarLocalizacao(form);
  } else {
    this.adicionarLocalizacao(form);
  }
}


adicionarLocalizacao(form: FormControl) {
  this.localizacaoService.adicionar(this.localizacao)
  .then(localizacaoAdicionada => {
    this.messageService.add({severity: 'success', detail: 'Localizacao salva com sucesso.'});
    this.router.navigate(['/localizacoes', localizacaoAdicionada.codigo]);
  })
  .catch(erro => this.errorHandler.handle(erro));
  this.localizacao = new Localizacao();

}

atualizarLocalizacao(form: FormControl) {
  this.localizacaoService.atualizar(this.localizacao)
  .then(localizacao => {
   this.localizacao = localizacao;
   this.messageService.add({severity: 'success', detail: 'Localização atualizada com sucesso.'});
   this.atualizarTituloEdicao();
  })
  .catch(erro => this.errorHandler.handle(erro));

}

get editando() {
  return Boolean(this.localizacao.codigo);
}

nova(form: FormControl) {
  form.reset();
  setTimeout(function() {
    this.localizacao = new Localizacao();
  }.bind(this), 1);
  this.router.navigate(['/localizacoes/novo']);
}

atualizarTituloEdicao() {
  this.title.setTitle(`Edição de Localização: ${this.localizacao.comarca.nome}`);
}


}

