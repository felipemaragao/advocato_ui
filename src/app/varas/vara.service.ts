import { HttpParams } from '@angular/common/http';
import { AdvocatoHttp } from '../seguranca/advocato-http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import * as moment from 'moment';

import { Vara } from '../core/model';


export class VaraFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;

}


@Injectable({
  providedIn: 'root'
})
export class VaraService {
  varaUrl: string;


  constructor(private http: AdvocatoHttp) {
      this.varaUrl = ` ${environment.apiUrl}/varas`;
    }


  listarTodas(): Promise<any> {

    return this.http.get<any>(this.varaUrl)
      .toPromise()
      .then(response => response.content);
  }


   atualizar(vara: Vara): Promise<Vara> {
    return this.http.put<Vara>(`${this.varaUrl}/${vara.codigo}`, vara)
    .toPromise()
    .then(response => {
    const comarcaAlterada = response;
    return comarcaAlterada;
  });

  }

  buscarPorCodigo(codigo: number): Promise<Vara> {
    return this.http.get<Vara>(`${this.varaUrl}/${codigo}`)
    .toPromise();
  }


  adicionar(vara: Vara): Promise<Vara> {

    return this.http.post<Vara>(this.varaUrl, vara)
    .toPromise();

  }



  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.varaUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  pesquisar(filtro: VaraFiltro): Promise<any> {
    let  params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);

    }

    return this.http.get<any>(`${this.varaUrl}`,
    { params })
        .toPromise()
        .then(response => {

    const varas = response.content;

    const resultado = {
      varas,
      total: response.totalElements
    };

    return resultado;
  });
}


}
