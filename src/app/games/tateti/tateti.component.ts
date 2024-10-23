import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-tateti',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './tateti.component.html',
  styleUrl: './tateti.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class TatetiComponent{
  turno = 'X';
  tablero = ['', '', '', '', '', '', '', '', ''];
  juegoTerminado = false;
  jugador1 = '';
  jugador2 = '';

  combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  iniciarJuego() {
    this.jugador1 =
      (<HTMLInputElement>document.getElementById('jugador1')).value || 'Jugador 1';
    this.jugador2 =
      (<HTMLInputElement>document.getElementById('jugador2')).value || 'Jugador 2';
    document.getElementById(
      'tituloJuego'
    ).textContent = `${this.jugador1} (X) vs ${this.jugador2} (O)`;
    document.getElementById('jugador1Tablero').textContent =
      this.jugador1 + ' (X)';
    document.getElementById('jugador2Tablero').textContent =
      this.jugador2 + ' (O)';
    this.actualizarTurno();
    document.getElementById('bienvenida').style.display = 'none';
    document.getElementById('juego').style.display = 'block';
  }

  hacerJugada(index: number) {
    if (this.tablero[index] === '' && !this.juegoTerminado) {
      this.tablero[index] = this.turno;
      let celda = document.getElementById(`${index}`)
      celda.textContent = this.turno;
      celda.classList.add(this.turno.toLowerCase());

      if (this.verificarGanador()) {
        const ganador = this.turno === 'X' ? this.jugador1 : this.jugador2;
        document.getElementById(
          'mensaje'
        ).textContent = `¡${ganador} ha ganado!`;
        document.getElementById('mensaje').classList.remove('oculto');
        this.juegoTerminado = true;
      } else if (this.tablero.indexOf('') === -1) {
        document.getElementById('mensaje').textContent = '¡Es un empate!';
        document.getElementById('mensaje').classList.remove('oculto');
        this.juegoTerminado = true;
      }
      this.turno = this.turno === 'X' ? 'O' : 'X';
      this.actualizarTurno();
    }
  }

  verificarGanador() {
    for (const combinacion of this.combinacionesGanadoras) {
      const [a, b, c] = combinacion;
      if (
        this.tablero[a] &&
        this.tablero[a] === this.tablero[b] &&
        this.tablero[a] === this.tablero[c]
      ) {
        return true;
      }
    }
    return false;
  }

  reiniciarJuego() {
    this.turno = 'X';
    this.tablero = ['', '', '', '', '', '', '', '', ''];
    this.juegoTerminado = false;
    document.getElementById('mensaje').classList.add('oculto');
    const celdas = document.getElementsByClassName('celda');
    for (let i = 0; i < celdas.length; i++) {
      celdas[i].textContent = '';
      celdas[i].classList.remove('x', 'o');
    }
    this.actualizarTurno();
  }

  salirJuego() {
    // Reiniciar el juego
    this.reiniciarJuego();

    // Limpiar los nombres de los jugadores
    (<HTMLInputElement>document.getElementById('jugador1')).value = '';
    (<HTMLInputElement>document.getElementById('jugador2')).value = '';

    // Mostrar la pantalla de bienvenida y ocultar el tablero de juego
    document.getElementById('juego').style.display = 'none';
    document.getElementById('bienvenida').style.display = 'block';
  }

  actualizarTurno() {
    const jugador1Elemento = document.getElementById('jugador1Tablero');
    const jugador2Elemento = document.getElementById('jugador2Tablero');

    if (this.turno === 'X') {
      jugador1Elemento.classList.add('activo');
      jugador2Elemento.classList.remove('activo');
      jugador1Elemento.style.backgroundColor = 'rgba(250, 169, 22, 0.5)'; // Color para el turno de X
      jugador2Elemento.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    } else {
      jugador1Elemento.classList.remove('activo');
      jugador2Elemento.classList.add('activo');
      jugador2Elemento.style.backgroundColor = 'rgba(3, 181, 170, 0.5)'; // Color para el turno de O
      jugador1Elemento.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    }
  }
}
