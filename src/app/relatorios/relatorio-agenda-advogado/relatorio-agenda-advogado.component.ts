import { Advogado } from '../../core/model';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { AdvogadoService } from '../../advogados/advogado.service';
import { Component, OnInit } from '@angular/core';
import { RelatoriosService } from '../relatorios.service';

@Component({
  selector: 'app-relatorio-agenda-advogado',
  templateUrl: './relatorio-agenda-advogado.component.html',
  styleUrls: ['./relatorio-agenda-advogado.component.css']
})
export class RelatorioAgendaAdvogadoComponent implements OnInit {
  advogados = [];
  advogadoSelecionado: number;

  periodoInicio: Date;
  periodoFim: Date;



  constructor(private advogadoService: AdvogadoService,
              private errorHandler: ErrorHandlerService,
              private relatoriosService: RelatoriosService) { }

  ngOnInit() {
    this.carregarAdvogados();
  }


  gerar() {
    this.relatoriosService.relatorioAgendaAdvogado(this.periodoInicio, this.periodoFim, this.advogadoSelecionado)
      .then(relatorio => {
        const url = window.URL.createObjectURL(relatorio);

        window.open(url);
      });
  }


  carregarAdvogados() {
    return this.advogadoService.listarTodos()
          .then(advogados => {
            this.advogados = advogados.map(c => {
              return  {label: c.nome, value: c.codigo};
            });

    })
    .catch(erro => this.errorHandler.handle(erro));

  }

}
