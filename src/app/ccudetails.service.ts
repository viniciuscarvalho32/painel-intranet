import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CcuDetails } from './CcuDetails';
import { Response } from './Response';

@Injectable({
  providedIn: 'root'
})
export class CcudetailsService {

  urlApi = 'http://erp.macromaq.com.br:3000';

  constructor(private http: HttpClient) { }

  showDetails(fat: string, ccu: string): Observable<Response<CcuDetails[]>> {
    return this.http.get<Response<CcuDetails[]>>(`${this.urlApi}/erp/faturas-erp/fatura/rateiocc/${fat}/${ccu}`);
  }
  close() {
    console.log("Fechando")
  }
}
