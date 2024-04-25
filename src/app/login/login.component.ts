import { MessagesService } from '../messages.service';
import { Component, Output, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from './User';
import { MatSidenav } from '@angular/material/sidenav';
import { FormControl, FormGroup } from '@angular/forms';

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
  formAuthUser: FormGroup;
  //formCreateUser: FormGroup;

  /*
  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  toggleSidenav() {
    this.sidenav.toggle();
  }
  */
  constructor(private router: Router,
              private authService: AuthService,
              public message: MessagesService) {

    this.formAuthUser = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
    // this.formCreateUser = new FormGroup({
    //   email: new FormControl(),
    //   password: new FormControl()
    // })

  }

  ngOnInit() {
  }

  get email() {
    return this.formAuthUser.get('email')!;
  }
  get password() {
    return this.formAuthUser.get('password')!;
  }

  async fazerLogin() {
    this.showLoading = true;
    this.router.navigate(['home'])

    // await this.authService.authUser(this.formAuthUser.value).subscribe((retornoLogin) => {
    //   this.showLoading = false;
    //   const token = retornoLogin.token
    //   console.log(token)
    //   localStorage.setItem('token', token)
    //       //const emailBD = retornoLogin.map((user: User) => user.email)
    //       /*
    //       console.log(`Usuando Banco depois do Map: ${emailBD}`)
    //       // console.log(`Usuando Front: ${this.formAuthUser.value.email}`)
    //       //if (emailBD) {
    //         if (emailBD == this.formAuthUser.value.email) {
    //           //this.userAuthenticatedSent = emailBD;
    //           sessionStorage.setItem("email", emailBD)
    //           this.showLoading = false;
    //           //this.message.callMsg('Usuário autenticado','green','assets/check.png')
    //           setTimeout(() => {
    //             this.message.close();
    //           }, 1000)
    //           this.router.navigate(['home'])
    //         } else {
    //           this.showLoading = false;
    //           this.message.callMsg('E-mail ou senha, inválidos','red','assets/erros.png')
    //           setTimeout(() => {
    //             this.message.close();
    //           }, 2000)
    //         }
    //         */
    //     //}
    //     this.router.navigate(['home'])
    // })
    //this.showLoading = false;
  }
  signup() {
    this.router.navigate(['sign-up'])
  }
}
