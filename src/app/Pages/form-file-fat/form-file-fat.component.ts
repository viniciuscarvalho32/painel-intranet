import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ArquivoFatura } from 'src/app/ArquivoFatura';
import { MessagesService } from 'src/app/messages.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RelatorioRateioComponent } from '../relatorio-rateio/relatorio-rateio.component';

@Component({
  selector: 'app-form-file-fat',
  templateUrl: './form-file-fat.component.html',
  styleUrls: ['./form-file-fat.component.css']
})
export class FormFileFatComponent {
  [x: string]: any;

    @Output() onSubmit = new EventEmitter<ArquivoFatura>();
    showLoading: boolean = false;
    formFile!: FormGroup;
    fileSelected: boolean = false;
    fileName: string = "";
    fileExt: string = "";
    ccuDetailsServices: any;
    ccuDetails: any;
    constructor(
      private message: MessagesService,
      private dialogRef: MatDialog) {}

    ngOnInit() {
      //this.showLoading = true;
      this.formFile = new FormGroup({
        txtFile: new FormControl()
      })
    }

    onFileSelected(event: any) {
      const file: File = event.target.files[0];
      this.formFile.patchValue({ txtFile: file })
      this.fileSelected = true;
      this.fileName = file.name;
      this.fileExt = file.type;
      //console.log(`OnFileSelected: ${this.formFile.patchValue}`)
    }

    submit() {
      if ((this.fileExt != "text/xml") && (this.fileExt != "text/csv")) {
          this.message.callMsg("Formato do Arquivo Inválido, importe apenas arquivos XML ou CSV","red","/assets/erro.png");
          return;
      }
      if (this.formFile.invalid) {
        return;
      }
      this.showLoading = true;
      this.onSubmit.emit(this.formFile.value)
      this.fileSelected = false;
      this.formFile.reset;
      //console.log(`submit: ${this.formFile.patchValue}`)
    }



}
