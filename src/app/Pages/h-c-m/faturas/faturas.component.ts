import { ComponentFixture } from '@angular/core/testing';
import { Component, Output, EventEmitter } from '@angular/core';
import { Faturas } from 'src/app/Faturas';
import { FaturasService } from 'src/app/faturas.service';
import { Fatura } from 'src/app/Fatura';
import { ArquivoFatura } from 'src/app/ArquivoFatura';
import { FatAuth } from 'src/app/FatAuth';

@Component({
  selector: 'app-faturas',
  templateUrl: './faturas.component.html',
  styleUrls: ['./faturas.component.css']
})
export class FaturasComponent {
  faturas: Faturas[] = [];
  showLoading: boolean = false;
  totalFat: string = "";
  @Output() trEmitir = new EventEmitter<string>();

  constructor(private fatSer: FaturasService) {}

  ngOnInit() {
    this.showLoading = true;
    let token = sessionStorage.getItem('token')!;
    let uuID = sessionStorage.getItem('uuID')!;
    const type: string = "planosaude";
    const dataFatAba: FatAuth = {
      type,
      token,
      uuID
    }
    this.fatSer.getFaturas(dataFatAba).subscribe({
      next: (items) => {
         this.showLoading = false;
         this.faturas = items.data;
      }
    })
  }

  createHandler(faturaPlanoSaude: ArquivoFatura) {
    console.log("Carregar TXT Plano de Saude: " + faturaPlanoSaude.txtFile)
    //this.trEmitir.emit()
  }
}
