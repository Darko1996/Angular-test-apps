import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

    if(this.authService.isAuthenticated()){
      return this.authService.isAuthenticated();
    }
    else {
      alert("You have to login to see this page.")
      return this.authService.isAuthenticated();
    }

  }
}
