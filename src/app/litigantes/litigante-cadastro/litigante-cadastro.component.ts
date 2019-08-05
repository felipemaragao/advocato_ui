import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';
import { Component, OnInit } from '@angular/core';

import { LitiganteFiltro } from '../litigante.service';
import { Title } from '@angular/platform-browser';


import { Litigante } from '../../core/model';
import { LitiganteService } from '../litigante.service';

import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-litigante-cadastro',
  templateUrl: './litigante-cadastro.component.html',
  styleUrls: ['./litigante-cadastro.component.css']
})
export class LitiganteCadastroComponent implements OnInit {

  litigante = new Litigante();
  totalRegistros = 0;
  filtro = new LitiganteFiltro();



  constructor(
    private litiganteService: LitiganteService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit() {

  const idLitigante = this.route.snapshot.params['codigo'];
  this.title.setTitle(`Novo Litigante`);
   if (idLitigante > 0) {
      this.carregarLitigante(idLitigante);
    }
  }


carregarLitigante(codigo: number) {
  this.litiganteService.buscarPorCodigo(codigo)
    .then(litigante => {
      this.litigante = litigante;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
}


salvar(form: FormControl) {
  if (this.editando) {
    this.atualizarLitigante(form);
  } else {
    this.adicionarLitigante(form);
  }
}


adicionarLitigante(form: FormControl) {
  this.litiganteService.adicionar(this.litigante)
  .then(litiganteAdicionado => {
    this.messageService.add({severity: 'success', detail: 'Litigante salvo com sucesso.'});
    this.router.navigate(['/litigantes', litiganteAdicionado.codigo]);
  })
  .catch(erro => this.errorHandler.handle(erro));

}

atualizarLitigante(form: FormControl) {
  this.litiganteService.atualizar(this.litigante)
  .then(litigante => {
   this.litigante = litigante;
   this.messageService.add({severity: 'success', detail: 'Litigante atualizado com sucesso.'});
   this.atualizarTituloEdicao();
  })
  .catch(erro => this.errorHandler.handle(erro));

}

get editando() {
  return Boolean(this.litigante.codigo);
}

nova(form: FormControl) {
  form.reset();
  setTimeout(function() {
    this.litigante = new Litigante();
  }.bind(this), 1);
  this.router.navigate(['/litigantes/novo']);
}

atualizarTituloEdicao() {
  this.title.setTitle(`Edição de ação: ${this.litigante.descricaoAutor}`);
}


}

