import { AdvocatoHttp } from './../seguranca/advocato-http';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { environment } from '../../environments/environment';


import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { Litigante } from './../core/model';

export class LitiganteFiltro {
  descricaoAutor: string;
  pagina = 0;
  itensPorPagina = 5;

}

@Injectable({
  providedIn: 'root'
})
export class LitiganteService {

  litiganteUrl: string;


  constructor(private http: AdvocatoHttp) {
      this.litiganteUrl = ` ${environment.apiUrl}/litigantes`;
    }


  listarTodas(): Promise<any> {
    return this.http.get<any>(this.litiganteUrl)
      .toPromise()
      .then(response => response.content);
  }


   atualizar(litigante: Litigante): Promise<Litigante> {
    return this.http.put<Litigante>(`${this.litiganteUrl}/${litigante.codigo}`, litigante)
    .toPromise()
    .then(response => {
    const litiganteAlterado = response;
    return litiganteAlterado;
  });

  }

  buscarPorCodigo(codigo: number): Promise<Litigante> {

    return this.http.get<Litigante>(`${this.litiganteUrl}/${codigo}`)
    .toPromise();
  }


  adicionar(litigante: Litigante): Promise<Litigante> {
    return this.http.post<Litigante>(this.litiganteUrl, litigante)
    .toPromise();
  }



  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.litiganteUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  pesquisar(filtro: LitiganteFiltro): Promise<any> {
    let  params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.descricaoAutor) {
      params = params.append('descricaoAutor', filtro.descricaoAutor);

    }

    return this.http.get<any>(`${this.litiganteUrl}`,
    { params })
        .toPromise()
        .then(response => {
    const litigantes = response.content;

    const resultado = {
      litigantes,
      total: response.totalElements
    };

    return resultado;
  });
}


}
