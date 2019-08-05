import { AdvocatoHttp } from '../seguranca/advocato-http';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { FaseProcesso } from '../core/model';
import { environment } from '../../environments/environment';



export class FaseFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;

}

@Injectable({
  providedIn: 'root'
})
export class FaseProcessoService {

   faseUrl: string;


  constructor(private http: AdvocatoHttp) {
    this.faseUrl = ` ${environment.apiUrl}/fasesProcesso`;
  }


  atualizar(fase: FaseProcesso): Promise<FaseProcesso> {

    return this.http.put<FaseProcesso>(`${this.faseUrl}/${fase.codigo}`, fase)
    .toPromise()
    .then(response => {
    const faseAlterada = response;
    return faseAlterada;
  });

  }

  buscarPorCodigo(codigo: number): Promise<FaseProcesso> {

    return this.http.get<FaseProcesso>(`${this.faseUrl}/${codigo}`)
    .toPromise();
  }


  adicionar(fase: FaseProcesso): Promise<FaseProcesso> {
    return this.http.post<FaseProcesso>(this.faseUrl, fase)
    .toPromise();

  }


  listarTodas(): Promise<any> {
    return this.http.get<any>(this.faseUrl)
      .toPromise()
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.faseUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  pesquisar(filtro: FaseFiltro): Promise<any> {
    let  params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);

    }

    return this.http.get<any>(`${this.faseUrl}`,
    { params })
        .toPromise()
        .then(response => {

    const fases = response.content;

    const resultado = {
      fases,
      total: response.totalElements
    };

    return resultado;
  });
}

}
