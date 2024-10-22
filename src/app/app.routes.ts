import { Routes } from '@angular/router';
import { MemoriaComponent } from './games/memoria/memoria.component';
import { MainComponent } from './main/main.component'

export const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'memoria', component: MemoriaComponent },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
];
