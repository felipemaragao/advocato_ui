import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';
import { Component, OnInit } from '@angular/core';

import { VaraFiltro } from '../vara.service';
import { Title } from '@angular/platform-browser';


import { Vara } from '../../core/model';
import { VaraService } from '../vara.service';

import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-vara-cadastro',
  templateUrl: './vara-cadastro.component.html',
  styleUrls: ['./vara-cadastro.component.css']
})
export class VaraCadastroComponent implements OnInit {

  vara = new Vara();
  totalRegistros = 0;
  filtro = new VaraFiltro();



  constructor(
    private varaService: VaraService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit() {

  const idVara = this.route.snapshot.params['codigo'];
  this.title.setTitle(`Nova Vara`);
   if (idVara > 0) {
      this.carregarVara(idVara);
    }
  }


carregarVara(codigo: number) {
  this.varaService.buscarPorCodigo(codigo)
    .then(vara => {
      this.vara = vara;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
}


salvar(form: FormControl) {
  if (this.editando) {
    this.atualizarVara(form);
  } else {
    this.adicionarVara(form);
  }
}


adicionarVara(form: FormControl) {
  this.varaService.adicionar(this.vara)
  .then(comarcaAdicionada => {
    this.messageService.add({severity: 'success', detail: 'Vara salva com sucesso.'});
    this.router.navigate(['/varas', comarcaAdicionada.codigo]);
  })
  .catch(erro => this.errorHandler.handle(erro));

}

atualizarVara(form: FormControl) {
  this.varaService.atualizar(this.vara)
  .then(vara => {
   this.vara = vara;
   this.messageService.add({severity: 'success', detail: 'Vara atualizada com sucesso.'});
   this.atualizarTituloEdicao();
  })
  .catch(erro => this.errorHandler.handle(erro));

}

get editando() {
  return Boolean(this.vara.codigo);
}

nova(form: FormControl) {
  form.reset();
  setTimeout(function() {
    this.vara = new Vara();
  }.bind(this), 1);
  this.router.navigate(['/varas/novo']);
}

atualizarTituloEdicao() {
  this.title.setTitle(`Edição de Vara: ${this.vara.nome}`);
}


}

