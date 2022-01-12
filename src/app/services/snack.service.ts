import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) { }

  authError() {
    this.snackBar.open('Please Login to Access', 'OK', {
      duration: 5000
    });

    return this.snackBar._openedSnackBarRef
      ?.onAction()
      .pipe(
        tap(_ => this.router.navigate(['/login']))
      )
      .subscribe();
  }



}
