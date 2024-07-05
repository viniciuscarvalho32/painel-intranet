import { CadUser } from './../cadastros/user/CadUser';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent {
  [x: string]: any;
  public tokenUser: any;
  public userData:CadUser[] = [];
  constructor(
    private auth: AuthService,
    private route: Router
  ) {

  }

  acessarRota() {
    this.tokenUser = sessionStorage.getItem('token')
    if (!this.tokenUser) {
        this.route.navigate(['/login']);
    }
    //console.log(`Token do acessarRota ${token}`)
    this.auth.acessarRotaProtegida(this.tokenUser).subscribe((user) => {
      this.userData.push(user.user)
    })
  }

}
