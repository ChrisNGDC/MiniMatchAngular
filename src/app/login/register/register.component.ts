import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor() {}

  register() {
    let username = <HTMLInputElement>document.getElementById('username');
    let mail = <HTMLInputElement>document.getElementById('email');
    let pass = <HTMLInputElement>document.getElementById('password');
    let newUser = {
      username: username.value,
      mail: mail.value,
      password: pass.value,
    };
    console.log(newUser);
  }
}
