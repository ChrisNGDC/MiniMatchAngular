import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  host: { ngSkipHydration: 'true' }
})
export class ForgotPasswordComponent {

}
