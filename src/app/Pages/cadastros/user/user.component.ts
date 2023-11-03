import { Component } from '@angular/core';
import { CadUser } from './CadUser';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  dadosUsurio: CadUser = new CadUser();

  constructor() {}

  onSubmit() {

  }

}
