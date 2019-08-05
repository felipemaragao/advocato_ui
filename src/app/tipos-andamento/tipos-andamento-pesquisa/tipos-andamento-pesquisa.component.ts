import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../core/error-handler.service';


import { LazyLoadEvent } from 'primeng/components/common/api';
import { TipoAndamentoService, TipoAndamentoFiltro } from '../tipo-andamento.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/components/common/api';
import { AuthService } from '../../seguranca/auth.service';

@Component({
  selector: 'app-tipos-andamento-pesquisa',
  templateUrl: './tipos-andamento-pesquisa.component.html',
  styleUrls: ['./tipos-andamento-pesquisa.component.css']
})
export class TiposAndamentoPesquisaComponent implements OnInit {

  filtro = new TipoAndamentoFiltro();
  totalRegistros = 0;

  tiposAndamento = [];

  @ViewChild('tabela', {static: true}) grid;

  constructor(private tipoAndamentoService: TipoAndamentoService,
              private messageService: MessageService,
              private confirmation: ConfirmationService,
              private errorHandler: ErrorHandlerService,
              private title: Title,
              private auth: AuthService) {

  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Tipo de Andamento');
  }

  pesquisar(pagina= 0) {
    console.log(this.filtro);
    this.filtro.pagina = pagina;
      this.tipoAndamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.tiposAndamento = resultado.tiposAndamento;
       })
       .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);

  }

  confirmarExclusao(tipoAndamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(tipoAndamento);
      }
    });
  }

  excluir(tipoAndamento: any) {
    const descricao = tipoAndamento.descricao;
    this.tipoAndamentoService.excluir(tipoAndamento.codigo)
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
