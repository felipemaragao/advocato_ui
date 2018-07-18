import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Component, OnInit } from '@angular/core';

import { EscritorioFiltro } from './../../escritorios/escritorio.service';
import { Title } from '@angular/platform-browser';


import { Escritorio } from '../../core/model';
import { EscritorioService } from './../escritorio.service';

import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-escritorio-cadastro',
  templateUrl: './escritorio-cadastro.component.html',
  styleUrls: ['./escritorio-cadastro.component.css']
})
export class EscritorioCadastroComponent implements OnInit {

  escritorio = new Escritorio();
  totalRegistros = 0;
  filtro = new EscritorioFiltro();



  constructor(
    private escritorioService: EscritorioService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit() {

  const idEscritorio = this.route.snapshot.params['codigo'];
  this.title.setTitle(`Novo Escritório`);
   if (idEscritorio > 0) {
      this.carregarLitigante(idEscritorio);
    }
  }


carregarLitigante(codigo: number) {
  this.escritorioService.buscarPorCodigo(codigo)
    .then(escritorio => {
      this.escritorio = escritorio;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
}


salvar(form: FormControl) {
  if (this.editando) {
    this.atualizarEscritorio(form);
  } else {
    this.adicionarEscritorio(form);
  }
}


adicionarEscritorio(form: FormControl) {
  this.escritorioService.adicionar(this.escritorio)
  .then(escritorioAdicionado => {
    this.messageService.add({severity: 'success', detail: `Escritorio salvo com sucesso.`});
    this.router.navigate(['/escritorios', escritorioAdicionado.codigo]);
  })
  .catch(erro => this.errorHandler.handle(erro));

}

atualizarEscritorio(form: FormControl) {
  this.escritorioService.atualizar(this.escritorio)
  .then(escritorio => {
   this.escritorio = escritorio;
   this.messageService.add({severity: 'success', detail: `Escritorio atualizado com sucesso.`});

   this.atualizarTituloEdicao();
  })
  .catch(erro => this.errorHandler.handle(erro));

}

get editando() {
  return Boolean(this.escritorio.codigo);
}

nova(form: FormControl) {
  form.reset();
  setTimeout(function() {
    this.escritorio = new Escritorio();
  }.bind(this), 1);
  this.router.navigate(['/escritorios/novo']);
}

atualizarTituloEdicao() {
  this.title.setTitle(`Edição de ação: ${this.escritorio.nome}`);
}


}

