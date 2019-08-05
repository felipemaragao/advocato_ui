import { HttpParams } from '@angular/common/http';
import { AdvocatoHttp } from '../seguranca/advocato-http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import * as moment from 'moment';

import { Ocupacao } from '../core/model';


export class OcupacaoFiltro {
  nome: string;
  codigoCBO: string;
  pagina = 0;
  itensPorPagina = 5;

}


@Injectable({
  providedIn: 'root'
})
export class OcupacaoService {
  ocupacaoUrl: string;


  constructor(private http: AdvocatoHttp) {
      this.ocupacaoUrl = ` ${environment.apiUrl}/ocupacoes`;
    }


  listarTodas(): Promise<any> {

    return this.http.get<any>(this.ocupacaoUrl)
      .toPromise()
      .then(response => response.content);
  }


   atualizar(ocupacao: Ocupacao): Promise<Ocupacao> {
    return this.http.put<Ocupacao>(`${this.ocupacaoUrl}/${ocupacao.codigo}`, ocupacao)
    .toPromise()
    .then(response => {
    const ocupacaoAlterada = response;
    return ocupacaoAlterada;
  });

  }

  buscarPorCodigo(codigo: number): Promise<Ocupacao> {
    return this.http.get<Ocupacao>(`${this.ocupacaoUrl}/${codigo}`)
    .toPromise();
  }


  adicionar(ocupacao: Ocupacao): Promise<Ocupacao> {

    return this.http.post<Ocupacao>(this.ocupacaoUrl, ocupacao)
    .toPromise();

  }



  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.ocupacaoUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  pesquisar(filtro: OcupacaoFiltro): Promise<any> {
    let  params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);

    }

    if (filtro.codigoCBO) {
      params = params.set('codigoCBO', filtro.codigoCBO);

    }

    return this.http.get<any>(`${this.ocupacaoUrl}`,
    { params })
        .toPromise()
        .then(response => {

    const ocupacoes = response.content;

    const resultado = {
      ocupacoes,
      total: response.totalElements
    };

    return resultado;
  });
}


}
