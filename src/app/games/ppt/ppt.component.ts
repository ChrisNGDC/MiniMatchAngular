import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ppt',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './ppt.component.html',
  styleUrl: './ppt.component.scss'
})
export class PptComponent {
  opcionJugador: any;
  opcionPc: any;
  imgJugador: any;
  imgPc: any;

  imagenes = [
    {
      name: 'Piedra',
      url: 'piedra.png',
    },
    {
      name: 'Papel',
      url: 'papel.png',
    },
    {
      name: 'Tijeras',
      url: 'tijera.png',
    },
  ];

  elegir(opcion: any) {
    this.opcionJugador = opcion;
    this.opPc();
  }

  opPc() {
    var aleaorio = this.nAleatorio();

    if (aleaorio == 0) {
      this.opcionPc = 'Piedra';
    } else if (aleaorio == 1) {
      this.opcionPc = 'Papel';
    } else if (aleaorio == 2) {
      this.opcionPc = 'Tijeras';
    }

    this.batalla();
  }

  batalla() {
    let msjBatalla = document.getElementById('msj-batalla');
    if (this.opcionJugador == this.opcionPc) {
      msjBatalla.innerHTML = 'Empate';
    } else if (this.opcionJugador == 'Piedra' && this.opcionPc == 'Tijeras') {
      msjBatalla.innerHTML = 'Ganaste!';
    } else if (this.opcionJugador == 'Papel' && this.opcionPc == 'Piedra') {
      msjBatalla.innerHTML = 'Ganaste!';
    } else if (this.opcionJugador == 'Tijeras' && this.opcionPc == 'Papel') {
      msjBatalla.innerHTML = 'Ganaste!';
    } else {
      msjBatalla.innerHTML = 'Perdiste :(';
    }

    this.addImagenes();
  }

  nAleatorio() {
    let n = Math.floor(Math.random() * 3);
    return n;
  }

  addImagenes() {
    let imgAtaqueJugador = document.getElementById('img-ataque-jugador');
    let imgAtaquePc = document.getElementById('img-ataque-pc');
    let seccionBatalla = document.getElementById('campo-batalla');
    for (let i = 0; i < this.imagenes.length; i++) {
      if (this.opcionJugador == this.imagenes[i].name) {
        this.imgJugador = this.imagenes[i].url;
        var inserta = `<img class="img-batalla" src=${this.imgJugador} alt="">`;
        imgAtaqueJugador.innerHTML = inserta;
      }

      if (this.opcionPc == this.imagenes[i].name) {
        this.imgPc = this.imagenes[i].url;
        var inserta = `<img class="img-batalla" src=${this.imgPc} alt="">`;
        imgAtaquePc.innerHTML = inserta;
      }
    }

    seccionBatalla.style.visibility = 'visible';
  }
}
