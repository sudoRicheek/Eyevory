import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  status!: boolean;
  status2!: boolean;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    console.log('Guard constructed');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('Guard checking');
    this.auth.isLoggedIn.subscribe(status => {
      this.status = status;
    });
    console.log(state.url)
    if(route.data['accessRoles']){
      this.auth.isAdmin.subscribe(status => {
        this.status2 = status;
      });
      console.log(this.status, this.status2)
      if(this.status && this.status2) return true;
      this.router.navigate(['/home'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
    if (this.status) {
      return true;
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          return: state.url
        }
      }); // Need to use navigate over navigateByUrl, don't replace
      return false;
    }
  }
  
}