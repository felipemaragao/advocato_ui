import { Injectable } from '@angular/core';

import { HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { AdvocatoHttp } from '../seguranca/advocato-http';

import { StatusEscritorio } from '../core/model';


export class StatusEscritorioFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;

}

@Injectable({
  providedIn: 'root'
})
export class StatusEscritorioService {

  statusEscritorioUrl: string;


  constructor(private http: AdvocatoHttp) {
      this.statusEscritorioUrl = ` ${environment.apiUrl}/statusEscritorios`;
    }


  listarTodas(): Promise<any> {
    return this.http.get<any>(this.statusEscritorioUrl)
      .toPromise()
      .then(response => response.content);
  }


   atualizar(statusEscritorio: StatusEscritorio): Promise<StatusEscritorio> {
    return this.http.put<StatusEscritorio>(`${this.statusEscritorioUrl}/${statusEscritorio.codigo}`, statusEscritorio)
    .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<StatusEscritorio> {

    return this.http.get<StatusEscritorio>(`${this.statusEscritorioUrl}/${codigo}`)
    .toPromise();
  }


  adicionar(statusEscritorio: StatusEscritorio): Promise<StatusEscritorio> {
    return this.http.post<StatusEscritorio>(this.statusEscritorioUrl, statusEscritorio)
    .toPromise();

  }



  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.statusEscritorioUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  pesquisar(filtro: StatusEscritorioFiltro): Promise<any> {
    let  params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);

    }

    return this.http.get<any>(`${this.statusEscritorioUrl}`,
    { params })
        .toPromise()
        .then(response => {
    const statusEscritorios = response.content;

    const resultado = {
      statusEscritorios,
      total: response.totalElements
    };

    return resultado;
  });
}


}

