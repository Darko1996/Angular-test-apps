import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  email;
  password;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {}

  onSignin(form: NgForm){
    this.authService.signinUser(this.email, this.password);
  }

  onLogout(){
    this.authService.logout();
  }


}
