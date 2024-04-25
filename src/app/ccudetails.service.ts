import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CcuDetails } from './CcuDetails';
import { Response } from './Response';
import { DetailEmail } from './DetailEmail';

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
  getRateioColaborador(rateioColab: DetailEmail): Observable<Response<CcuDetails[]>> {
    const numFat = rateioColab.numFat;
    const email = rateioColab.email;
    return this.http.get<Response<CcuDetails[]>>(`${this.urlApi}/erp/faturas-erp/fatura/email/${numFat}/${email}`);
  }
}
