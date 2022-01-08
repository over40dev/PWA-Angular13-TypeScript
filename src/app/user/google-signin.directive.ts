import { Directive, HostListener } from '@angular/core';
// AngularFire and Firebase compatibility with pre-Firebase v9
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from "@firebase/app-compat";

@Directive({
  selector: '[appGoogleSignin]'
})
export class GoogleSigninDirective {

  // user 'private' because not needed outside this class (i.e. not needed in html separate from this Directive)
  constructor(private readonly afAuth: AngularFireAuth) { }

  // Listen to events on the DOM Element this Directive is attached to
  // See MDN for list of DOM|Web events (https://developer.mozilla.org/en-US/docs/Web/Events)
  @HostListener('click')
    onclick() {
      this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

}
