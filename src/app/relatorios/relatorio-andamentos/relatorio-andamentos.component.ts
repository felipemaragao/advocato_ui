import { Component, OnInit } from '@angular/core';
import { RelatoriosService } from './../relatorios.service';

@Component({
  selector: 'app-relatorio-andamentos',
  templateUrl: './relatorio-andamentos.component.html',
  styleUrls: ['./relatorio-andamentos.component.css']
})
export class RelatorioAndamentosComponent implements OnInit {

  periodoInicio: Date;
  periodoFim: Date;

  constructor(private relatoriosService: RelatoriosService) { }

  ngOnInit() {
  }

  gerar() {
    this.relatoriosService.relatorioAndamentosPorPessoa(this.periodoInicio, this.periodoFim)
      .then(relatorio => {
        const url = window.URL.createObjectURL(relatorio);

        window.open(url);
      });
  }
}
