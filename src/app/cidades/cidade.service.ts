import { AdvocatoHttp } from './../seguranca/advocato-http';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { HttpParams } from '@angular/common/http';


import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';


import { Cidade } from './../core/model';


export class CidadeFiltro {
  nome: string;
  estado: string;
  pagina = 0;
  itensPorPagina = 5;

}


@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  cidadeUrl: string;


    constructor(private http: AdvocatoHttp) {
        this.cidadeUrl = ` ${environment.apiUrl}/cidades`;
      }


      listarTodas(): Promise<any> {

        return this.http.get<any>(this.cidadeUrl)
        .toPromise()
        .then(response => response.content);
      }

      buscarPorCodigoEstado(codigo: number): Promise<any> {

            return this.http.get<Cidade>(`${this.cidadeUrl}/uf/${codigo}`)
            .toPromise();
          }


      buscarFiltrada(filtro: CidadeFiltro): Promise<any> {
        let  params = new HttpParams({
          fromObject: {
            page: filtro.pagina.toString(),
            size: filtro.itensPorPagina.toString()
          }
        });

        if (filtro.estado) {
          params = params.append('estado', filtro.estado);
        }
        return this.http.get<any>(`${this.cidadeUrl}`,
        { search: params })
            .toPromise()
            .then(response => {

        const cidades = response.content;

        const resultado = {
          cidades,
          total: response.totalElements
        };

        return resultado;
      });
    }
}
