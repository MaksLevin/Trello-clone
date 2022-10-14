import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '@src/app/core/models/user.model';
import { AuthService } from '@app/core/services';
import {
  imgUrl,
  validationPatterns,
  emailValidationErrors,
  usernameValidationErrors,
  passwordValidationErrors,
} from '@src/app/core/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  isLogin: boolean = true;

  loginForm!: FormGroup;

  emailErrors: { isValid: string; isRequired: string } = emailValidationErrors;
  usernameErrors: {
    isValid: string;
    isRequired: string;
    isMaxLength: string;
    isMinLength: string;
  } = usernameValidationErrors;
  passwordErrors: { isValid: string; isRequired: string; isMinLength: string } =
    passwordValidationErrors;

  constructor(private auth: AuthService, private router: Router) {}

  isValid(field: string): boolean | undefined {
    return (
      this.loginForm.get(field)?.hasError('pattern') &&
      !this.loginForm.get(field)?.hasError('required')
    );
  }

  isRequired(field: string): boolean | undefined {
    return this.loginForm.get(field)?.hasError('required');
  }

  isMinLength(field: string): boolean | undefined {
    return this.loginForm.get(field)?.hasError('minlength');
  }

  isMaxLength(field: string): boolean | undefined {
    return this.loginForm.get(field)?.hasError('maxlength');
  }

  changeViewPassword(): void {
    this.hide = !this.hide;
  }

  changeToRegistration(): void {
    this.isLogin = false;

    this.loginForm.get('email')?.setValue('');
    this.loginForm.get('password')?.setValue('');

    this.loginForm.addControl(
      'username',
      new FormControl('', {
        validators: [
          Validators.maxLength(12),
          Validators.minLength(5),
          Validators.pattern(validationPatterns.usernamePattern),
          Validators.required,
        ],
      })
    );
  }

  changeToLogin(): void {
    this.isLogin = true;

    this.loginForm.get('email')?.setValue('');
    this.loginForm.get('password')?.setValue('');
    this.loginForm.removeControl('username');
  }

  async registration(): Promise<void> {
    const user: User = {
      id: '',
      username: this.loginForm.get('username')?.value,
      email: this.loginForm.get('email')?.value,
      profilePhoto: imgUrl,
      createdOn: new Date(),
    };

    await this.auth.signUp(user, this.loginForm.get('password')?.value);

    this.router.navigate(['/dashboard']);
  }

  async login(): Promise<void> {
    await this.auth.signIn(
      this.loginForm.get('email')?.value,
      this.loginForm.get('password')?.value
    );
    this.router.navigate(['/dashboard']);
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(validationPatterns.emailPattern),
      ]),
      password: new FormControl('', [
        Validators.minLength(5),
        Validators.required,
        Validators.pattern(validationPatterns.passwordPattern),
      ]),
    });
  }
}
