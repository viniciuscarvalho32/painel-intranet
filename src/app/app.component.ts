import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { FaturasService } from './faturas.service';
import { MessagesService } from './messages.service';
import { CcudetailsService } from './ccudetails.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { RateioCcComponent } from './Pages/rateio-cc/rateio-cc.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'intranet';
  mostrarMenu: boolean = false;

  constructor(
    public faturas: FaturasService,
    public messagesService: MessagesService,
    private AuthService: AuthService,
    public ccudetails: CcudetailsService
    ) {}

  ngOnInit() {
    this.AuthService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );
  }

}
