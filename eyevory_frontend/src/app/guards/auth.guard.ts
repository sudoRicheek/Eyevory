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