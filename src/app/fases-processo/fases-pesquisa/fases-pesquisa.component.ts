import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../core/error-handler.service';

import { LazyLoadEvent } from 'primeng/components/common/api';
import { FaseProcessoService, FaseFiltro } from '../fase-processo.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/components/common/api';
import { AuthService } from '../../seguranca/auth.service';

@Component({
  selector: 'app-fases-pesquisa',
  templateUrl: './fases-pesquisa.component.html',
  styleUrls: ['./fases-pesquisa.component.css']
})
export class FasesPesquisaComponent implements OnInit {

 filtro = new FaseFiltro();
  totalRegistros = 0;

  fases = [];

  @ViewChild('tabela', {static: true}) grid;

  constructor(private faseProcessoService: FaseProcessoService,
              private messageService: MessageService,
              private confirmation: ConfirmationService,
              private errorHandler: ErrorHandlerService,
              private title: Title,
              private auth: AuthService) {

  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Fases Processual');
  }

  pesquisar(pagina= 0) {
    this.filtro.pagina = pagina;
      this.faseProcessoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.fases = resultado.fases;
       })
       .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);

  }

  confirmarExclusao(fase: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(fase);
      }
    });
  }

  excluir(fase: any) {
    const nome = fase.nome;
    this.faseProcessoService.excluir(fase.codigo)
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
