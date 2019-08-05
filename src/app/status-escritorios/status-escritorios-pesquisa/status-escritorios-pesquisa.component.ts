import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../core/error-handler.service';

import { LazyLoadEvent } from 'primeng/components/common/api';
import { StatusEscritorioService, StatusEscritorioFiltro } from '../status-escritorio.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/components/common/api';
import { AuthService } from '../../seguranca/auth.service';

@Component({
  selector: 'app-status-escritorios-pesquisa',
  templateUrl: './status-escritorios-pesquisa.component.html',
  styleUrls: ['./status-escritorios-pesquisa.component.css']
})
export class StatusEscritoriosPesquisaComponent implements OnInit {

  filtro = new StatusEscritorioFiltro();
  totalRegistros = 0;

  statusEscritorios = [];

  @ViewChild('tabela', {static: true}) grid;

  constructor(private statusEscritorioService: StatusEscritorioService,
              private messageService: MessageService,
              private confirmation: ConfirmationService,
              private errorHandler: ErrorHandlerService,
              private title: Title,
              private auth: AuthService) {

  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Status no Escritório');
  }

  pesquisar(pagina= 0) {
    this.filtro.pagina = pagina;
      this.statusEscritorioService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.statusEscritorios = resultado.statusEscritorios;
       })
       .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);

  }

  confirmarExclusao(statusEscritorio: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(statusEscritorio);
      }
    });
  }

  excluir(statusEscritorio: any) {
    const nome = statusEscritorio.nome;
    this.statusEscritorioService.excluir(statusEscritorio.codigo)
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
