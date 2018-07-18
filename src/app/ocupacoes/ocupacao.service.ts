import { AdvocatoHttp } from './../seguranca/advocato-http';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class OcupacaoService {


  ocupacaoUrl: string;


    constructor(private http: AdvocatoHttp) {
        this.ocupacaoUrl = ` ${environment.apiUrl}/ocupacoes`;
      }


      listarTodas(): Promise<any> {

        return this.http.get<any>(this.ocupacaoUrl)
        .toPromise()
        .then(response => response.content);
      }

}
