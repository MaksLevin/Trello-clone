import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { IUser } from '@app/core/models/user';
import { AuthService } from '@app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide: boolean = true;
  signIn: boolean = true;
  signUp: boolean = false;

  loginForm: FormGroup;

  changeToRegistration(): void {
    this.signUp = true;
    this.signIn = false;
  }

  changeToLogin(): void {
    this.signUp = false;
    this.signIn = true;
  }

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.loginForm = this.fb.group({
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  registration(): void {
    const user: IUser = {
      id: '',
      username: this.loginForm.get('username')!.value,
      email: this.loginForm.get('email')!.value,
      profilePhoto: '',
      createdOn: new Date(),
    };

    this.auth.signUp(user, this.loginForm.get('password')!.value);
  }

  login(): void {
    this.auth.signIn(
      this.loginForm.get('email')!.value,
      this.loginForm.get('password')!.value
    );
  }
}
