import { Component } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
// AngularFire and Firebase v9
import { Auth, authState, signOut, User } from "@angular/fire/auth";
// AngularFire and Firebase compatibility with pre-Firebase v9
// import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  public readonly user: Observable<User | null> = EMPTY;

  // user 'public' because 'afAuth' needed outside this class (i.e. in associated html template)
  constructor(public readonly auth: Auth) { 
    if (auth) {
      this.user = authState(this.auth);
    }
  }

  async logout() {
    return await signOut(this.auth);
  }

}
