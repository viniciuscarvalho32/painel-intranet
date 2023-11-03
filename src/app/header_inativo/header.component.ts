import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  submenu: boolean = false;
  navbarfixed: boolean = false;
  ngOnInit() {

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

}
