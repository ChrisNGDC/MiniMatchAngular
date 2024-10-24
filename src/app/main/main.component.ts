import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as data from './data.json';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  ActivatedRoute,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  rankings: any[] = [];
  logueado: string;
  private sub: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  ngOnInit() {
    this.cargarRankings();
    this.cambiarEstado();
  }

  cargarRankings() {
    this.rankings = data.rankings;
  }

  ranking_actual = 0;

  cambiarRanking(cantidad: number) {
    if (this.ranking_actual + cantidad > this.rankings.length - 1) {
      this.ranking_actual = 0;
    } else if (this.ranking_actual + cantidad < 0) {
      this.ranking_actual = this.rankings.length - 1;
    } else {
      this.ranking_actual += cantidad;
    }
  }

  login() {
    if (this.logueado == 'false') {
      this.router.navigate(['/login']);
    } else {
      // this.logueado = 'false';
      // this.cambiarEstado();
      this.router.navigate(['/main/false']).then(() => {
        window.location.reload();
      });;

    }
  }

  cambiarEstado() {
    this.sub = this.route.params.subscribe((params) => {
      this.logueado = params['logueado'];
    });
    let estado = document.getElementById('log-state');
    if (this.logueado == 'false') {
      estado.innerText = 'Iniciar Sesión';
    } else {
      estado.innerText = 'Cerrar Sesión';
    }
  }
}
