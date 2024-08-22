import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.css']
})
export class AppLoginComponent {
  username: string = '';
  password: string = '';

  login() {
    alert('You are logged in!');
  }

  forgotPassword() {
    alert('Your new password has been mailed to you.');
  }
}
