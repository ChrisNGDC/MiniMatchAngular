import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { AuthService } from '../../services/AuthService';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, AmplifyAuthenticatorModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  formFields = {
    signUp: {
      name: {
        order: 1
      },
      email: {
        order: 2
      },
      password: {
        order: 5
      },
      confirm_password: {
        order: 6
      }
    },
  };

  constructor(
    private router: Router,
    private authService: AuthService,

  ) {}

  async ngOnInit(): Promise<void> {

  }

  continuar() {
    this.authService.login();
    this.router.navigate(['/main']);
  }
}
