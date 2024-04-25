import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  submenu: boolean = false;
  navbarfixed: boolean = false;
  public emailSess: any;
  public id: string = '';

  constructor(
    private router: Router,
    private auth: AuthService) {

  }
  ngOnInit() {
    this.emailSess = sessionStorage.getItem("email");
    //this.id = sessionStorage.getItem("id");
  }

  shouldShowNav(): boolean {
    // Verifica se a rota atual não é a rota de login
    return this.router.url !== '/login';
  }

  @HostListener('window:scroll',['$event']) onscroll() {
    if(window.scrollY > 100) {
      this.navbarfixed = true;
    } else {
      this.navbarfixed = false;
    }
  }
  showsubmenu() {
    this.submenu = true;
  }

  closemenu() {
    this.submenu = false;
  }

  fazerLogOff() {
    this.auth.fazerLogOff()
  }

}
