import { Component, OnInit } from '@angular/core';
// AngularFire and Firebase compatibility with pre-Firebase v9
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  // user 'public' because 'afAuth' needed outside this class (i.e. in associated html template)
  constructor(public readonly afAuth: AngularFireAuth) { }

}
