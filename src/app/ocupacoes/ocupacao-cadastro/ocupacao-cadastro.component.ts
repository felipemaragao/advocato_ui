import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';
import { Component, OnInit } from '@angular/core';

import { OcupacaoFiltro } from '../ocupacao.service';
import { Title } from '@angular/platform-browser';


import { Ocupacao } from '../../core/model';
import { OcupacaoService } from '../ocupacao.service';

import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-ocupacao-cadastro',
  templateUrl: './ocupacao-cadastro.component.html',
  styleUrls: ['./ocupacao-cadastro.component.css']
})
export class OcupacaoCadastroComponent implements OnInit {

  ocupacao = new Ocupacao();
  totalRegistros = 0;
  filtro = new OcupacaoFiltro();



  constructor(
    private ocupacaoService: OcupacaoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit() {

  const idOcupacao = this.route.snapshot.params['codigo'];
  this.title.setTitle(`Nova Ocupação`);
   if (idOcupacao > 0) {
      this.carregarOcupacao(idOcupacao);
    }
  }


carregarOcupacao(codigo: number) {
  this.ocupacaoService.buscarPorCodigo(codigo)
    .then(ocupacao => {
      this.ocupacao = ocupacao;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
}


salvar(form: FormControl) {
  if (this.editando) {
    this.atualizarOcupacao(form);
  } else {
    this.adicionarOcupacao(form);
  }
}


adicionarOcupacao(form: FormControl) {
  this.ocupacaoService.adicionar(this.ocupacao)
  .then(ocupacaoAdicionada => {
    this.messageService.add({severity: 'error', detail: 'Ocupação salva com sucesso.'});
    this.router.navigate(['/ocupacoes', ocupacaoAdicionada.codigo]);
  })
  .catch(erro => this.errorHandler.handle(erro));

}

atualizarOcupacao(form: FormControl) {
  this.ocupacaoService.atualizar(this.ocupacao)
  .then(ocupacao => {
   this.ocupacao = ocupacao;
   this.messageService.add({severity: 'success', detail: 'Comarca atualizada com sucesso.'});
   this.atualizarTituloEdicao();
  })
  .catch(erro => this.errorHandler.handle(erro));

}

get editando() {
  return Boolean(this.ocupacao.codigo);
}

nova(form: FormControl) {
  form.reset();
  setTimeout(function() {
    this.comarca = new Ocupacao();
  }.bind(this), 1);
  this.router.navigate(['/ocupacoes/novo']);
}

atualizarTituloEdicao() {
  this.title.setTitle(`Edição de Ocupação: ${this.ocupacao.nome}`);
}


}

