import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../core/error-handler.service';

import { LazyLoadEvent } from 'primeng/api';
import { ProcessoService, ProcessoFiltro } from './../processo.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from './../../seguranca/auth.service';

@Component({
  selector: 'app-processos-pesquisa',
  templateUrl: './processos-pesquisa.component.html',
  styleUrls: ['./processos-pesquisa.component.css']
})
export class ProcessosPesquisaComponent  implements OnInit {


  filtro = new ProcessoFiltro();
  totalRegistros = 0;

  processos = [];

  @ViewChild('tabela') grid;

  constructor(private processoService: ProcessoService,
              private messageService: MessageService,
              private confirmation: ConfirmationService,
              private errorHandler: ErrorHandlerService,
              private title: Title,
              private auth: AuthService) {

}

   ngOnInit() {
    this.title.setTitle('Pesquisa de Processo');
  }

  pesquisar(pagina= 0) {
    this.filtro.pagina = pagina;
      this.processoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.processos = resultado.processos;
       })
       .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);

  }

  confirmarExclusao(processo: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(processo);
      }
    });
  }

  excluir(processo: any) {
    const numero = processo.numero;
    this.processoService.excluir(processo.codigo)
    .then(() => {
      if (this.grid.first === 0) {
          this.pesquisar();
      } else {
          this.grid.first = 0;
      }

      this.messageService.add({severity: 'success', detail: `Registro ${numero} excluído com suceso!`});

      })
      .catch(erro => this.errorHandler.handle(erro));

  }
}
