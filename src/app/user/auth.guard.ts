import { ThrowStmt } from '@angular/compiler';
import { Injectable, OnDestroy } from '@angular/core';
import { Auth, authState, onAuthStateChanged, User } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';
import { SnackService } from '../services/snack.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnDestroy {

  constructor(
    private readonly auth: Auth,
    private readonly snackBar: SnackService) { }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

      let isLoggedIn = false;
      
      // wrap in Arrow Function to avoid 'uninitialized null' result (see note below)
      const user = () => this.auth.currentUser;
      
      isLoggedIn = !!user;
      
      !isLoggedIn && this.snackBar.authError('Please Login to Access');
      
      return isLoggedIn;
      
      /*
        You can get the currently signed-in user by using the 
        currentUser property. If a user isn't signed in, currentUser is null.
        CAUTION: currentUser might also be null because the auth object 
        has not finished initializing. 
  
        To Avoid this issue wrap in Arrow Function or use Observable.
        
        If you use an observer (not needed in this case) to keep track of 
        the user's sign-in status, you don't need handle invalid null.
        */
  }

}
