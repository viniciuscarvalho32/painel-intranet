import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ArquivoFatura } from 'src/app/ArquivoFatura';

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
    ngOnInit() {
      //this.showLoading = false;
      this.formFile = new FormGroup({
        txtFile: new FormControl()
      })

    }
    onFileSelected(event: any) {
      const file: File = event.target.files[0];
      this.formFile.patchValue({ txtFile: file })
      this.fileSelected = true;
      this.fileName = file.name;
    }

    submit() {
      if (this.formFile.invalid) {
        return;
      }
      this.showLoading = true;
      this.onSubmit.emit(this.formFile.value)
      this.fileSelected = false;
    }
}
