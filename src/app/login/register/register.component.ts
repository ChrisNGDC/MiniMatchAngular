import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  host: { ngSkipHydration: 'true' }
})
export class RegisterComponent {

}
