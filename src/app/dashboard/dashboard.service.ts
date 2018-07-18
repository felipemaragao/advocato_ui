import { AdvocatoHttp } from './../seguranca/advocato-http';

import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import 'rxjs/operator/toPromise';
import * as moment from 'moment';



@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  andamentosUrl: string;

  constructor(private http: AdvocatoHttp) {
    this.andamentosUrl = `${environment.apiUrl}/andamentos`;
  }
  andamentosPorTipoAndamento(): Promise<Array<any>>{
    return this.http.get<Array<any>>(`${this.andamentosUrl}/estatisticas/tipo-andamento`)
    .toPromise();


  }


  andamentosPorDia(): Promise<Array<any>> {
    return this.http.get<Array<any>>(`${this.andamentosUrl}/estatisticas/por-dia`)
    .toPromise()
    .then(response => {
      const dados = response;
      this.converterStringParaDatas(dados);
      return dados;

    });

  }
  private converterStringParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }

}
