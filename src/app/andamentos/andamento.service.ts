import { AdvocatoHttp } from '../seguranca/advocato-http';

import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import * as moment from 'moment';


import { environment } from '../../environments/environment';
import { Andamento, Processo } from '../core/model';



export class AndamentoFiltro {
  processo: Processo;
  descricao: string;
  dataAndamentoInicio: Date;
  dataAndamentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}


@Injectable({
  providedIn: 'root'
})
export class AndamentoService {

  andamentosUrl: string;

  constructor(private http: AdvocatoHttp) {
    this.andamentosUrl = `${environment.apiUrl}/andamentos`;
  }

  urlUploadAnexo(): string {
    return `${this.andamentosUrl}/anexo`;
  }

  pesquisar(filtro: AndamentoFiltro): Promise<any> {
    let  params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });


    if (filtro.descricao) {
      params = params.append('descricao', filtro.descricao);
    }

    if (filtro.dataAndamentoInicio) {
      params = params.append('dataAndamentoDe',
        moment(filtro.dataAndamentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataAndamentoFim) {
      params = params.append('dataAndamentoAte',
        moment(filtro.dataAndamentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get<any>(`${this.andamentosUrl}`,
        { params })
      .toPromise()
      .then(response => {
        const andamentos = response.content;

        const resultado = {
          andamentos,
          total: response.totalElements
        };

        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.andamentosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(andamento: Andamento): Promise<Andamento> {
    return this.http.post<Andamento>(this.andamentosUrl,
        JSON.stringify(andamento))
      .toPromise();
  }

  atualizar(andamento: Andamento): Promise<Andamento> {
    return this.http.put<Andamento>(`${this.andamentosUrl}/${andamento.codigo}`, andamento)
      .toPromise()
      .then(response => {
        const andamentoAlterado = response;

        this.converterStringsParaDatas([andamentoAlterado]);

        return andamentoAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Andamento> {
    return this.http.get<Andamento>(`${this.andamentosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const andamento = response;

        this.converterStringsParaDatas([andamento]);

        return andamento;
      });
  }


  private converterStringsParaDatas(andamentos: Andamento[]) {
    for (const andamento of andamentos) {
      andamento.dataAndamento = moment(andamento.dataAndamento,
        'YYYY-MM-DD').toDate();

        andamento.dataCadastro = moment(andamento.dataCadastro,
          'YYYY-MM-DD').toDate();

      if (andamento.dataFechado) {
        andamento.dataFechado = moment(andamento.dataFechado,
          'YYYY-MM-DD').toDate();
      }
    }
  }

}
