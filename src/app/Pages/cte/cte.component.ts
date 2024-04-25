import { CteService } from './../../cte.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Cte } from 'src/app/Cte';
import { MessagesService } from 'src/app/messages.service';
import {MatSelectModule} from '@angular/material/select';

interface TipSer {
    id: number;
    viewValue: string;
}

@Component({
  selector: 'app-cte',
  templateUrl: './cte.component.html',
  styleUrls: ['./cte.component.css']
})
export class CteComponent {

  selectedValue: string = "";

  public cteNfe:Cte[] = [];
  showLoading: boolean = false;
  boxmessageColor = '';
  srcImgLog = '/assets/check.png';
  selectedFile: File | undefined;
  router: any;
  parentSelector: boolean = false;
  public listChvNelCtrc: any[] = []
  public listDocSelected: string[] = [];
  public formDocAnt: boolean = false;

  types: TipSer[] = [
    {id: 0, viewValue: 'Normal'},
    {id: 1, viewValue: 'Subcontratação'},
    {id: 2, viewValue: 'Redespacho'},
    {id: 3, viewValue: 'Redespacho Intermediário'},
    {id: 4, viewValue: 'Serviço Vinculado a Multimodal'}
  ]

  constructor(private cte: CteService, private messages: MessagesService) {

  }

  onInit() {

  }

 async reloadXml() {
    this.showLoading = true;
    await this.cte.loadXml().subscribe({
      next: (items) => {

        if (!items.message) {
            this.showLoading = false;
            this.cteNfe = items.data;
            this.boxmessageColor = 'green';
            this.srcImgLog = '/assets/check.png';
            setTimeout(() => {
              this.messages.close();
            }, 3000)
            //this.messages.callMsg(items.message!, this.boxmessageColor)
            //this.messages.callMsg("Chave relacionada com sucesso!", this.boxmessageColor, this.srcImgLog);
            //this.router.navigate(['/erp/faturas-erp'])
        } else {
            this.showLoading = false;
            this.boxmessageColor = 'green';
            this.srcImgLog = '/assets/check.png';
            this.messages.callMsg(items.message!, this.boxmessageColor, this.srcImgLog)
            setTimeout(() => {
              this.messages.close();
            }, 3000)
            //this.messages.callMsg("Chave relacionada com sucesso!", this.boxmessageColor, this.srcImgLog);
            //this.router.navigate(['/erp/faturas-erp'])
        }
      }
    })
  }


  formCtrc = new FormGroup({
    tipSer: new FormControl('')
  })
  get tipSer() {
    return this.formCtrc.get('tipSer')!;
  }

  async createHandler(notas: any) {
    const formData = new FormData();
    this.showLoading = true;
    formData.append("txtFile", notas.txtFile)
    formData.append("type", "combustivel")

    await this.cte.readFile(formData).subscribe({
      next: (items) => {

        if (!items.message) {
            this.showLoading = false;
            this.cteNfe = items.data;
            this.boxmessageColor = 'green';
            this.srcImgLog = '/assets/check.png';
            setTimeout(() => {
              this.messages.close();
            }, 3000)
            //this.messages.callMsg(items.message!, this.boxmessageColor)
            //this.messages.callMsg("Chave relacionada com sucesso!", this.boxmessageColor, this.srcImgLog);
            //this.router.navigate(['/erp/faturas-erp'])

        } else {
            //console.log(items.message)
            this.showLoading = false;
            this.boxmessageColor = 'red';
            this.srcImgLog = '/assets/erros.png';
            this.messages.callMsg(items.message, this.boxmessageColor, this.srcImgLog);
            setTimeout(() => {
              this.messages.close();
            }, 3000)
            //this.router.navigate(['/erp/faturas-erp'])
        }
        formData.delete;
      }
    })
  }

  addFormDocAnt() {
    this.formDocAnt = true;
  }

  onChange($event:any) {
    const isChecked = $event.target.checked;
    const chaveNf = $event.target.value;

    //console.log(`OnChange:  &{this.tipSer}`)

    this.cteNfe = this.cteNfe.map((chave)=> {
      if (chave.chvnel == chaveNf) {
        chave.isselected = isChecked;
        this.parentSelector = false;
        return chave;
      }
      if (chaveNf == -1) {
        chave.isselected = this.parentSelector;
        return chave;
      }
      return chave;
    });
  }

  onChg($event:any) {
    const docValue = $event.target.value;
    return this.listDocSelected.push(docValue)
  }
  public chvSelected = 0;
  async onSubmit($event:any) {
    this.cteNfe.map((chvsel) => {
      if (chvsel.isselected == false) {
        this.chvSelected += 1;
        //console.log(`Map: ${this.chvSelected}`)
      }
    })
    if (this.chvSelected == this.cteNfe.length) {
      // console.log(`Comparando: ${this.chvSelected}`)
      // console.log(`Comparando Length: ${this.cteNfe.length}`)
      this.showLoading = false;
      this.boxmessageColor = 'red';
      this.srcImgLog = '/assets/erros.png';
      this.messages.callMsg("Nenhuma Chave foi selecionada!", this.boxmessageColor, this.srcImgLog);
      /*
      setTimeout(() => {
        this.messages.close();
      }, 2000)
      this.chvSelected = 0;
      */
    } else {
      const tipSer = $event.target.tipser;
      const valueTipSer = tipSer.value;

      if ((valueTipSer == "1") && (this.listDocSelected.length == 0)) {
        //console.log(valueTipSer)
        this.showLoading = false;
        this.boxmessageColor = 'red';
        this.srcImgLog = '/assets/erros.png';
        this.messages.callMsg("Documento Anterior não foi selecionado!", this.boxmessageColor, this.srcImgLog);
        /*
        setTimeout(() => {
          this.messages.close();
        }, 2000)
        */
      } else {
        this.showLoading = true;
        this.cteNfe.filter((selected) => selected.isselected == true).map((newArray) => {
          return this.listChvNelCtrc.push(newArray)
        })
        this.listChvNelCtrc.push(valueTipSer);
        this.listChvNelCtrc.push(this.listDocSelected);

        const newListObs = [...this.listChvNelCtrc];
        await this.cte.setCtrc(newListObs).subscribe({
         next: (items) => {
            if (!items.message) {
              this.showLoading = false;
              const nCtrc = items.data.map((ctrc) => ctrc.numnfv).toString();
              const msgCtrc = `Conhecimento de Transporte: ${nCtrc}, gerado com sucesso!`;
              this.boxmessageColor = 'green';
              this.srcImgLog = '/assets/check.png';
              this.messages.callMsg(msgCtrc, this.boxmessageColor, this.srcImgLog);

              setTimeout(() => {
                this.messages.close();
              }, 2000)

              this.listChvNelCtrc.length = 0;
              this.cteNfe.length = 0;
            } else {
              this.showLoading = false;
              this.boxmessageColor = 'red';
              this.srcImgLog = '/assets/erros.png';
              this.messages.callMsg(items.message!, this.boxmessageColor, this.srcImgLog);

              setTimeout(() => {
                this.messages.close();
              }, 2000)

              this.listChvNelCtrc.length = 0;
              this.cteNfe.length = 0;
            }
          }
        })
      }
    }
  }



  deleteXml(chave: string) {
    //console.log(chave)
    this.cte.delCtrc(chave).subscribe();
    this.cteNfe = this.cteNfe.filter((item) => item.chvnel !== chave)

    // this.boxmessageColor = 'red';
    // this.srcImgLog = '/assets/erro.png';
    // this.messages.callMsg("Deseja Excluir a Chave?", this.boxmessageColor, this.srcImgLog);
  }


}
