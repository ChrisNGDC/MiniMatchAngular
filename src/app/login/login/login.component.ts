import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import * as data from '../../database/users.json';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class LoginComponent {
  constructor(private router: Router) {}
  login() {
    let email = document.getElementById('email') as HTMLInputElement;
    let password = document.getElementById('password') as HTMLInputElement;

    if (data.users.find(user => user.mail == email.value && user.password ==  password.value)){
      this.router.navigate(['/main', 'true']);
    }
  }
}
