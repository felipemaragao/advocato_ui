import { AdvocatoHttp } from '../seguranca/advocato-http';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


import * as moment from 'moment';
import { Pessoa, Cidade, Estado } from '../core/model';
import { environment } from '../../environments/environment';


export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;

}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoaUrl: string;
  cidadeUrl: string;
  estadoUrl: string;



  constructor(private http: AdvocatoHttp) {
    this.pessoaUrl = ` ${environment.apiUrl}/pessoas`;
    this.cidadeUrl = ` ${environment.apiUrl}/cidades`;
    this.estadoUrl = ` ${environment.apiUrl}/estados`;
  }


  atualizar(pessoa: Pessoa): Promise<Pessoa> {

    return this.http.put<Pessoa>(`${this.pessoaUrl}/${pessoa.codigo}`, pessoa)
  .toPromise()
  .then(response => {
    const pessoaAlterada = response;
    return pessoaAlterada;
  });

  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get<Pessoa>(`${this.pessoaUrl}/${codigo}`)
    .toPromise()
    .then(response => {
      const pessoa = response;
      return pessoa;
    });
  }


  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post<Pessoa>(this.pessoaUrl, pessoa)
    .toPromise();
  }

selecionarIndicacao(): Promise<Pessoa[]> {
  return this.http.get<Pessoa[]>(this.pessoaUrl)
      .toPromise();
}

  listarTodas(): Promise<any> {
    return this.http.get<any>(this.pessoaUrl)
      .toPromise()
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pessoaUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    let  params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);

    }

    return this.http.get<any>(`${this.pessoaUrl}`,
    { params })
        .toPromise()
        .then(response => {
       const pessoas = response.content;

    const resultado = {
      pessoas,
      total: response.totalElements
    };

    return resultado;
  });
}

mudarStatus(codigo: number, ativo: boolean): Promise<void> {
  const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

  return this.http.put(`${this.pessoaUrl}/${codigo}/ativo`, ativo, { headers })
    .toPromise()
    .then(() => null);
}


listarEstados(): Promise<Estado[]> {
  return this.http.get<Estado[]>(this.estadoUrl).toPromise();
}


pesquisarCidades(estado): Promise<Cidade[]> {
  const params = new HttpParams()
    .append('estado', estado);

  return this.http.get<Cidade[]>(this.cidadeUrl, {
    params
  }).toPromise();
}

}
