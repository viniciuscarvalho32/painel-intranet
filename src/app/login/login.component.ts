import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from './User';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  [x: string]: any;

  invalidLogin = false;
  public usuario: User = new User();
  public showLoading: boolean = false;
  /*
  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  toggleSidenav() {
    this.sidenav.toggle();
  }
  */
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  fazerLogin() {
    this.authService.fazerLogin(this.usuario);
  }

  cadastrarUser() {
    this.router.navigate(['home'])
  }
}
