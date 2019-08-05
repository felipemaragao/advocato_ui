import { AdvocatoHttp } from '../seguranca/advocato-http';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { Estado } from '../core/model';
import { environment } from '../../environments/environment';



export class EstadoFiltro {
  nome: string;
  sigla: string;
  pagina = 0;
  itensPorPagina = 5;

}

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  estadoUrl: string;


  constructor(private http: AdvocatoHttp) {
    this.estadoUrl = ` ${environment.apiUrl}/estados`;
  }


  atualizar(estado: Estado): Promise<Estado> {

    return this.http.put<Estado>(`${this.estadoUrl}/${estado.codigo}`, estado)
    .toPromise()
    .then(response => {
    const faseAlterada = response;
    return faseAlterada;
  });

  }

  buscarPorCodigo(codigo: number): Promise<Estado> {

    return this.http.get<Estado>(`${this.estadoUrl}/${codigo}`)
    .toPromise();
  }


  adicionar(estado: Estado): Promise<Estado> {
    return this.http.post<Estado>(this.estadoUrl, estado)
    .toPromise();

  }


  listarTodas(): Promise<any> {
    return this.http.get<any>(this.estadoUrl)
      .toPromise()
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.estadoUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  pesquisar(filtro: EstadoFiltro): Promise<any> {
    let  params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);

    }
    if (filtro.sigla) {
      params = params.append('sigla', filtro.sigla);

    }

    return this.http.get<any>(`${this.estadoUrl}/estado`,
    { params })
        .toPromise()
        .then(response => {

    const estados = response.content;

    const resultado = {
      estados,
      total: response.totalElements
    };

    return resultado;
  });
}

}
