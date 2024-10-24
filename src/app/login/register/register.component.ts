import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { signUp } from 'aws-amplify/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class RegisterComponent {
  register() {
    signUp({
      username: (<HTMLInputElement>document.getElementById('username')).value,
      password: (<HTMLInputElement>document.getElementById('password')).value,
    })
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }
}
