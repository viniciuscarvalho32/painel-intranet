import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './login/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioAutenticado: boolean = false;
  showLoading:boolean = true;
  constructor(private router: Router) { }

  mostrarMenuEmitter = new EventEmitter<boolean>();

  fazerLogin(usuario: User) {
    this.mostrarMenuEmitter.emit(true);
    this.router.navigate(['/home']);
  }

  fazerLogOff() {
    this.mostrarMenuEmitter.emit(false);
    this.router.navigate(['']);

  }
}
