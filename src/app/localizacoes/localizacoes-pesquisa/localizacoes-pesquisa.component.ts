import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../core/error-handler.service';


import { LazyLoadEvent } from 'primeng/components/common/api';
import { LocalizacaoService, LocalizacaoFiltro } from '../localizacao.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/components/common/api';
import { AuthService } from '../../seguranca/auth.service';

@Component({
  selector: 'app-localizacoes-pesquisa',
  templateUrl: './localizacoes-pesquisa.component.html',
  styleUrls: ['./localizacoes-pesquisa.component.css']
})
export class LocalizacoesPesquisaComponent implements OnInit {

  filtro = new LocalizacaoFiltro();
  totalRegistros = 0;

  localizacoes = [];

  @ViewChild('tabela', {static: true}) grid;

  constructor(private localizacaoService: LocalizacaoService,
              private messageService: MessageService,
              private confirmation: ConfirmationService,
              private errorHandler: ErrorHandlerService,
              private title: Title,
              private auth: AuthService) {

  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Vara');
  }

  pesquisar(pagina= 0) {
    console.log(this.filtro);
    this.filtro.pagina = pagina;
      this.localizacaoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.localizacoes = resultado.localizacoes;
       })
       .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);

  }

  confirmarExclusao(vara: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(vara);
      }
    });
  }

  excluir(localizacao: any) {
    const nome = localizacao.nome;
    this.localizacaoService.excluir(localizacao.codigo)
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
