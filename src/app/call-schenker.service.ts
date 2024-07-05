import { Response } from './Response';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CcuDetails } from './CcuDetails';
//import { dotenv } from 'dotenv';
//dotenv.config();

@Injectable({
  providedIn: 'root'
})
export class CallSchenkerService {

  urlSChenker: any = 'https://ecargo.dbschenker.com/api/comprovante/autenticacao';
  constructor(private http: HttpClient) { }

  callAppServ(): Observable<any> {
    const dataAuth = {
      Usuario: "Macromaq.SC",
      Senha: "MACRO2024@"
    }
    return this.http.post<any>(this.urlSChenker,dataAuth);
  }


  callAppServMov(): Observable<any> {
    const dataAuth = {
      Usuario: "Macromaq.SC",
      Senha: "MACRO2024@"
    }
    return this.http.post<any>(this.urlSChenker,dataAuth);
  }
}
