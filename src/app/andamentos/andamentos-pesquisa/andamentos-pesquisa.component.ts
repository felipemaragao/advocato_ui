import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';

import { MessageService } from 'primeng/components/common/messageservice';

import { AuthService } from './../../seguranca/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { AndamentoService, AndamentoFiltro } from './../andamento.service';

@Component({
  selector: 'app-andamentos-pesquisa',
  templateUrl: './andamentos-pesquisa.component.html',
  styleUrls: ['./andamentos-pesquisa.component.css']
})

export class AndamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new AndamentoFiltro();
  andamentos = [];
  @ViewChild('tabela') grid;

  constructor(
    private andamentoService: AndamentoService,
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Andamentos');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.andamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.andamentos = resultado.andamentos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(andamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(andamento);
      }
    });
  }

  excluir(andamento: any) {
    this.andamentoService.excluir(andamento.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.messageService.add({severity: 'success', detail: `Andamento excluído com sucesso!`});

      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
