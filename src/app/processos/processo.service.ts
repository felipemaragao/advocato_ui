import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';

import * as moment from 'moment';


import { environment } from '../../environments/environment';

import { Processo, Comarca, Competencia, Vara } from '../core/model';
import { AdvocatoHttp } from './../seguranca/advocato-http';


export class ProcessoFiltro {
  numeroProcesso: string;
  dataAjuizadoDe: Date;
  dataAjuizadoAte: Date;
  cliente: string;
  contraria: string;
  numeroExterno: string;

  pagina = 0;
  itensPorPagina = 5;

}

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {

  processoUrl: string;
  comarcaUrl: string;
  competenciaUrl: string;
  varaUrl: string;



  constructor(private http: AdvocatoHttp) {
    this.processoUrl = ` ${environment.apiUrl}/processos`;
    this.varaUrl = ` ${environment.apiUrl}/varas`;
    this.comarcaUrl = ` ${environment.apiUrl}/comarcas`;
    this.competenciaUrl = ` ${environment.apiUrl}/competencias`;
  }

    adicionar(processo: Processo): Promise<Processo> {
      return this.http.post<Processo>(this.processoUrl, processo)
      .toPromise();
    }

    atualizar(processo: Processo): Promise<Processo> {
      return this.http.put<Processo>(`${this.processoUrl}/${processo.codigo}`, processo)
        .toPromise()
        .then(response => {
          const processoAlterado = response;
          this.converterStringsParaDatas([processoAlterado]);
          return processoAlterado;
        });
    }


    listarTodas(): Promise<any> {
      return this.http.get<Processo[]>(this.processoUrl)
        .toPromise();
    }


listarComarcas(): Promise<any[]> {
  return this.http.get<any>(this.comarcaUrl)
      .toPromise()
      .then(response => response.content);
}

listarCompetencias(): Promise<any[]> {
  return this.http.get<any>(this.competenciaUrl)
      .toPromise()
      .then(response => response.content);
}

pesquisarCompetencia(comarca): Promise<Competencia[]> {

  let  params = new HttpParams();
  params = params.append('comarca', comarca);
  return this.http.get<Vara[]>(this.varaUrl, {
    params
  }).toPromise();
}

pesquisarComarcaCompetencia(comarca, competencia): Promise<Vara[]> {
  const  params = new HttpParams()
  .append('comarca', comarca)
  .append('competencia', competencia);

  return this.http.get<Vara[]>(this.varaUrl, {
    params
  }).toPromise();
}

    excluir(codigo: number): Promise<void> {

      return this.http.delete(`${this.processoUrl}/${codigo}`)
        .toPromise()
        .then(() => null);
    }

    pesquisar(filtro: ProcessoFiltro): Promise<any> {
      let  params = new HttpParams({
        fromObject: {
          page: filtro.pagina.toString(),
          size: filtro.itensPorPagina.toString()
        }
      });

      if (filtro.cliente) {
        params = params.append('cliente', filtro.cliente);
      }

      if (filtro.cliente) {
        params = params.append('contraria', filtro.contraria);
      }

      if (filtro.numeroExterno) {
        params = params.append('numeroExterno', filtro.numeroExterno);

      }

      if (filtro.numeroProcesso) {
        params = params.append('numeroProcesso', filtro.numeroProcesso);

      }
      if (filtro.dataAjuizadoDe) {
        params = params.append('dataAjuizadoDe', moment(filtro.dataAjuizadoDe).format('YYYY-MM-DD'));
      }

      if (filtro.dataAjuizadoAte) {
        params = params.append('dataAjuizadoAte', moment(filtro.dataAjuizadoAte).format('YYYY-MM-DD'));
      }

      return this.http.get<any>(`${this.processoUrl}`, { params })
          .toPromise()
          .then(response => {
         const processos = response.content;

      const resultado = {
        processos,
        total: response.totalElements
      };

      return resultado;
    });
  }

  buscarPorCodigo(codigo: number): Promise<Processo> {

    return this.http.get<Processo>(`${this.processoUrl}/${codigo}`)
    .toPromise()
    .then(response => {
      const processo = response;
      this.converterStringsParaDatas([processo]);
      return processo;
    });
  }

  private converterStringsParaDatas(processos: Processo[]) {
    for (const processo of processos) {
      if (processo.dataCadastro) {
        processo.dataCadastro = moment(processo.dataCadastro,
          'YYYY-MM-DD').toDate();
      }
    }
    for (const processo of processos) {
      if (processo.dataAjuizamento) {
        processo.dataAjuizamento = moment(processo.dataAjuizamento,
          'YYYY-MM-DD').toDate();
      }
    }
  }


  }
