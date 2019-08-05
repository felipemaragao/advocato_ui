import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../core/error-handler.service';


import { LazyLoadEvent } from 'primeng/components/common/api';
import { OcupacaoService, OcupacaoFiltro } from '../ocupacao.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/components/common/api';
import { AuthService } from '../../seguranca/auth.service';

@Component({
  selector: 'app-ocupacoes-pesquisa',
  templateUrl: './ocupacoes-pesquisa.component.html',
  styleUrls: ['./ocupacoes-pesquisa.component.css']
})
export class OcupacoesPesquisaComponent implements OnInit {

  filtro = new OcupacaoFiltro();
  totalRegistros = 0;

  ocupacoes = [];

  @ViewChild('tabela', {static: true}) grid;

  constructor(private ocupacaoService: OcupacaoService,
              private messageService: MessageService,
              private confirmation: ConfirmationService,
              private errorHandler: ErrorHandlerService,
              private title: Title,
              private auth: AuthService) {

  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Ocupação');
  }

  pesquisar(pagina= 0) {
    console.log(this.filtro);
    this.filtro.pagina = pagina;
      this.ocupacaoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.ocupacoes = resultado.ocupacoes;
       })
       .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);

  }

  confirmarExclusao(ocupacao: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(ocupacao);
      }
    });
  }

  excluir(ocupacao: any) {
    const nome = ocupacao.nome;
    this.ocupacaoService.excluir(ocupacao.codigo)
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
