import { MessagesComponent } from './../../messages/messages.component';
import { Component } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { Fatura } from 'src/app/Fatura';
import { FaturasService } from 'src/app/faturas.service';
import { ArquivoFatura } from 'src/app/ArquivoFatura';
import { MessagesService } from 'src/app/messages.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, createUrlTreeFromSnapshot } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-faturas-erp',
  templateUrl: './faturas-erp.component.html',
  styleUrls: ['./faturas-erp.component.css']
})
export class FaturasErpComponent {

  // displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  // selection = new SelectionModel<PeriodicElement>(true, []);

  // /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  // /** Selects all rows if they are not all selected; otherwise clear selection. */
  // toggleAllRows() {
  //   if (this.isAllSelected()) {
  //     this.selection.clear();
  //     return;
  //   }

  //   this.selection.select(...this.dataSource.data);
  // }

  // /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: PeriodicElement): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  // }










  faturas: any[] = [];
  showLoading: boolean = false;
  public boxmessageColor: string = '';
  public srcImgLog: string = '';
  constructor(private faturaService: FaturasService,
              private messages: MessagesService,
              private router: Router) {
  }

  ngOnInit() {
    this.showLoading = true;
    const type: string = "combustivel";
    this.faturaService.getFaturas(type).subscribe({
      next: (items) => {
        this.faturas = items.data
        this.showLoading = false;
        //this.messages.callMsg("Sistema temporariamente fora, aguarde ou entre em contato com o Administrador!", 'green');
      }
    })
  }
  async createHandler(fatCombustivel: ArquivoFatura) {
    const formData = new FormData();
    this.showLoading = true;
    formData.append("txtFile", fatCombustivel.txtFile)
    formData.append("type", "combustivel")
    //console.log(formData)

    await this.faturaService.readFile(formData).subscribe({
      next: (items) => {
        if (!items.message) {
            this.showLoading = false;
            this.faturas = items.data;
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
}
