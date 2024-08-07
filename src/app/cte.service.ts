import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from './Response';
import { Cte } from './Cte';

@Injectable({
  providedIn: 'root'
})
export class CteService {

  constructor(private http: HttpClient) { }

  urlCte = 'http://erp.macromaq.com.br:3000';

  readFile(formData: FormData): Observable<Response<Cte[]>> {
    return this.http.post<Response<Cte[]>>(`${this.urlCte}/erp/cte`,formData)
  }

  loadXml(): Observable<Response<Cte[]>> {
    return this.http.get<Response<Cte[]>>(`${this.urlCte}/erp/cte`)
  }

  setCtrc(chavesCtrc: any): Observable<Response<Cte[]>> {
    //console.log(chavesCtrc)
    return this.http.post<Response<Cte[]>>(`${this.urlCte}/erp/cte/chaves`, chavesCtrc)
  }

  delCtrc(chave: string): Observable<Response<Cte[]>> {
    const chvObj = {
      chvCtrc: chave
    }
    //console.log(chave)
    return this.http.post<Response<Cte[]>>(`${this.urlCte}/erp/cte/delete/chave`, chvObj)
  }

}
