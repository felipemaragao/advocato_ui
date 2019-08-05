import { AdvocatoHttp } from '../seguranca/advocato-http';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import * as moment from 'moment';

import { Localizacao, Competencia, Comarca } from '../core/model';



export class LocalizacaoFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;

}
@Injectable({
  providedIn: 'root'
})
export class LocalizacaoService {

  localizacaoUrl: string;
  competenciaUrl: string;
  comarcaUrl: string;
  varaUrl: string;


  constructor(private http: AdvocatoHttp) {
      this.localizacaoUrl = ` ${environment.apiUrl}/localizacoes`;
      this.competenciaUrl = ` ${environment.apiUrl}/competencias`;
      this.comarcaUrl = ` ${environment.apiUrl}/comarcas`;
      this.varaUrl = ` ${environment.apiUrl}/varas`;


    }


  listarTodas(): Promise<any> {

    return this.http.get<any>(this.varaUrl)
      .toPromise()
      .then(response => response.content);
  }

  buscarPorCodigoComarca(comarca: number): Promise<any> {

    return this.http.get(`${this.varaUrl}/comarca/${comarca}`)
    .toPromise();
  }

  buscarPorCodigoComarcaCompetencia(comarca: number, competencia: number): Promise<any> {

    return this.http.get(`${this.varaUrl}/ambos/comarca=${comarca}&competencia=${competencia}`)
    .toPromise();
  }


  atualizar(localizacao: Localizacao): Promise<Localizacao> {
    return this.http.put<Localizacao>(`${this.localizacaoUrl}/${localizacao.codigo}`, localizacao)
    .toPromise()
    .then(response => {
    const localizacaoAlterada = response;
    return localizacaoAlterada;
  });

  }

  adicionar(localizacao: Localizacao): Promise<Localizacao> {
    return this.http.post<Localizacao>(this.localizacaoUrl, localizacao)
    .toPromise();

  }

  buscarPorCodigo(codigo: number): Promise<Localizacao> {

    return this.http.get<Localizacao>(`${this.localizacaoUrl}/${codigo}`)
    .toPromise();
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.localizacaoUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  pesquisar(filtro: LocalizacaoFiltro): Promise<any> {
    let  params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });
    if (filtro.nome) {
      params = params.set('nome', filtro.nome);

    }

    return this.http.get<any>(`${this.localizacaoUrl}`,
    { params })
        .toPromise()
        .then(response => {

    const localizacoes = response.content;

    const resultado = {
      localizacoes,
      total: response.totalElements
    };

    return resultado;
  });
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

listarVaras(): Promise<any[]> {
  return this.http.get<any>(this.varaUrl)
      .toPromise()
      .then(response => response.content);
}

listar(): Promise<any[]> {
  return this.http.get<any>(this.competenciaUrl)
      .toPromise()
      .then(response => response.content);
}

pesquisarCompetencia(comarca): Promise<Localizacao[]> {

  let  params = new HttpParams();
  params = params.append('comarca', comarca);
  return this.http.get<Localizacao[]>(this.localizacaoUrl, {
    params
  }).toPromise();
}

pesquisarComarcaCompetencia(comarca, competencia): Promise<Localizacao[]> {
  const  params = new HttpParams()
  .append('comarca', comarca)
  .append('competencia', competencia);

  return this.http.get<Localizacao[]>(this.localizacaoUrl, {
    params
  }).toPromise();
}


}
