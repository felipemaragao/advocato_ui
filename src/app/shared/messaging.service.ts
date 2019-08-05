import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { environment } from '../../environments/environment';

import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  currentMessage = new BehaviorSubject(null);
  usuarioUrl: string;

  constructor(
    private http: HttpClient) {
      this.usuarioUrl = ` ${environment.apiUrl}/usuarios`;
    }



}
