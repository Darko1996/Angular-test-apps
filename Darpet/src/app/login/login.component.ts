import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import {animate, style, transition, trigger, state} from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
      trigger('login', [ state ('', style({
        opacity: 1,
        transform: 'rotateX(0deg)'
      })),
          transition('void => *', [
              style({
                opacity: 0,
                transform: 'rotateX(45deg)'
              }), animate(500),
              transition('* => void', [style({
                opacity: 0,
                transform: 'translateX(-100px)'
              }), animate(500)
              ])
          ])
      ])
  ]
})
export class LoginComponent implements OnInit {

  Email: string;
  Password: string;
  errorMsg: string;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }
  onHome() {
    this.router.navigate(['/']);
  }
  onAdd() {
    this.authService.login({email: this.Email, password: this.Password})
    .then(resolve => this.router.navigate(['/add']))
    .catch(error => this.errorMsg = error.message);
  }

}
