import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import * as data from './data.json';

@Component({
  selector: 'app-memoria',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './memoria.component.html',
  styleUrl: './memoria.component.scss'
})
export class MemoriaComponent implements OnInit {
  themes: { messi: string[]; art: string[]; musica: string[] };
  choosenTheme: string[];
  constructor() {}
  ngOnInit(): void {
    this.themes = data.themes;
  }
  startGame(theme: string) {
    switch (theme) {
      case 'messi':
        this.choosenTheme = this.themes.messi;
        break;
      case 'art':
        this.choosenTheme = this.themes.art;
        break;
      case 'musica':
        this.choosenTheme = this.themes.musica;
        break;
    }
    const shuffledtheme = this.choosenTheme.sort(() =>
      Math.random() > 0.5 ? 2 : -1
    );
    console.log(this.choosenTheme);
    document.getElementById('themeSelector').style.display = 'none';
  }
  darVueltaImagen(i: number) {
    let itemElement = document.getElementById(`${i}`);
    let cartaElement = itemElement.getElementsByTagName('img')[0];
    cartaElement.style.display = 'block';
    itemElement.classList.add('boxOpen');
    let seleccionados = document.querySelectorAll('.boxOpen');
    if (seleccionados.length > 1) {
      let firstBox = seleccionados[0];
      let secondBox = seleccionados[1];
      setTimeout(() => {
        if (firstBox.classList[1] == secondBox.classList[1]) {
          firstBox.classList.add('boxMatch');
          secondBox.classList.add('boxMatch');

          firstBox.classList.remove('boxOpen');
          secondBox.classList.remove('boxOpen');

          if (
            document.querySelectorAll('.boxMatch').length ==
            this.choosenTheme.length
          ) {
            alert('Ganaste!!');
          }
        } else {
          firstBox.querySelector('img').style.display = 'none';
          secondBox.querySelector('img').style.display = 'none';
          firstBox.classList.remove('boxOpen');
          secondBox.classList.remove('boxOpen');
        }
      }, 1000)
    }
  }
  reloadPage() {
    window.location.reload();
  }
}
