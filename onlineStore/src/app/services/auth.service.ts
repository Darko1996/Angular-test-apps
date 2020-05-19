import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/observable";
import { AngularFireAuth } from  "@angular/fire/auth";
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  token: string;

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  signinUser(email: string, password: string){
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(resp => {
       firebase.auth().currentUser.getIdToken()
       .then(
         (token: string) => {
           this.token = token
           console.log(`Vas token je: ${token}`);
         })
    })
      .catch(error => console.log(error))
  }

  logout(){
    firebase.auth().signOut();
    this.token = null;
  }

  getToken(){
    firebase.auth().currentUser.getIdToken()
    .then(
         (token: string) => this.token = token
       );
    return this.token;
  }

  isAuthenticated(){
    return this.token != null;
  }
}
