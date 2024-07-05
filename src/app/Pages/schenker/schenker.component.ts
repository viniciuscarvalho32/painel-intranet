import { Observable } from 'rxjs';
import { CallSchenkerService } from 'src/app/call-schenker.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-schenker',
  templateUrl: './schenker.component.html',
  styleUrls: ['./schenker.component.css'],
})
export class SchenkerComponent {
  compHtml = '';
  compHtmlMovidesk = '';
  token: string = "";
  constructor(private schenker: CallSchenkerService) {

  }
  onInit() {}

  async callApiSchenker() {

    await this.schenker.callAppServ().subscribe({
      next: (dataApi) => {
        this.token = JSON.stringify(dataApi.accessToken);
        return this.compHtml = this.token;
      }
    })

  }
  async callApiMovidesk() {




  }
}
