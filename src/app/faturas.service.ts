import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Fatura } from './Fatura'
import { Response } from './Response';
import { Rateio } from './Rateio';
import { SetFatura } from './SetFatura';
import { Faturas } from './Faturas';

@Injectable({
  providedIn: 'root'
})
export class FaturasService {
  public urlHttp = "";
  public users = {}
  urlFatura = 'http://erp.macromaq.com.br:3000';
  constructor(private http: HttpClient) {
  }
  getRateio(nFatura: any): Observable<Response<Rateio[]>> {

    const { numFat, type } = nFatura;
    //console.log(numFat, type)
    switch(type) {
      case 'planosaude':
        this.urlHttp = `${this.urlFatura}/hcm/faturas`;
        break;
      case 'combustivel':
        this.urlHttp = `${this.urlFatura}/erp/faturas-erp`;
    }
    return this.http.get<Response<Rateio[]>>(`${this.urlHttp}/fatura/${numFat}`);

  }

  // Atualizara o rateio das faturas de Plano de Saude e de Abastecimento
  setRateio(rateio: any): Observable<Response<Rateio[]>> {
      this.urlHttp = "";
      const { fatura, objRateio, origem } = rateio;
      //console.log("Rateio no Service: " + origem)

      if (origem == "planosaude") {
        this.urlHttp = `${this.urlFatura}/hcm/rateio`;
      }
      if (origem == "combustivel") {
        this.urlHttp = `${this.urlFatura}/erp/rateio`;
      }
      return this.http.post<Response<Rateio[]>>(this.urlHttp, rateio);
  }

  getFaturas(type: string): Observable<Response<Faturas[]>> {
    switch(type) {
        case 'planosaude':
          this.urlHttp = `${this.urlFatura}/hcm/faturas`;
          break;
        case 'combustivel':
          this.urlHttp = `${this.urlFatura}/erp/faturas-erp`;
      }
    return this.http.get<Response<Faturas[]>>(this.urlHttp)
  }
  /*
  readFile(formData: FormData): Observable<Response<Faturas[]>> {

    return this.http.post<Response<Faturas[]>>(`${this.urlFatura}/import/faturas/${type}`,formData)
  }
  */

  readFile(formData: FormData): Observable<Response<Faturas[]>> {
    return this.http.post<Response<Faturas[]>>(`${this.urlFatura}/erp/faturas-erp`,formData)
  }

  deleteFile(numFatura: String): Observable<Response<Faturas[]>> {
    return this.http.post<Response<Faturas[]>>(`${this.urlFatura}/erp/faturas-erp/delete`,numFatura)
  }

}
