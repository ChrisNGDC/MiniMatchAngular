import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as data from './data.json';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'MiniMatchAngular';
  rankings: any[] = [];

  ngOnInit() {
    this.cargarRankings();
  }

  cargarRankings() {
    this.rankings = data.rankings;;
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
          case  'Cerrar Sesión':
              this.usuario_logeado = true;
              break;
      }
      if (this.usuario_logeado) {
          estado.innerText = 'Iniciar Sesión';
      } else {
          estado.innerText = 'Cerrar Sesión';
      }
      this.usuario_logeado =  !this.usuario_logeado;
  }
}

