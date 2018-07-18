import { Estado } from './../core/model';
import { AdvocatoHttp } from './../seguranca/advocato-http';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headers, Http} from '@angular/http';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  estadoUrl: string;


    constructor(private http: AdvocatoHttp) {
        this.estadoUrl = ` ${environment.apiUrl}/estados`;
      }

      listarTodas(): Promise<any> {
        return this.http.get<any>(this.estadoUrl)
        .toPromise()
        .then(response => response.content);
       }



  }
