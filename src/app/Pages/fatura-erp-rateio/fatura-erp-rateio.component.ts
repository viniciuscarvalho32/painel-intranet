import { CcudetailsService } from './../../ccudetails.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CcuDetails } from 'src/app/CcuDetails';
import { Rateio } from 'src/app/Rateio';
import { FaturasService } from 'src/app/faturas.service';
import { MessagesService } from 'src/app/messages.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RateioCcComponent } from '../rateio-cc/rateio-cc.component';
import { RelatorioRateioComponent } from '../relatorio-rateio/relatorio-rateio.component';
import { DetailEmail } from 'src/app/DetailEmail';

@Component({
  selector: 'app-fatura-erp-rateio',
  templateUrl: './fatura-erp-rateio.component.html',
  styleUrls: ['./fatura-erp-rateio.component.css']
})
export class FaturaErpRateioComponent {
  [x: string]: any;

  @Output() onClick = new EventEmitter<CcuDetails[]>();

  rateios: Rateio[] = [];
  valRat: any;
  totalFat: any;
  faturaForm!: FormGroup;
  formEmail!: FormGroup;

  statusFat: any;
  showLoading: boolean = false;
  msgRet?: string = "";
  numFatura: string = "";
  initialValue = 0;
  ratColabDetail: [] = [];
  public ccuDetails: CcuDetails[] = [];
  public boxmessageColor: string = '';
  public srcImageLog: string = '';
  public ccDetailShow: boolean = false;

  constructor(
    private faturas: FaturasService,
    private route: ActivatedRoute,
    private router: Router,
    private messagesService: MessagesService,
    private ccuDetailsServices: CcudetailsService,
    private dialogRef: MatDialog
    ){}
  ngOnInit() {
    this.faturaForm = new FormGroup({
       numfat: new FormControl()
    })

    this.formEmail = new FormGroup({
      // fatura: new FormControl(),
      email: new FormControl()
    })

    this.numFatura = this.route.snapshot.params['fat'];
    this.showLoading = true;
    const paramGetRateio = {
      numFat: this.numFatura,
      type: "combustivel"
    }
    this.faturas.getRateio(paramGetRateio).subscribe((items) => {
      const rat = items.data;

      if (items.data) {

        this.showLoading = false;

        this.statusFat = rat.filter((sta => sta.status == "A"));

        rat.filter((sta) => {
           if (sta.status == "A") {
              this.boxmessageColor = 'green';
              this.srcImageLog = "/assets/check.png";
              this.messagesService.callMsg('Rateio já foi atualizado!', this.boxmessageColor, this.srcImageLog);
              setTimeout(() => {
                this.messagesService.close();
              }, 2000)
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
          this.messagesService.callMsg(this.msgRet, this.boxmessageColor, this.srcImageLog);
          setTimeout(() => {
            this.messagesService.close();
          }, 2000)
          this.router.navigate(['/'])
      }
    })
  }


  // get fatura() {
  //   return this.formEmail.get('fatura')!;
  // }
  get email() {
    return this.formEmail.get('email')!;
  }


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
    const type = "combustivel";
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
        setTimeout(() => {
          this.messagesService.close();
        }, 2000)
        this.router.navigate(['/erp/faturas-erp'])
      }
    });
  }
  async submit() {
    this.numFatura = this.route.snapshot.params['fat'];
    this.showLoading = true;
    let paramGetEmail = this.formEmail.value.email;

    const paramGetFatura: DetailEmail = {
      numFat: this.numFatura,
      email: paramGetEmail
    }

    await this.ccuDetailsServices.getRateioColaborador(paramGetFatura).subscribe({
      next: (ratDetail) => {
        if (ratDetail.message) {
            this.showLoading = false;
            this.boxmessageColor = 'green';
            this.srcImageLog = '/assets/check.png';
            this.messagesService.callMsg(ratDetail.message, this.boxmessageColor, this.srcImageLog);
            setTimeout(() => {
              this.messagesService.close();
            }, 2000)
        }
      }
    })


  }

  // async showRateioDetails(fatura: string, codCcu: string) {

  //   await this.ccuDetailsServices.showDetails(fatura, codCcu).subscribe((det) => {
  //       this.ccuDetails = det.data;
  //       //console.log(this.ccuDetails)

  //       this.dialogRef.open(RateioCcComponent, {
  //         //data : [{numcad: 103623, nomfun: 'Vinicius', perrat: 100, vlrrat: 234.90}]
  //         data : this.ccuDetails
  //       })
  //   })
  // }
  // async gerRelatorio(nFatura: string) {
  //   // await this.ccuDetailsServices.showDetails(nFatura,'').subscribe((detFatura: { data: any; }) => {
  //   //   this.ccuDetails = detFatura.data;
  //     await this.dialogRef.open(RelatorioRateioComponent, {
  //       data : [{numcad: 103623, nomfun: 'Vinicius', perrat: 100, vlrrat: 234.90}]
  //       //data : this.ccuDetails
  //     })
  //   //})
  // }

}
