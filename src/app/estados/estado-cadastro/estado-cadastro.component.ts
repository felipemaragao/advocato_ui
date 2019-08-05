import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';
import { Component, OnInit } from '@angular/core';

import { EstadoFiltro } from '../estado.service';
import { Title } from '@angular/platform-browser';


import { Estado } from '../../core/model';
import { EstadoService } from '../estado.service';

import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-estado-cadastro',
  templateUrl: './estado-cadastro.component.html',
  styleUrls: ['./estado-cadastro.component.css']
})
export class EstadoCadastroComponent implements OnInit {

  estado = new Estado();
  totalRegistros = 0;
  filtro = new EstadoFiltro();



  constructor(
    private estadoService: EstadoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit() {

  const idEstado = this.route.snapshot.params['codigo'];
  this.title.setTitle(`Novo Estado`);
   if (idEstado > 0) {
      this.carregarEstado(idEstado);
    }
  }


  carregarEstado(codigo: number) {
  this.estadoService.buscarPorCodigo(codigo)
    .then(estado => {
      this.estado = estado;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
}


salvar(form: FormControl) {
  if (this.editando) {
    this.atualizarEstado(form);
  } else {
    this.adicionarEstado(form);
  }
}


adicionarEstado(form: FormControl) {
  this.estadoService.adicionar(this.estado)
  .then(estadoAdicionado => {
    this.messageService.add({severity: 'success', detail: 'Estado salvo com sucesso.'});
    this.router.navigate(['/estados', estadoAdicionado.codigo]);
  })
  .catch(erro => this.errorHandler.handle(erro));

}

atualizarEstado(form: FormControl) {
  this.estadoService.atualizar(this.estado)
  .then(estado => {
   this.estado = estado;
   this.messageService.add({severity: 'success', detail: 'Estado atualizado com sucesso.'});
   this.atualizarTituloEdicao();
  })
  .catch(erro => this.errorHandler.handle(erro));

}

get editando() {
  return Boolean(this.estado.codigo);
}

nova(form: FormControl) {
  form.reset();
  setTimeout(function() {
    this.estado = new Estado();
  }.bind(this), 1);
  this.router.navigate(['/estados/novo']);
}

atualizarTituloEdicao() {
  this.title.setTitle(`Edição de Estado: ${this.estado.nome}`);
}


}

