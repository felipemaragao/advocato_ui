import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';
import { Component, OnInit } from '@angular/core';

import { CompetenciaFiltro } from '../competencia.service';
import { Title } from '@angular/platform-browser';


import { Competencia } from '../../core/model';
import { CompetenciaService } from '../competencia.service';

import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-competencia-cadastro',
  templateUrl: './competencia-cadastro.component.html',
  styleUrls: ['./competencia-cadastro.component.css']
})
export class CompetenciaCadastroComponent implements OnInit {

  competencia = new Competencia();
  totalRegistros = 0;
  filtro = new CompetenciaFiltro();



  constructor(
    private competenciaService: CompetenciaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit() {

  const idCompetencia = this.route.snapshot.params['codigo'];
  this.title.setTitle(`Nova Competência`);
   if (idCompetencia > 0) {
      this.carregarCompetencia(idCompetencia);
    }
  }


carregarCompetencia(codigo: number) {
  this.competenciaService.buscarPorCodigo(codigo)
    .then(competencia => {
      this.competencia = competencia;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
}


salvar(form: FormControl) {
  if (this.editando) {
    this.atualizarCompetencia(form);
  } else {
    this.adicionarCompetencia(form);
  }
}


adicionarCompetencia(form: FormControl) {
  this.competenciaService.adicionar(this.competencia)
  .then(competenciaAdicionada => {
    this.messageService.add({severity: 'success', detail: 'Competência salva com sucesso.'});
    this.router.navigate(['/competencias', competenciaAdicionada.codigo]);
  })
  .catch(erro => this.errorHandler.handle(erro));

}

atualizarCompetencia(form: FormControl) {
  this.competenciaService.atualizar(this.competencia)
  .then(competencia => {
   this.competencia = competencia;
   this.messageService.add({severity: 'success', detail: 'Competência atualizada com sucesso.'});
   this.atualizarTituloEdicao();
  })
  .catch(erro => this.errorHandler.handle(erro));

}

get editando() {
  return Boolean(this.competencia.codigo);
}

nova(form: FormControl) {
  form.reset();
  setTimeout(function() {
    this.competencia = new Competencia();
  }.bind(this), 1);
  this.router.navigate(['/competencias/novo']);
}

atualizarTituloEdicao() {
  this.title.setTitle(`Edição de Competência: ${this.competencia.nome}`);
}


}

