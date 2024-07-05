import { Fretes } from './Fretes';
import { Observable, catchError, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from './Response';
import { MessagesService } from './messages.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FretesService {
  urlFretes = 'http://erp.macromaq.com.br:3000/fretes';
  urlValidFrete = 'http://erp.macromaq.com.br:3000/validacao';
  showLoading: boolean = false;

  constructor(
    private http: HttpClient,
    private message: MessagesService,
    private router: Router) { }

  getFrete(chave: object): Observable<Response<Fretes[]>> {
    return this.http.post<Response<Fretes[]>>(this.urlFretes,chave);
  }

  getFretes(token: String): Observable<Response<Fretes[]>> {
    return this.http.get<Response<Fretes[]>>(`${this.urlFretes}/${token}`).pipe(
      catchError((err: HttpErrorResponse) => {
        let errorMsg = '';
          errorMsg = err.error.msg
          if (errorMsg) {
             this.showLoading = false;
             this.message.callMsg(errorMsg,'red','assets/erros.png')
          }

          // if (err.error.msg instanceof ErrorEvent) {
          //   errorMsg = `${err.error.msg}`
          //   this.message.callMsg(errorMsg,'red','assets/erros.png')
          // }

        return throwError(() => {
          new Error(errorMsg);
          this.showLoading = false;
          this.router.navigate(['/']);
        })
      })
    )
  }

  validar(chvcte: string): Observable<any> {
    return this.http.get<any>(`${this.urlValidFrete}/${chvcte}/1`);
  }
}
