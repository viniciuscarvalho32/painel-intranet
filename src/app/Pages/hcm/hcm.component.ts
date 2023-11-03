import { Component } from '@angular/core';
import { FaturasService } from 'src/app/faturas.service';
import {FormControl, Validators, ReactiveFormsModule, FormsModule, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router, createUrlTreeFromSnapshot } from '@angular/router';
import { Fatura } from 'src/app/Fatura';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Rateio } from 'src/app/Rateio';
import { Input, Output } from '@angular/core';
import { ResourceLoader } from '@angular/compiler';
import { SetFatura } from 'src/app/SetFatura';
import { Response } from 'src/app/Response';
import { MessagesService } from 'src/app/messages.service';
import { Observable } from 'rxjs';
import { query } from '@angular/animations';

@Component({
  selector: 'app-hcm',
  templateUrl: './hcm.component.html',
  styleUrls: ['./hcm.component.css']
})
export class HcmComponent {
  rateios: Rateio[] = [];
  valRat: any;
  totalFat: any;
  faturaForm!: FormGroup;
  statusFat: any;
  showLoading: boolean = false;
  msgRet?: string = "";
  numFatura: string = "";
  initialValue = 0;
  public boxmessageColor: string = '';
  public srcImageLog: string = '';

  constructor(
    private faturas: FaturasService,
    private route: ActivatedRoute,
    private router: Router,
    private messagesService: MessagesService
    ) {
  }
  ngOnInit() {

    this.faturaForm = new FormGroup({
       numfat: new FormControl()
    })

    this.numFatura = this.route.snapshot.params['fat'];
    this.showLoading = true;
    const paramGetRateio = {
      numFat: this.numFatura,
      type: "planosaude"
    }
    this.faturas.getRateio(paramGetRateio).subscribe((items) => {
      const rat = items.data;

      if (items.data) {

        this.showLoading = false;

        this.statusFat = rat.filter((sta => sta.status == "A"));

        rat.filter((sta) => {
           if (sta.status == "A") {
              this.boxmessageColor = 'green';
              this.srcImageLog = '/assets/check.png';
              this.messagesService.callMsg('Rateio já foi atualizado!', this.boxmessageColor, this.srcImageLog);
           }
        });
      }
      //this.totalFat = converteVlr.reduce((accumulate, current) => accumulate = accumulate + current)
      //console.log(this.totalFat)
      this.rateios = rat;

      if (items.message) {
          this.msgRet = items.message;
          this.boxmessageColor = 'green';
          this.srcImageLog = '/assets/check.png';
          this.messagesService.callMsg(this.msgRet, this.boxmessageColor , this.srcImageLog);
          this.router.navigate(['/'])
      }
    })
  }

  /*
  get numFat() {
    return this.faturaForm.get('numfat')!;
  }
  */
 /*
  async onSubmit() {
    this.showLoading = true;
    await this.faturas.getRateio(this.faturaForm.value).subscribe((items) => {
       const rat = items.data;

      if (rat) {
        this.showLoading = false;
        this.statusFat = rat.filter((sta => sta.status == "A"));
        rat.filter((statusFat) => {
           if (statusFat.status == "A") {
              this.messagesService.callMsg('Rateio já foi atualizado!');
           }
         });
        this.rateios = items.data;
      }
      if (items.message) {
          this.msgRet = items.message;
          this.messagesService.callMsg(this.msgRet);
          this.router.navigate(['/'])
      }
    })
  }
  */
  async validarRateio() {
    this.numFatura = this.route.snapshot.params['fat'];
    const type = "planosaude";
    this.showLoading = true;
    const objBodyRateio = {
      numFat: this.numFatura,
      rateio: this.rateios,
      origem: type
    }
    //console.log(`Objeto Validação: ${JSON.stringify(objBodyRateio)}`)
    //console.log(this.faturaForm.value)
    //await this.faturas.setRateio({numFat: this.faturaForm.value, rateio:[{codccu: '2105', desccu: 'teste', perrat: 100, vlrrat: 545}], origem: 'HCM'}).subscribe({

    await this.faturas.setRateio(objBodyRateio).subscribe({
      next: (items) => {
        //console.log(`Retorno Validação: ${items}`)
        this.showLoading = false;
        this.boxmessageColor = 'green';
        this.srcImageLog = '/assets/check.png';
        this.messagesService.callMsg('Rateio Atualizado Com Sucesso!', this.boxmessageColor, this.srcImageLog);
        this.router.navigate(['/hcm/faturas'])
      }
    });
  }
}
