import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent {

  public token: string= '';
  constructor(
    private auth: AuthService
  ) {

  }

  acessarRota() {
    this.auth.acessarRotaProtegida().subscribe((item) => {

      console.log(localStorage.getItem('token'))
    })
  }

}
