import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { User } from './../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = 'asdas6dsa1das4f681sadgsd1g6sdf';
  isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();

  user: User = { username: 'Admin', password: '12345' };

  constructor(private router: Router, public http: HttpClient) {}

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  login(username, password) {
    const user: User = { username, password };
    if (this.user.username === user.username && this.user.password === user.password) {
        if (this.token) {
          this.isAuthenticated = true;
          this.saveAuthData(this.token);
          this.authStatusListener.next(true);
          this.router.navigate(['/profile']);
      }
    }
  }

  logout() {
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  // set token to localstorage
  private saveAuthData(token: string) {
    localStorage.setItem('token', token);
  }

  // remove token from localstorage
  private clearAuthData() {
    localStorage.removeItem('token');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    return {
      token,
    };
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    this.token = authInformation.token;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }
}
