import { AdvocatoHttp } from './../seguranca/advocato-http';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { environment } from '../../environments/environment';


import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { Competencia } from './../core/model';



export class CompetenciaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;

}
@Injectable({
  providedIn: 'root'
})
export class CompetenciaService {

  competenciaUrl: string;


  constructor(private http: AdvocatoHttp) {
      this.competenciaUrl = ` ${environment.apiUrl}/competencias`;
    }


  listarTodas(): Promise<any> {

    return this.http.get<any>(this.competenciaUrl)
      .toPromise()
      .then(response => response.content);
  }


   atualizar(competencia: Competencia): Promise<Competencia> {
    return this.http.put<Competencia>(`${this.competenciaUrl}/${competencia.codigo}`, competencia)
    .toPromise()
    .then(response => {
    const competenciaAlterada = response;
    return competenciaAlterada;
  });

  }

  buscarPorCodigo(codigo: number): Promise<Competencia> {

    return this.http.get<Competencia>(`${this.competenciaUrl}/${codigo}`)
    .toPromise();
  }


  adicionar(competencia: Competencia): Promise<Competencia> {
    return this.http.post<Competencia>(this.competenciaUrl, competencia)
    .toPromise();
  }



  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.competenciaUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  pesquisar(filtro: CompetenciaFiltro): Promise<any> {
    let  params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);

    }

    return this.http.get<any>(`${this.competenciaUrl}`,
    { search: params })
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
