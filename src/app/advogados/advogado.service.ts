import { AdvocatoHttp } from '../seguranca/advocato-http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';


import * as moment from 'moment';

import { Advogado } from '../core/model';

export class AdvogadoFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;

}
@Injectable({
  providedIn: 'root'
})
export class AdvogadoService {

  advogadoUrl: string;


  constructor(private http: AdvocatoHttp) {
      this.advogadoUrl = ` ${environment.apiUrl}/advogados`;
    }


  listarTodos(): Promise<any> {

    return this.http.get<any>(this.advogadoUrl)
      .toPromise()
      .then(response => response.content);

  }


   atualizar(advogado: Advogado): Promise<Advogado> {
    return this.http.put<Advogado>(`${this.advogadoUrl}/${advogado.codigo}`, advogado)
    .toPromise()
    .then(response => {
    const advogadoAlterado = response;
    return advogadoAlterado;
  });

  }

  buscarPorCodigo(codigo: number): Promise<Advogado> {

    return this.http.get<Advogado>(`${this.advogadoUrl}/${codigo}`)
    .toPromise()
    .then(response => {
      const advogado = response;
      return advogado;
    });
  }


  adicionar(advogado: Advogado): Promise<Advogado> {
    return this.http.post<Advogado>(this.advogadoUrl, JSON.stringify(advogado))
    .toPromise();
  }



  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.advogadoUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  pesquisar(filtro: AdvogadoFiltro): Promise<any> {
    let  params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);

    }

    return this.http.get<any>(`${this.advogadoUrl}`,
    { params })
        .toPromise()
        .then(response => {

    const advogados = response.content;

    const resultado = {
      advogados,
      total: response.totalElements
    };

    return resultado;
  });
}


}

