import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';
import { Component, OnInit } from '@angular/core';

import { EstadoFiltro } from '../../estados/estado.service';
import { Title } from '@angular/platform-browser';


import { StatusEscritorio } from '../../core/model';
import { StatusEscritorioService } from '../status-escritorio.service';

import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-status-escritorio-cadastro',
  templateUrl: './status-escritorio-cadastro.component.html',
  styleUrls: ['./status-escritorio-cadastro.component.css']
})
export class StatusEscritorioCadastroComponent implements OnInit {

  statusEscritorio = new StatusEscritorio();
  totalRegistros = 0;
  filtro = new EstadoFiltro();



  constructor(
    private statusEscritorioService: StatusEscritorioService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit() {

  const idStatus = this.route.snapshot.params['codigo'];
  this.title.setTitle(`Novo Status`);
   if (idStatus > 0) {
      this.carregarEstado(idStatus);
    }
  }


  carregarEstado(codigo: number) {
  this.statusEscritorioService.buscarPorCodigo(codigo)
    .then(statusEscritorio => {
      this.statusEscritorio = statusEscritorio;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
}


salvar(form: FormControl) {
  if (this.editando) {
    this.atualizarStatusEscritorio(form);
  } else {
    this.adicionarStatusEscritorio(form);
  }
}


adicionarStatusEscritorio(form: FormControl) {
  this.statusEscritorioService.adicionar(this.statusEscritorio)
  .then(statusAdicionado => {
    this.messageService.add({severity: 'success', detail: 'Estado salvo com sucesso.'});
    this.router.navigate(['/statusEscritorios', statusAdicionado.codigo]);
  })
  .catch(erro => this.errorHandler.handle(erro));

}

atualizarStatusEscritorio(form: FormControl) {
  this.statusEscritorioService.atualizar(this.statusEscritorio)
  .then(statusEscritorio => {
   this.statusEscritorio = statusEscritorio;
   this.messageService.add({severity: 'success', detail: 'Status atualizado com sucesso.'});
   this.atualizarTituloEdicao();
  })
  .catch(erro => this.errorHandler.handle(erro));

}

get editando() {
  return Boolean(this.statusEscritorio.codigo);
}

nova(form: FormControl) {
  form.reset();
  setTimeout(function() {
    this.statusEscritorio = new StatusEscritorio();
  }.bind(this), 1);
  this.router.navigate(['/statusEscritorios/novo']);
}

atualizarTituloEdicao() {
  this.title.setTitle(`Edição de Status: ${this.statusEscritorio.nome}`);
}


}

