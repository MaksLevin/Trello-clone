import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IUser } from '@app/core/models/user';
import { AuthService } from '@app/core/services/auth.service';
import { imgUrl } from '@app/core/const/user';

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
    this.loginForm.addControl(
      'username',
      new FormControl('', {
        validators: [
          Validators.maxLength(12),
          Validators.minLength(5),
          Validators.pattern('^[a-z0-9_-]+$'),
          Validators.required,
        ],
      })
    );
  }

  changeToLogin(): void {
    this.isLogin = true;
    this.loginForm.removeControl('username');
  }

  async registration(): Promise<void> {
    const user: IUser = {
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
    this.loginForm = new FormGroup(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ]),
        password: new FormControl('', [
          Validators.minLength(5),
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        ]),
      },
      { updateOn: 'blur' }
    );
  }
}
