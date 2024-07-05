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
  // public showProgBar: boolean = true;
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
    setTimeout(() => {
      this.showLoading = false;
      this.router.navigate(['/home'])
    }, 3000)


    // await this.authService.authUser(this.formAuthUser.value).subscribe({
    //   next: (retLogin) => {
    //     this.showLoading = false;
    //     if (retLogin) {
    //       const token = retLogin.token
    //       sessionStorage.setItem('token', token)
    //       sessionStorage.setItem('uuID', retLogin.uuID)
    //       this.router.navigate(['/home'])
    //     } else {
    //       this.showLoading = false;
    //       this.message.callMsg(retLogin.error.msg,'red','assets/erro.png')
    //     }
    //   }
    // })
  }
  signup() {

    this.router.navigate(['sign-up'])
  }
}
