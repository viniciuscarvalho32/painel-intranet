import { CteService } from './../../cte.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Cte } from 'src/app/Cte';
import { MessagesService } from 'src/app/messages.service';

@Component({
  selector: 'app-cte',
  templateUrl: './cte.component.html',
  styleUrls: ['./cte.component.css']
})
export class CteComponent {
  cteNfe: Cte[] = [];
  showLoading: boolean = false;
  boxmessageColor = '';
  srcImgLog = '/assets/check.png';
  selectedFile: File | undefined;
  router: any;

  constructor(private cte: CteService, private messages: MessagesService) {

  }

  formCte = new FormGroup({
    chvCte: new FormControl(''),
  });

  get chvCte() {
    return this.formCte.get("chvCte")!;
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
            this.messages.callMsg("Fatura gravada com sucesso!", this.boxmessageColor, this.srcImgLog);
            this.router.navigate(['/erp/faturas-erp'])
        } else {
            //console.log(items.message)
            this.showLoading = false;
            this.boxmessageColor = 'red';
            this.srcImgLog = '/assets/erro.png';
            this.messages.callMsg(items.message, this.boxmessageColor, this.srcImgLog);
            this.router.navigate(['/erp/faturas-erp'])
        }

      }
    })
  }
  onSubmit() {

  }
}
