import { AdvocatoHttp } from '../seguranca/advocato-http';
import { Injectable } from '@angular/core';


import * as moment from 'moment';

import { environment } from '../../environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  processosUrl: string;
  andamentosUrl: string;

  constructor(private http: AdvocatoHttp) {
    this.processosUrl = `${environment.apiUrl}/processos`;
    this.andamentosUrl = `${environment.apiUrl}/andamentos`;
  }

  relatorioAndamentosPorPessoa(inicio: Date, fim: Date) {
    const  params = new HttpParams()
    .append('inicio', moment(inicio).format('YYYY-MM-DD'))
    .append('fim', moment(fim).format('YYYY-MM-DD'));

    return this.http.get(`${this.processosUrl}/relatorios/por-pessoa`,
    { params, responseType: 'blob' })
    .toPromise();
}

relatorioAgendaAdvogado(inicio: Date, fim: Date, advogado: number) {
  const  params = new HttpParams()
  .append('inicio', moment(inicio).format('YYYY-MM-DD'))
  .append('fim', moment(fim).format('YYYY-MM-DD'))
  .append('advogado', String(advogado));

  return this.http.get(`${this.andamentosUrl}/relatorios/agenda-advogado`,
  { params, responseType: 'blob' })
  .toPromise();
}

}