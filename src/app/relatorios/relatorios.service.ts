import { AdvocatoHttp } from './../seguranca/advocato-http';
import { Injectable } from '@angular/core';
import { ResponseContentType } from '@angular/http';


import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  processosUrl: string;

  constructor(private http: AdvocatoHttp) {
    this.processosUrl = `${environment.apiUrl}/processos`;
  }

  relatorioAndamentosPorPessoa(inicio: Date, fim: Date) {
    const  params = new HttpParams()
    .append('inicio', moment(inicio).format('YYYY-MM-DD'))
    .append('fim', moment(fim).format('YYYY-MM-DD'));

    return this.http.get(`${this.processosUrl}/relatorios/por-pessoa`,
    { params, responseType: 'blob' })
    .toPromise();
}

}
