import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/observable';
import { AngularFireAuth } from  "@angular/fire/auth";
import 'rxjs/add/operator/map'; // npm install rxjs-compat - da bi radilo
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {

    user: Observable<firebase.User>;

    constructor(private afAuth: AngularFireAuth, private router: Router){
        this.user = afAuth.authState;
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.user.map((afAuth)=>{
            if(!afAuth){
                this.router.navigateByUrl('/login'); 
                return false;
            }
            return true;
        }).take(1);
    }
}
