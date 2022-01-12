import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

type FormType = 'login' | 'signup' | 'reset';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss']
})
export class EmailLoginComponent implements OnInit {

  form: FormGroup;

  type: FormType = 'login';
  loading = false;

  serverMessage: string = '';

  constructor(private auth: Auth, private fb: FormBuilder) {
    this.form = this.fb.group({
      // [default value, array of Validators]
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfim: ['', []],
    });
  }

  ngOnInit(): void {
    console.log('type: ', this.type);
  }

  // Form Type
  changeType(val: FormType) {
    this.type = val;
  }

  get isLogin() {
    return this.type === 'login';
  }

  get isSignup() {
    return this.type === 'signup';
  }

  get isPasswordReset() {
    return this.type === 'reset';
  }

  // Form Field Getters
  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  // Form Validators
  get passwordDoesMatch() {
    if (this.type !== 'signup') {
      return true;
    } else {

      return this.password?.value === this.passwordConfirm?.value;
    }
  }


  // Form Submit
  async onSubmit() {
    this.loading = true;

    const email = this.email?.value;
    const password = this.password?.value;

    try {


    } catch (err) {

    }


    this.loading = false;
  }



}
