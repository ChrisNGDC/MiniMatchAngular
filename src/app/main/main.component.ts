import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { PuntuacionesService } from '../services/puntuaciones.service';
import { AuthService } from '../services/AuthService';

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
      puntuaciones: [],
    },
  ];
  puestos: string[] = ['🥇', '🥈', '🥉', '4', '5', '6', '7', '8', '9', '10'];
  juegos: string[] = ['tateti', 'ppt', 'memoria', 'snake', 'tetris'];
  public user: string;
  public isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private puntuacionesService: PuntuacionesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cargarRankings();
    this.authService.isLoggedIn$.subscribe((state) => {
      this.isLoggedIn = state;
    });
    this.authService.getCurrentUserFullName().then(
      (user) => {
        this.user = user;
      }
    )
  }

  organizarRankings() {
    this.rankings.forEach((juego) => {
      juego.puntuaciones = juego.puntuaciones
        .sort((a: any, b: any) => b.score - a.score)
        .splice(0, 10);
    });
  }

  async cargarRankings() {
    this.rankings = [];
    let response: any;
    (await this.puntuacionesService.getPuntuaciones()).subscribe((res) => {
      response = res;
      response!.forEach((juego: any) => {
        let juegoPuntuaciones = {
          juego: juego.gameName,
          puntuaciones: juego.puntuaciones,
        };
        this.rankings.push(juegoPuntuaciones);
      });
      this.organizarRankings();
    });
  }

  ranking_actual = 0;

  toggleLogin() {
    if (this.isLoggedIn) {
      this.authService.signOut();
      this.authService.logout();
    } else {
      this.authService.login();
      this.router.navigate(['/login']);
    }
  }

  cambiarRanking(cantidad: number) {
    if (this.ranking_actual + cantidad > this.rankings.length - 1) {
      this.ranking_actual = 0;
    } else if (this.ranking_actual + cantidad < 0) {
      this.ranking_actual = this.rankings.length - 1;
    } else {
      this.ranking_actual += cantidad;
    }
  }

  mostarUsuario() {
    this.authService.getCurrentUserFullName().then(
      (user) => {
        console.log(user)
      }
    )
  }
}
