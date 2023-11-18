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
  // formCte = new FormGroup({
  //   chvCte: new FormControl(''),
  // });

  // get chvCte() {
  //   return this.formCte.get("chvCte")!;
  // }
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
    //console.log(formData)

    await this.cte.readFile(formData).subscribe({
      next: (items) => {

        if (!items.message) {
            this.showLoading = false;
            this.cteNfe = items.data;
            this.boxmessageColor = 'green';
            this.srcImgLog = '/assets/check.png';
            //this.messages.callMsg(items.message!, this.boxmessageColor)
            //this.messages.callMsg("Chave relacionada com sucesso!", this.boxmessageColor, this.srcImgLog);
            //this.router.navigate(['/erp/faturas-erp'])
            formData.delete("txtFile")
        } else {
            //console.log(items.message)
            this.showLoading = false;
            this.boxmessageColor = 'red';
            this.srcImgLog = '/assets/erro.png';
            this.messages.callMsg(items.message, this.boxmessageColor, this.srcImgLog);
            //this.router.navigate(['/erp/faturas-erp'])
        }
      }
    })
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
  public chvSelected = 0;
  async onSubmit($event: any) {
    this.cteNfe.map((chvsel) => {
      if (chvsel.isselected == false) {
        this.chvSelected += 1;
        //console.log(`Map: ${this.chvSelected}`)
      }
    })
    if (this.chvSelected == this.cteNfe.length) {
      //console.log(`Comparando: ${this.chvSelected}`)
      //console.log(`Comparando Length: ${this.cteNfe.length}`)
      this.showLoading = false;
      this.boxmessageColor = 'red';
      this.srcImgLog = '/assets/erro.png';
      this.messages.callMsg("Nenhuma Chave foi selecionada!", this.boxmessageColor, this.srcImgLog);
      this.chvSelected = 0;
    } else {
      this.showLoading = true;
      const tipSer = $event.target.tipser;
      const valueTipSer = tipSer.value;
      
      this.cteNfe.filter((selected) => selected.isselected == true).map((newArray) => {
        return this.listChvNelCtrc.push(newArray)
      })
      this.listChvNelCtrc.push(valueTipSer);
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
              this.listChvNelCtrc.length = 0;
              this.cteNfe.length = 0;
            } else {
              this.showLoading = false;
              this.boxmessageColor = 'red';
              this.srcImgLog = '/assets/erro.png';
              this.messages.callMsg(items.message!, this.boxmessageColor, this.srcImgLog);
              this.listChvNelCtrc.length = 0;
              this.cteNfe.length = 0;
            }
          }
      })
    }
  }
}
