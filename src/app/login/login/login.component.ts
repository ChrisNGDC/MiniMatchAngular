import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  host: { ngSkipHydration: 'true' }
})
export class LoginComponent {
  constructor(private router: Router) { }
  login() {
    if(document.getElementById('email').ariaValueText ==  "test@gmail.com" && document.getElementById('password').ariaValueText == "test"){
      this.router.navigate(['/main', 'true']);
    }
  }
}
