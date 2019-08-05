import { AdvocatoHttp } from '../seguranca/advocato-http';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import * as moment from 'moment';


import { Usuario } from '../core/model';



export class UsuarioFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;

}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioUrl: string;


  constructor(private http: AdvocatoHttp) {
      this.usuarioUrl = ` ${environment.apiUrl}/usuarios`;
    }


  listarTodos(): Promise<any> {

    return this.http.get<any>(this.usuarioUrl)
      .toPromise()
      .then(response => response.content);
  }


   atualizar(usuario: Usuario): Promise<Usuario> {
    return this.http.put<Usuario>(`${this.usuarioUrl}/${usuario.codigo}`, usuario)
    .toPromise();
   }

  buscarPorCodigo(codigo: number): Promise<Usuario> {

    return this.http.get<Usuario>(`${this.usuarioUrl}/${codigo}`)
    .toPromise();
  }


  adicionar(usuario: Usuario): Promise<Usuario> {

    return this.http.post<Usuario>(this.usuarioUrl, usuario)
    .toPromise();

  }



  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.usuarioUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }



  resetarSenha(codigo: number): Promise<void> {
    return this.http.put(`${this.usuarioUrl}/${codigo}/reset`,
    JSON.stringify(codigo))
    .toPromise()
    .then(() => null);

  }

  pesquisar(filtro: UsuarioFiltro): Promise<any> {
    let  params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });
    if (filtro.nome) {
      params = params.set('nome', filtro.nome);

    }

    return this.http.get<any>(`${this.usuarioUrl}`,
    { params })
        .toPromise()
        .then(response => {
    const usuarios = response.content;

    const resultado = {
      usuarios,
      total: response.totalElements
    };

    return resultado;
  });
}


}
