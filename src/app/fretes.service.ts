import { Fretes } from './Fretes';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from './Response';

@Injectable({
  providedIn: 'root'
})
export class FretesService {
  urlFretes = 'http://erp.macromaq.com.br:3000/fretes';
  urlValidFrete = 'http://erp.macromaq.com.br:3000/validacao';

  constructor(private http: HttpClient) { }

  getFrete(chave: object): Observable<Response<Fretes[]>> {
    return this.http.post<Response<Fretes[]>>(this.urlFretes,chave);
  }

  getFretes(): Observable<Response<Fretes[]>> {
    return this.http.get<Response<Fretes[]>>(this.urlFretes);
  }

  validar(chvcte: string): Observable<any> {
    return this.http.get<any>(`${this.urlValidFrete}/${chvcte}/1`);
  }
}
