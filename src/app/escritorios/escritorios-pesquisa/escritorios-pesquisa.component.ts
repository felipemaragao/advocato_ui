import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../core/error-handler.service';


import { LazyLoadEvent } from 'primeng/components/common/api';
import { EscritorioService, EscritorioFiltro } from './../escritorio.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/components/common/api';
import { AuthService } from './../../seguranca/auth.service';


@Component({
  selector: 'app-escritorios-pesquisa',
  templateUrl: './escritorios-pesquisa.component.html',
  styleUrls: ['./escritorios-pesquisa.component.css']
})
export class EscritoriosPesquisaComponent implements OnInit {


  filtro = new EscritorioFiltro();
  totalRegistros = 0;

  escritorios = [];

  @ViewChild('tabela') grid;

  constructor(private escritorioService: EscritorioService,
              private messageService: MessageService,
              private confirmation: ConfirmationService,
              private errorHandler: ErrorHandlerService,
              private title: Title,
              private auth: AuthService) {

  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Escritórios');
  }

  pesquisar(pagina= 0) {
    console.log(this.filtro);
    this.filtro.pagina = pagina;
      this.escritorioService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.escritorios = resultado.escritorios;
       })
       .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);

  }

  confirmarExclusao(litigante: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(litigante);
      }
    });
  }

  excluir(escritorio: any) {
    const nomeEscritorio = escritorio.nomeAutor;
    this.escritorioService.excluir(escritorio.codigo)
    .then(() => {
      if (this.grid.first === 0) {
          this.pesquisar();
      } else {
          this.grid.first = 0;
      }
      this.messageService.add({severity: 'success', detail: `Registro ${nomeEscritorio} excluído com suceso!`});
      })
      .catch(erro => this.errorHandler.handle(erro));


  }

}
