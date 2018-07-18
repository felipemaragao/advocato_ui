import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';
import { TipoAcao } from './../core/model';
import { AdvocatoHttp } from '../seguranca/advocato-http';


export class AcaoFiltro {
  descricao: string;
  pagina = 0;
  itensPorPagina = 5;

}

@Injectable({
  providedIn: 'root'
})
export class AcaoService {

   acaoUrl: string;


  constructor(private http: AdvocatoHttp) {
      this.acaoUrl = ` ${environment.apiUrl}/tiposAcao`;
    }


  listarTodas(): Promise<any> {

    return this.http.get<any>(this.acaoUrl)
      .toPromise()
      .then(response => response.content);

  }


   atualizar(acao: TipoAcao): Promise<TipoAcao> {
    return this.http.put<TipoAcao>(`${this.acaoUrl}/${acao.codigo}`, acao)
    .toPromise()
    .then(response => {
    const acaoAlterada = response;
    return acaoAlterada;
  });

  }

  buscarPorCodigo(codigo: number): Promise<TipoAcao> {

    return this.http.get<TipoAcao>(`${this.acaoUrl}/${codigo}`)
    .toPromise();
  }


  adicionar(acao: TipoAcao): Promise<TipoAcao> {

    return this.http.post<TipoAcao>(this.acaoUrl, acao)
    .toPromise();


  }



  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.acaoUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  pesquisar(filtro: AcaoFiltro): Promise<any> {
    let  params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.descricao) {
      params = params.append('descricao', filtro.descricao);

    }

    return this.http.get<any>(`${this.acaoUrl}`,
    { params })
        .toPromise()
        .then(response => {
      const acoes = response.content;

    const resultado = {
      acoes,
      total: response.totalElements
    };

    return resultado;
  });
}


}
