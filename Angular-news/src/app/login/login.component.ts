import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { slideIn } from '../animations';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [slideIn]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  forbiddenUsername = 'Admin';
  forbiddenPassword = '12345';

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, {validators: [Validators.required, this.forbiddenName.bind(this)]}),
      password: new FormControl(null, {validators: [Validators.required, this.forbiddenPass.bind(this)]}),
    });
  }

  onLogin() {
    const username = this.form.value.username;
    const password = this.form.value.password;

    if (!this.form.valid) {
        return;
    }
    this.authService.login(username, password);
  }

  /* ----- custom validation ----- */

  forbiddenName(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsername.indexOf(control.value)) {
      return { 'nameIsForbidden': true }; // error name
    }
    return null;
  }

  forbiddenPass(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenPassword.indexOf(control.value)) {
      return { 'passwordIsForbidden': true }; // error name
    }
    return null;
  }
}
