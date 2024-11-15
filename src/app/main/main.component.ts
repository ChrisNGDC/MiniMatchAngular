import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterLink,
  RouterLinkActive,
  ActivatedRoute,
  Router,
} from '@angular/router';
import { PuntuacionesService } from '../services/puntuaciones.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  rankings: any[] = [
    {
      juego: 'cargando',
      puntuaciones: []
    }
  ];
  puestos: string[] = ['🥇', '🥈', '🥉', '4', '5', '6', '7', '8', '9', '10'];
  juegos: string[] = ['tateti', 'ppt', 'memoria', 'snake', 'tetris'];
  logueado: string;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private puntuacionesService: PuntuacionesService
  ) {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  ngOnInit() {
    this.cargarRankings();
    this.cambiarEstado();
  }

  cargarRankings() {
    this.rankings = [];
    this.juegos.forEach(async (unJuego) => {
      let juegoPuntuaciones;
      (await this.puntuacionesService.getPuntuaciones()).subscribe(
        (res) => {
          juegoPuntuaciones = {
            juego: unJuego,
            puntuaciones: res['puntuaciones' as keyof typeof res],
          };
          this.rankings.push(juegoPuntuaciones);
        }
      );
    });
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
      });
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
