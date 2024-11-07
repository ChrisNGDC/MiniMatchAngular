import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component'
import { MemoriaComponent } from './games/memoria/memoria.component';
import { TetrisComponent } from './games/tetris/tetris.component';
import { SnakeComponent } from './games/snake/snake.component';
import { TatetiComponent } from './games/tateti/tateti.component';
import { PptComponent } from './games/ppt/ppt.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';


export const routes: Routes = [
  { path: 'main/:logueado', component: MainComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'register',   component: RegisterComponent },
  { path: 'forgot-password',    component: ForgotPasswordComponent },
  { path: 'memoria', component: MemoriaComponent },
  { path: 'tetris', component: TetrisComponent },
  { path: 'snake', component: SnakeComponent },
  { path: 'tateti', component: TatetiComponent },
  { path: 'ppt', component: PptComponent },
  { path: '', redirectTo: 'main/false', pathMatch: 'full' },
  { path: 'main', redirectTo: 'main/false', pathMatch: 'full' },
];
