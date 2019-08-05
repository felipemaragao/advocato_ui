import { AdvocatoHttp } from '../seguranca/advocato-http';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


import * as moment from 'moment';

import { Escritorio } from '../core/model';

export class EscritorioFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;

}
@Injectable({
  providedIn: 'root'
})
export class EscritorioService {

  escritorioUrl: string;


  constructor(private http: AdvocatoHttp) {
      this.escritorioUrl = ` ${environment.apiUrl}/escritorios`;
    }


  listarTodos(): Promise<any> {

    return this.http.get<any>(this.escritorioUrl)
      .toPromise()
      .then(response => response.content);
  }


   atualizar(escritorio: Escritorio): Promise<Escritorio> {
    return this.http.put<Escritorio>(`${this.escritorioUrl}/${escritorio.codigo}`,
    JSON.stringify(escritorio))
    .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Escritorio> {

    return this.http.get<Escritorio>(`${this.escritorioUrl}/${codigo}`)
    .toPromise();
  }


  adicionar(escritorio: Escritorio): Promise<Escritorio> {
    return this.http.post<Escritorio>(this.escritorioUrl, escritorio)
    .toPromise();
  }



  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.escritorioUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  pesquisar(filtro: EscritorioFiltro): Promise<any> {
    let  params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });
    if (filtro.nome) {
      params = params.append('nome', filtro.nome);

    }

    return this.http.get<any>(`${this.escritorioUrl}`,
    { params })
        .toPromise()
        .then(response => {
    const escritorios = response.content;

    const resultado = {
      escritorios,
      total: response.totalElements
    };

    return resultado;
  });
}


}

