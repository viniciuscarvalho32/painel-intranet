import { CcuDetails } from './../../CcuDetails';
import { Component, Inject, Input, Output } from '@angular/core';
import { CcudetailsService } from 'src/app/ccudetails.service';
import { MatTableModule } from '@angular/material/table';
import { PeriodicElement } from 'src/app/PeriodicElement';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';


@Component({
  selector: 'app-rateio-cc',
  templateUrl: './rateio-cc.component.html',
  styleUrls: ['./rateio-cc.component.css']
})
export class RateioCcComponent {
  displayedColumns = ['numcad', 'nomfun', 'perrat', 'vlrrat'];
  dataSource;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.dataSource = data;
  }
}


