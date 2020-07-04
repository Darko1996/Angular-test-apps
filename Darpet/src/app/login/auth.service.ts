import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    private user: Observable<firebase.User>;

    constructor(private afAuth: AngularFireAuth){ //ovo proverava da li je prijavljen korisnik ili ne 
        this.user = afAuth.authState; 
    }
    login(user: User){
        return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    }
    logout(){
        return this.afAuth.auth.signOut();
    }
    authUser(){
        return this.user;
    }
}