import { HttpParams } from '@angular/common/http';
import { AdvocatoHttp } from './../seguranca/advocato-http';
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { environment } from '../../environments/environment';


import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { Comarca } from './../core/model';


export class ComarcaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;

}


@Injectable({
  providedIn: 'root'
})
export class ComarcaService {
  comarcaUrl: string;


  constructor(private http: AdvocatoHttp) {
      this.comarcaUrl = ` ${environment.apiUrl}/comarcas`;
    }


  listarTodas(): Promise<any> {

    return this.http.get<any>(this.comarcaUrl)
      .toPromise()
      .then(response => response.content);
  }


   atualizar(comarca: Comarca): Promise<Comarca> {
    return this.http.put<Comarca>(`${this.comarcaUrl}/${comarca.codigo}`, comarca)
    .toPromise()
    .then(response => {
    const comarcaAlterada = response;
    return comarcaAlterada;
  });

  }

  buscarPorCodigo(codigo: number): Promise<Comarca> {
    return this.http.get<Comarca>(`${this.comarcaUrl}/${codigo}`)
    .toPromise();
  }


  adicionar(comarca: Comarca): Promise<Comarca> {

    return this.http.post<Comarca>(this.comarcaUrl, comarca)
    .toPromise();

  }



  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.comarcaUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  pesquisar(filtro: ComarcaFiltro): Promise<any> {
    let  params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);

    }

    return this.http.get<any>(`${this.comarcaUrl}`,
    { params })
        .toPromise()
        .then(response => {

    const comarcas = response.content;

    const resultado = {
      comarcas,
      total: response.totalElements
    };

    return resultado;
  });
}


}
