import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../core/error-handler.service';


import { LazyLoadEvent } from 'primeng/components/common/api';
import { AdvogadoService, AdvogadoFiltro } from './../advogado.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/components/common/api';
import { AuthService } from './../../seguranca/auth.service';


@Component({
  selector: 'app-advogados-pesquisa',
  templateUrl: './advogados-pesquisa.component.html',
  styleUrls: ['./advogados-pesquisa.component.css']
})
export class AdvogadosPesquisaComponent implements OnInit {


  filtro = new AdvogadoFiltro();
  totalRegistros = 0;

  advogados = [];

  @ViewChild('tabela') grid;

  constructor(private advogadoService: AdvogadoService,
              private messageService: MessageService,
              private confirmation: ConfirmationService,
              private errorHandler: ErrorHandlerService,
              private title: Title,
              private auth: AuthService) {

  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Advogados');
  }

  pesquisar(pagina= 0) {
    console.log(this.filtro);
    this.filtro.pagina = pagina;
      this.advogadoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.advogados = resultado.advogados;
       })
       .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);

  }

  confirmarExclusao(advogado: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(advogado);
      }
    });
  }

  excluir(advogado: any) {
    const nome = advogado.nome;
    this.advogadoService.excluir(advogado.codigo)
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
