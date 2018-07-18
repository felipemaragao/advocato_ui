import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../core/error-handler.service';


import { LazyLoadEvent } from 'primeng/components/common/api';
import { AcaoService, AcaoFiltro } from './../acao.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/components/common/api';
import { AuthService } from './../../seguranca/auth.service';

@Component({
  selector: 'app-acao-pesquisa',
  templateUrl: './acao-pesquisa.component.html',
  styleUrls: ['./acao-pesquisa.component.css']
})
export class AcaoPesquisaComponent implements OnInit {

  filtro = new AcaoFiltro();
  totalRegistros = 0;

  acoes = [];

  @ViewChild('tabela') grid;

  constructor(private acaoService: AcaoService,
              private messageService: MessageService,
              private confirmation: ConfirmationService,
              private errorHandler: ErrorHandlerService,
              private title: Title,
              private auth: AuthService) {

  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Tipo de Ação');
  }

  pesquisar(pagina= 0) {
    console.log(this.filtro);
    this.filtro.pagina = pagina;
      this.acaoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.acoes = resultado.acoes;
       })
       .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);

  }

  confirmarExclusao(acao: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(acao);
      }
    });
  }

  excluir(acao: any) {
    const descricao = acao.descricao;
    this.acaoService.excluir(acao.codigo)
    .then(() => {
      if (this.grid.first === 0) {
          this.pesquisar();
      } else {
          this.grid.first = 0;
      }
        this.messageService.add({severity: 'success', detail: `Registro ${descricao} excluído com suceso!`});
      })
      .catch(erro => this.errorHandler.handle(erro));


  }

}
