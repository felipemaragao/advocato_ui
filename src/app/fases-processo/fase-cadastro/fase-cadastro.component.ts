import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';
import { Component, OnInit } from '@angular/core';

import { FaseFiltro } from '../fase-processo.service';
import { Title } from '@angular/platform-browser';


import { FaseProcesso } from '../../core/model';
import { FaseProcessoService } from '../fase-processo.service';

import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-fase-cadastro',
  templateUrl: './fase-cadastro.component.html',
  styleUrls: ['./fase-cadastro.component.css']
})
export class FaseCadastroComponent implements OnInit {

  faseProcesso = new FaseProcesso();
  totalRegistros = 0;
  filtro = new FaseFiltro();



  constructor(
    private faseProcessoService: FaseProcessoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit() {

  const idFaseProcesso = this.route.snapshot.params['codigo'];
  this.title.setTitle(`Nova Fase do Processo`);
   if (idFaseProcesso > 0) {
      this.carregarFaseProcesso(idFaseProcesso);
    }
  }


carregarFaseProcesso(codigo: number) {
  this.faseProcessoService.buscarPorCodigo(codigo)
    .then(faseProcesso => {
      this.faseProcesso = faseProcesso;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
}


salvar(form: FormControl) {
  if (this.editando) {
    this.atualizarFaseProcesso(form);
  } else {
    this.adicionarFaseProcesso(form);
  }
}


adicionarFaseProcesso(form: FormControl) {
  this.faseProcessoService.adicionar(this.faseProcesso)
  .then(faseAdicionada => {
    this.messageService.add({severity: 'success', detail: 'Fase do Processo salva com sucesso.'});
    this.router.navigate(['/fasesProcesso', faseAdicionada.codigo]);
  })
  .catch(erro => this.errorHandler.handle(erro));

}

atualizarFaseProcesso(form: FormControl) {
  this.faseProcessoService.atualizar(this.faseProcesso)
  .then(faseProcesso => {
   this.faseProcesso = faseProcesso;
   this.messageService.add({severity: 'success', detail: 'Fase do Processo atualizada com sucesso.'});
   this.atualizarTituloEdicao();
  })
  .catch(erro => this.errorHandler.handle(erro));

}

get editando() {
  return Boolean(this.faseProcesso.codigo);
}

nova(form: FormControl) {
  form.reset();
  setTimeout(function() {
    this.faseProcesso = new FaseProcesso();
  }.bind(this), 1);
  this.router.navigate(['/fasesProcesso/novo']);
}

atualizarTituloEdicao() {
  this.title.setTitle(`Edição da Fase do Processo: ${this.faseProcesso.nome}`);
}


}

