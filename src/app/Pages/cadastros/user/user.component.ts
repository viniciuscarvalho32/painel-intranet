import { Component } from '@angular/core';
import { CadUser } from './CadUser';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { MessagesService } from 'src/app/messages.service';
import { Router } from '@angular/router';
import { User } from 'src/app/login/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  dadosUsurio: CadUser = new CadUser();
  signup: FormGroup;

  constructor(
    private auth: AuthService,
    private message: MessagesService,
    private router: Router
    ) {

    this.signup = new FormGroup({
      name: new FormControl,
      email: new FormControl,
      password: new FormControl,
      checkpassword: new FormControl
    })
  }

  get name() {
    return this.signup.get("name")!
  }
  get email() {
    return this.signup.get("email")!
  }
  get password() {
    return this.signup.get("password")!
  }
  get checkpassword() {
    return this.signup.get("checkpassword")!
  }


  async onSubmit() {
    //console.log(this.signup)
    await this.auth.signUpUser(this.signup.value).subscribe({
      next: (auth) => {
      //const authUser = JSON.stringify(auth)
      //console.log(authUser)
        if (auth.msg) {
          this.message.callMsg(auth.msg,'green','assets/check.png');
          this.router.navigate(['/login']);
        }
      }
    })
  }
}
