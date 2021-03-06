import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, EMPTY, throwError } from 'rxjs';
import { ServerService } from './server.service';
import { catchError, tap } from "rxjs/operators";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private Admin = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private server: ServerService,
    private snackBar: MatSnackBar
  ) {
    console.log('Auth Service');
    const access = localStorage.getItem('access');
    if (access) {
      console.log('Logged in from memory');
      this.loggedIn.next(true);
    }
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get isAdmin() {
    return this.Admin.asObservable();
  }

  login(user: { username: string, password: string }, ret: string) {
    if (user.username !== '' && user.password !== '') {
      return this.server.post('/api/token/', user, true).subscribe(
        response => {
          console.log(response);
          localStorage.setItem('access', response.access);
          localStorage.setItem('refresh', response.refresh);
          this.loggedIn.next(true);
          this.server.get('/api/user/profile/').subscribe(
            data => {
              this.Admin.next(data['isadmin']=="1" ? true : false);
              console.log(this.Admin)
            });
          this.router.navigateByUrl(ret);
          this.snackBar.open("Successfully Logged in", "Done", {
            duration: 5000,  // 5 sec timeout
          });
        },
        error => {
          let error_message = '';
          if (error.error.detail != null) {
            error_message += error.error.detail;
          }
          if (error_message == '') {
            error_message = 'Something went wrong!';
          }
          this.snackBar.open(error_message, "Try Again", {
            duration: 5000,  // 5 sec timeout
          });
        }
      );
    }
    else return EMPTY;
  }

  register(user: { username: string, password: string, password2: string, name: string, email: string, isadmin: number }) {
    if (user.username != '' && user.password != '' && user.password2 != '' && user.name != '' && user.email != '' && user.isadmin != null ) {
      return this.server.post('/api/user/register/', user, true).subscribe(
        response => {
          localStorage.setItem('access', response.access);
          localStorage.setItem('refresh', response.refresh);
          this.loggedIn.next(true);
          this.router.navigateByUrl('/home');
          this.snackBar.open("Successfully Registered", "Done", {
            duration: 5000,  // 5 sec timeout
          });
          this.Admin.next(user.isadmin==1 ? true : false);
        },
        error => {
          let error_message = '';
          if (error.error.password != null) {
            error_message += error.error.password;
          }
          if (error.error.username != null) {
            error_message += error.error.username;
          }
          if (error_message == '') {
            error_message = 'Something went wrong!';
          }
          this.snackBar.open(error_message, "Try Again", {
            duration: 5000,  // 5 sec timeout
          });
        }
      );
    }
    else return EMPTY;
  }

  logout() {
    this.loggedIn.next(false);
    this.Admin.next(false);
    localStorage.clear();
    this.router.navigateByUrl('/login');
    this.snackBar.open(' Successfully Logged out. Come back again!', "Done", {
      duration: 5000,  // 5 sec timeout
    });
  }

  refresh() {
    const refresh = localStorage.getItem('refresh');
    return this.server.post('/api/token/refresh/', {
      refresh: refresh
    }, true).pipe(
      tap(response => {
        localStorage.setItem('access', response.access);
      }),
      catchError(error => {
        let error_message = '';
        if (error.error.detail != null) {
          error_message += error.error.detail;
        }
        if (error_message == '') {
          error_message = 'Something went wrong!';
        }
        this.snackBar.open(error_message + ' Logging out.', "Try Again", {
          duration: 5000,  // 5 sec timeout
        });
        this.logout();
        return EMPTY;
      })
    )
  };
}