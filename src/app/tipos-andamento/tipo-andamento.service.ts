import { AdvocatoHttp } from '../seguranca/advocato-http';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


import * as moment from 'moment';

import { TipoAndamento } from '../core/model';

export class TipoAndamentoFiltro {
  descricao: string;
  pagina = 0;
  itensPorPagina = 5;

}
@Injectable({
  providedIn: 'root'
})
export class TipoAndamentoService {

  tipoAndamentoUrl: string;


  constructor(private http: AdvocatoHttp) {
      this.tipoAndamentoUrl = ` ${environment.apiUrl}/tiposAndamento`;
    }


  listarTodas(): Promise<any> {
    return this.http.get<any>(this.tipoAndamentoUrl)
      .toPromise()
      .then(response => response.content);
  }



  atualizar(tipoAndamento: TipoAndamento): Promise<TipoAndamento> {
    return this.http.put<TipoAndamento>(`${this.tipoAndamentoUrl}/${tipoAndamento.codigo}`, tipoAndamento)
    .toPromise()
    .then(response => {
    const tipoAndamentoAlterado = response;
    return tipoAndamentoAlterado;
  });

  }

  buscarPorCodigo(codigo: number): Promise<TipoAndamento> {

    return this.http.get<TipoAndamento>(`${this.tipoAndamentoUrl}/${codigo}`)
    .toPromise();
  }


  adicionar(tipoAndamento: TipoAndamento): Promise<TipoAndamento> {

    return this.http.post<TipoAndamento>(this.tipoAndamentoUrl, tipoAndamento)
    .toPromise();

  }



  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.tipoAndamentoUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  pesquisar(filtro: TipoAndamentoFiltro): Promise<any> {
    let  params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });
    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);

    }

    return this.http.get<any>(`${this.tipoAndamentoUrl}`,
    { params })
        .toPromise()
        .then(response => {
      const tiposAndamento = response.content;

    const resultado = {
      tiposAndamento,
      total: response.totalElements
    };

    return resultado;
  });
}


}

