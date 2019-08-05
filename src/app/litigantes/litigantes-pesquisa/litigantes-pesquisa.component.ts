import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../core/error-handler.service';


import { LazyLoadEvent } from 'primeng/components/common/api';
import { LitiganteService, LitiganteFiltro } from '../litigante.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/components/common/api';
import { AuthService } from '../../seguranca/auth.service';


@Component({
  selector: 'app-litigantes-pesquisa',
  templateUrl: './litigantes-pesquisa.component.html',
  styleUrls: ['./litigantes-pesquisa.component.css']
})
export class LitigantesPesquisaComponent implements OnInit {


  filtro = new LitiganteFiltro();
  totalRegistros = 0;

  litigantes = [];

  @ViewChild('tabela', {static: true}) grid;

  constructor(private litiganteService: LitiganteService,
              private messageService: MessageService,
              private confirmation: ConfirmationService,
              private errorHandler: ErrorHandlerService,
              private title: Title,
              private auth: AuthService) {

  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Litigantes');
  }

  pesquisar(pagina= 0) {
    console.log(this.filtro);
    this.filtro.pagina = pagina;
      this.litiganteService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.litigantes = resultado.litigantes;
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

  excluir(litigante: any) {
    const nomeAutor = litigante.nomeAutor;
    this.litiganteService.excluir(litigante.codigo)
    .then(() => {
      if (this.grid.first === 0) {
          this.pesquisar();
      } else {
          this.grid.first = 0;
      }

      this.messageService.add({severity: 'success', detail: `Registro ${nomeAutor} excluído com suceso!`});

      })
      .catch(erro => this.errorHandler.handle(erro));


  }

}
