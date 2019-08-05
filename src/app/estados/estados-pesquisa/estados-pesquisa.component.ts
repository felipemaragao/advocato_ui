import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../core/error-handler.service';

import { LazyLoadEvent } from 'primeng/components/common/api';
import { EstadoService, EstadoFiltro } from '../estado.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/components/common/api';
import { AuthService } from '../../seguranca/auth.service';

@Component({
  selector: 'app-estados-pesquisa',
  templateUrl: './estados-pesquisa.component.html',
  styleUrls: ['./estados-pesquisa.component.css']
})
export class EstadosPesquisaComponent implements OnInit {

  filtro = new EstadoFiltro();
  totalRegistros = 0;

  estados = [];

  @ViewChild('tabela', {static: true}) grid;

  constructor(private estadoService: EstadoService,
              private messageService: MessageService,
              private confirmation: ConfirmationService,
              private errorHandler: ErrorHandlerService,
              private title: Title,
              private auth: AuthService) {

  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Estado');
  }

  pesquisar(pagina= 0) {
    this.filtro.pagina = pagina;
      this.estadoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.estados = resultado.estados;
       })
       .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);

  }

  confirmarExclusao(estado: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(estado);
      }
    });
  }

  excluir(estado: any) {
    const nome = estado.nome;
    this.estadoService.excluir(estado.codigo)
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
