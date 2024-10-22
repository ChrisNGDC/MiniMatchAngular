import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as data from './data.json';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  rankings: any[] = [];

  ngOnInit() {
    this.cargarRankings();
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

  usuario_logeado: boolean = false;

  cambiarEstado() {
    let estado = document.getElementById('log-state');
    switch (estado.innerText) {
      case 'Iniciar Sesión':
        this.usuario_logeado = false;
        break;
      case 'Cerrar Sesión':
        this.usuario_logeado = true;
        break;
    }
    if (this.usuario_logeado) {
      estado.innerText = 'Iniciar Sesión';
    } else {
      estado.innerText = 'Cerrar Sesión';
    }
    this.usuario_logeado = !this.usuario_logeado;
  }
}
