import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../core/error-handler.service';


import { LazyLoadEvent } from 'primeng/components/common/api';
import { CompetenciaService, CompetenciaFiltro } from '../competencia.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/components/common/api';
import { AuthService } from '../../seguranca/auth.service';

@Component({
  selector: 'app-competencias-pesquisa',
  templateUrl: './competencias-pesquisa.component.html',
  styleUrls: ['./competencias-pesquisa.component.css']
})
export class CompetenciasPesquisaComponent implements OnInit {

  filtro = new CompetenciaFiltro();
  totalRegistros = 0;

  competencias = [];

  @ViewChild('tabela', {static: true}) grid;

  constructor(private competenciaService: CompetenciaService,
              private messageService: MessageService,
              private confirmation: ConfirmationService,
              private errorHandler: ErrorHandlerService,
              private title: Title,
              private auth: AuthService) {

  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Competências');
  }

  pesquisar(pagina= 0) {
    console.log(this.filtro);
    this.filtro.pagina = pagina;
      this.competenciaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.competencias = resultado.competencias;
       })
       .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);

  }

  confirmarExclusao(competencia: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(competencia);
      }
    });
  }

  excluir(competencia: any) {
    const nome = competencia.nome;
    this.competenciaService.excluir(competencia.codigo)
    .then(() => {
      if (this.grid.first === 0) {
          this.pesquisar();
      } else {
          this.grid.first = 0;
      }
        this.messageService.add({severity: 'success', detail: `Registro ${nome} excluído com suceso!`});
      })
      .catch(erro => this.errorHandler.handle(erro));


  }

}
