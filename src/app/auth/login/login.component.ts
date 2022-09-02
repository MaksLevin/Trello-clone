import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

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
  registrationForm: FormGroup;

  changeToRegistration(): void {
    this.signUp = true;
    this.signIn = false;
  }

  changeToLogin(): void {
    this.signUp = false;
    this.signIn = true;
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      emailLogin: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ]),
      passwordLogin: new FormControl('', [
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
      ]),
    });

    this.registrationForm = this.fb.group({
      usernameRegistration: new FormControl('', [
        Validators.maxLength(12),
        Validators.minLength(5),
        Validators.pattern('^[a-z0-9_-]+$'),
        Validators.required,
      ]),
      emailRegistration: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ]),
      passwordRegistration: new FormControl('', [
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
      ]),
    });
  }

  async registration(): Promise<void> {
    const user: IUser = {
      id: '',
      username: this.registrationForm.get('usernameRegistration')!.value,
      email: this.registrationForm.get('emailRegistration')!.value,
      profilePhoto: '',
      createdOn: new Date(),
    };

    await this.auth.signUp(user, this.loginForm.get('password')!.value);
    this.router.navigate(['/board']);
  }

  async login(): Promise<void> {
    await this.auth.signIn(
      this.loginForm.get('email')!.value,
      this.loginForm.get('password')!.value
    );
    this.router.navigate(['/board']);
  }
}
