import { Component, OnInit } from '@angular/core';
import { Auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail } from '@angular/fire/auth';
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
      passwordConfirm: ['', []],
    });
  }

  ngOnInit(): void {
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
      if (this.isLogin) {
        await signInWithEmailAndPassword(this.auth, email, password);
      } else if(this.isSignup) {
        await createUserWithEmailAndPassword(this.auth, email, password);
      } else if(this.isPasswordReset) {
        await sendPasswordResetEmail(this.auth, email);
        this.serverMessage = 'Check your email for reset link';
      }
    } catch (err) {
      this.serverMessage = err as string;
    }

    this.loading = false;
  }
}
