import { Observable, catchError, throwError } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CadUser } from './Pages/cadastros/user/CadUser';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessagesService } from './messages.service';
import { User } from './login/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private usuarioAutenticado: boolean = false;
  showLoading:boolean = true;
  constructor(
    private router: Router,
    private http: HttpClient,
    private message: MessagesService
    ) { }
  public urlAuthUser = "http://erp.macromaq.com.br:3000";

  mostrarMenuEmitter = new EventEmitter<boolean>();
  //Cadastrar Usuário
  signUpUser(usuario: CadUser): Observable<any> {
    console.log(usuario)
    return this.http.post(`${this.urlAuthUser}/api/auth`, {user: usuario}).pipe(
      catchError((err: HttpErrorResponse) => {
        let errorMsg = '';
        //console.log(errorMsg)
          errorMsg = err.error.msg
          this.message.callMsg(errorMsg,'red','assets/erros.png')
          // if (err.error instanceof ErrorEvent) {
          //   errorMsg = `${err.error}`
          //   this.message.callMsg(errorMsg,'red','assets/erros.png')
          // }

        return throwError(() => new Error(errorMsg));

      })
    );
    //this.mostrarMenuEmitter.emit(true);
    // console.log(usuario)
    this.router.navigate(['/login']);
  }
  // authUser(usuario: CadUser) {
  //   this.router.navigate(['/home']);
  // }

  //Autenticar Usuário
  authUser(usuario: User): Observable<any> {
    //console.log(usuario)
    return this.http.post(`${this.urlAuthUser}/auth/login`,usuario);
    // return this.http.post(`${this.urlAuthUser}/auth/login`, `${usuario}`).pipe(
    //   catchError((err: HttpErrorResponse) => {
    //     let errorMsg = '';
    //       errorMsg = err.error.msg
    //       this.message.callMsg(errorMsg,'red','assets/erros.png')
    //       // if (err.error.msg instanceof ErrorEvent) {
    //       //   errorMsg = `${err.error.msg}`
    //       //   this.message.callMsg(errorMsg,'red','assets/erros.png')
    //       // }

    //     return throwError(() => {
    //       new Error(errorMsg);
    //       this.showLoading = false;
    //       this.router.navigate(['/login']);
    //     })
    //   })
    // );
  }

  acessarRotaProtegida() {
    return this.http.get(`${this.urlAuthUser}/api/6626842bb7af7bbda9e12a8e`)

  }

  fazerLogOff() {
    this.mostrarMenuEmitter.emit(false);
    this.router.navigate(['']);
  }
}
