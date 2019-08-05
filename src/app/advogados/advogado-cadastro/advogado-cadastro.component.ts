import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Component, OnInit } from '@angular/core';

import { AdvogadoFiltro } from '../advogado.service';
import { Title } from '@angular/platform-browser';


import { Advogado } from '../../core/model';
import { AdvogadoService } from '../advogado.service';

import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-advogado-cadastro',
  templateUrl: './advogado-cadastro.component.html',
  styleUrls: ['./advogado-cadastro.component.css']
})
export class AdvogadoCadastroComponent implements OnInit {

  advogado = new Advogado();
  totalRegistros = 0;
  filtro = new AdvogadoFiltro();



  constructor(
    private advogadoService: AdvogadoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit() {

  const idAdvogado = this.route.snapshot.params['codigo'];
  this.title.setTitle(`Novo Advogado`);
   if (idAdvogado > 0) {
      this.carregarAdvogado(idAdvogado);
    }
  }


carregarAdvogado(codigo: number) {
  this.advogadoService.buscarPorCodigo(codigo)
    .then(advogado => {
      this.advogado = advogado;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
}


salvar(form: FormControl) {
  if (this.editando) {
    this.atualizarAdvogado(form);
  } else {
    this.adicionarAdvogado(form);
  }
}


adicionarAdvogado(form: FormControl) {
  this.advogadoService.adicionar(this.advogado)
  .then(advogadoAdicionado => {

    this.messageService.add({severity: 'success', detail: 'Advogado salvo com sucesso.'});
    this.router.navigate(['/advogados', advogadoAdicionado.codigo]);
  })
  .catch(erro => this.errorHandler.handle(erro));

}

atualizarAdvogado(form: FormControl) {
  this.advogadoService.atualizar(this.advogado)
  .then(advogado => {
   this.advogado = advogado;
   this.messageService.add({severity: 'success', detail: 'Advogado atualizado com sucesso.'});
   this.atualizarTituloEdicao();
  })
  .catch(erro => this.errorHandler.handle(erro));

}

get editando() {
  return Boolean(this.advogado.codigo);
}

nova(form: FormControl) {
  form.reset();
  setTimeout(function() {
    this.advogado = new Advogado();
  }.bind(this), 1);
  this.router.navigate(['/advogados/novo']);
}

atualizarTituloEdicao() {
  this.title.setTitle(`Edição de Advogado: ${this.advogado.nome}`);
}


}

