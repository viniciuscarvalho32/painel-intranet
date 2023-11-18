import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ArquivoFatura } from 'src/app/ArquivoFatura';
import { MessagesService } from 'src/app/messages.service';

@Component({
  selector: 'app-form-file-fat',
  templateUrl: './form-file-fat.component.html',
  styleUrls: ['./form-file-fat.component.css']
})
export class FormFileFatComponent {

    @Output() onSubmit = new EventEmitter<ArquivoFatura>();
    showLoading: boolean = false;
    formFile!: FormGroup;
    fileSelected: boolean = false;
    fileName: string = "";
    fileExt: string = "";
    constructor(private message: MessagesService) {}

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
    }

    submit() {
      if (this.fileExt != "text/xml") {
          this.message.callMsg("Formato do Arquivo Inválido, importe apenas arquivos XML","red","/assets/erro.png");
          return;
      }
      if (this.formFile.invalid) {
        return;
      }
      this.showLoading = true;
      this.onSubmit.emit(this.formFile.value)
      this.fileSelected = false;
    }
}
