import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';
import { Component, OnInit } from '@angular/core';

import { TipoAndamentoFiltro } from '../tipo-andamento.service';
import { Title } from '@angular/platform-browser';


import { TipoAndamento } from '../../core/model';
import { TipoAndamentoService } from '../tipo-andamento.service';

import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-tipo-andamento-cadastro',
  templateUrl: './tipo-andamento-cadastro.component.html',
  styleUrls: ['./tipo-andamento-cadastro.component.css']
})
export class TipoAndamentoCadastroComponent implements OnInit {

  tipoAndamento = new TipoAndamento();
  totalRegistros = 0;
  filtro = new TipoAndamentoFiltro();



  constructor(
    private tipoAndamentoService: TipoAndamentoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit() {

  const idTipoAndamento = this.route.snapshot.params['codigo'];
  this.title.setTitle(`Novo Tipo de Andamento`);
   if (idTipoAndamento > 0) {
      this.carregarTipoAndamento(idTipoAndamento);
    }
  }


  carregarTipoAndamento(codigo: number) {
  this.tipoAndamentoService.buscarPorCodigo(codigo)
    .then(tipoAndamento => {
      this.tipoAndamento = tipoAndamento;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
}


salvar(form: FormControl) {
  if (this.editando) {
    this.atualizarTipoAndamento(form);
  } else {
    this.adicionarTipoAndamento(form);
  }
}


adicionarTipoAndamento(form: FormControl) {
  this.tipoAndamentoService.adicionar(this.tipoAndamento)
  .then(tipoAndamentoAdicionado => {
    this.messageService.add({severity: 'success', detail: 'Tipo de Andamento salvo com sucesso.'});
    this.router.navigate(['/tiposAndamento', tipoAndamentoAdicionado.codigo]);
  })
  .catch(erro => this.errorHandler.handle(erro));

}

atualizarTipoAndamento(form: FormControl) {
  this.tipoAndamentoService.atualizar(this.tipoAndamento)
  .then(tipoAndamento => {
   this.tipoAndamento = tipoAndamento;
   this.messageService.add({severity: 'success', detail: 'Tipo de Andamento atualizado com sucesso.'});
   this.atualizarTituloEdicao();
  })
  .catch(erro => this.errorHandler.handle(erro));

}

get editando() {
  return Boolean(this.tipoAndamento.codigo);
}

nova(form: FormControl) {
  form.reset();
  setTimeout(function() {
    this.tipoAndamento = new TipoAndamento();
  }.bind(this), 1);
  this.router.navigate(['/tiposAndamento/novo']);
}

atualizarTituloEdicao() {
  this.title.setTitle(`Edição de Tipo de Andamento: ${this.tipoAndamento.descricao}`);
}


}

