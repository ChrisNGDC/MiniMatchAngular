import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PuntuacionesService } from '../../services/puntuaciones.service';

@Component({
  selector: 'app-snake',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './snake.component.html',
  styleUrl: './snake.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class SnakeComponent implements OnInit {
  //Constante movimiento que va a tener un obj con los movimientos de snake. Cada prop tiene la coordenada
  //del movimiento del bicho
  MOVIMIENTO = {
    A: [-1, 0],
    D: [1, 0],
    S: [0, 1],
    W: [0, -1],
    a: [-1, 0],
    d: [1, 0],
    s: [0, 1],
    w: [0, -1],
    ArrowDown: [0, 1],
    ArrowUp: [0, -1],
    ArrowRight: [1, 0],
    ArrowLeft: [-1, 0],
    ClickDown: [0, 1],
    ClickUp: [0, -1],
    ClickLeft: [-1, 0],
    ClickRight: [1, 0],
  };

  features = {
    intervalo: 80,
    size: 500,
    peso: 10,
  };

  controls = {
    direccion: { x: 1, y: 0 },
    snake: [{ x: 40, y: 0 }],
    victima: { x: 0, y: 250 },
    playing: false,
    grewUp: 0,
    points: 0,
  };

  containerButton: any;
  parrafo: any;
  containerRestart: any;
  ctx: any;

  constructor(private apiDB: PuntuacionesService) {}

  ngOnInit() {
    document.getElementById('change').innerText =
      this.controls.points.toString();
    let tablero = document.querySelector('canvas');
    this.ctx = tablero.getContext('2d'); //Referenciamos el contexto 2d de canvas
    this.containerButton = document.getElementById('containerButton');
    this.parrafo = document.getElementById('parrafo');
    this.containerRestart = document.getElementById('containerRestart');
  }

  // //Referencio el canvas en JS

  loop = () => {
    let cola = {
      x: this.controls.snake[this.controls.snake.length - 1].x - this.controls.direccion.x,
      y: this.controls.snake[this.controls.snake.length - 1].y - this.controls.direccion.y
    }; //clonar la última posición de bicho en cola
    let head = this.controls.snake[0]; //Instanciar cabeza serpiente
    let iGotYou =
      head.x === this.controls.victima.x && head.y === this.controls.victima.y; //verifica si la serpiente atrapa a la victima
    if (this.crush()) {
      //detectamos si la serpiente choca en esa vuelta del loop
      this.controls.playing = false; // se pone en false el juego
      this.gameOver();
    }

    let dx = this.controls.direccion.x; //referencio direccion actual
    let dy = this.controls.direccion.y;

    let sizeSnake = this.controls.snake.length - 1; // se guarda el tamaño de la serpiente

    if (this.controls.playing) {
      for (let idx = sizeSnake; idx > -1; idx--) {
        let head = this.controls.snake[idx]; //referencio la cabeza de la serpiente
        if (idx === 0) {
          //si la posición es 0 al igual que la cabeza, se le asigna uno más
          head.x += dx;
          head.y += dy;
        } else {
          // a las diferentes posiciones de la cola, se le va sumando hasta llegar a la cabeza
          head.x = this.controls.snake[idx - 1].x;
          head.y = this.controls.snake[idx - 1].y;
        }
      }
    }

    if (iGotYou) {
      // si es true, llama a createNewPosition. Esta última regenera la posición de la victima.
      this.controls.grewUp += 1;
      this.createNewPosition();
      this.managePoints();
    } else {
      this.controls.grewUp = 0;
    }

    if (this.controls.grewUp > 0) {
      console.log(this.controls)
      this.controls.snake.push(cola);
      this.controls.grewUp -= 1;
    }
    //si atrapa presa y la cantidad de puntos es divisible por 50, se restan 10 al intervalo de tiempo
    if (this.controls.points % 50 == 0 && iGotYou) {
      this.features.intervalo -= 10;
    }

    requestAnimationFrame(this.draw);
    setTimeout(this.loop, this.features.intervalo);
  };

  crush = () => {
    //instancia a la cabeza
    let HEAD = this.controls.snake[0];
    //detecta si choca con los bordes o se sale de ellos
    if (
      HEAD.x < 0 ||
      HEAD.x >= this.features.size / this.features.peso ||
      HEAD.y >= this.features.size / this.features.peso ||
      HEAD.y < 0
    ) {
      return true;
    }
    //detecta si choca contra si misma
    for (let idx = 1; idx < this.controls.snake.length; idx++) {
      let BODY = this.controls.snake[idx];
      if (BODY.x === HEAD.x && BODY.y === HEAD.y) {
        return true;
      }
    }
    return false;
  };

  onKeyDown = (e: any) => {
    let goTo = this.MOVIMIENTO[e.key as keyof typeof this.MOVIMIENTO];
    let [x, y] = goTo;
    if (-x !== this.controls.direccion.x && -y !== this.controls.direccion.y) {
      this.controls.direccion.x = x;
      this.controls.direccion.y = y;
    }
  };

  draw = () => {
    this.ctx.clearRect(0, 0, this.features.size, this.features.size);
    for (let idx = 0; idx < this.controls.snake.length; idx++) {
      let { x, y } = this.controls.snake[idx];
      this.drawElements('green', x, y);
    }
    const victim = this.controls.victima;
    this.drawElements('red', victim.x, victim.y);
  };

  drawElements = (
    color: string | CanvasGradient | CanvasPattern,
    x: number,
    y: number
  ) => {
    this.ctx.fillStyle = color; //color de lo que voy a crear a continuación
    //dibujar un rectángulo -- posiciónX, posiciónY,ancho y alto
    this.ctx.fillRect(
      x * this.features.peso,
      y * this.features.peso,
      this.features.peso,
      this.features.peso
    );
  };

  random = () => {
    let everyWhere = Object.values(this.MOVIMIENTO);
    return {
      x: Math.floor((Math.random() * this.features.size) / this.features.peso),
      y: Math.floor((Math.random() * this.features.size) / this.features.peso),
      d: everyWhere[Math.floor(Math.random() * 11)],
    };
  };

  //posiciiona a la victima cuando fue capturada
  createNewPosition = () => {
    let newPosition = this.random();
    let victima = this.controls.victima;
    victima.x = newPosition.x;
    victima.y = newPosition.y;
  };

  playAgain = () => {
    //posicion random snake
    let posiciones = this.random();
    let head = this.controls.snake[0];
    head.x = posiciones.x;
    head.y = posiciones.y;
    this.controls.direccion.x = posiciones.d[0];
    this.controls.direccion.y = posiciones.d[1];

    //posiciones de la victima
    let posicionVictima = this.random();
    let victima = this.controls.victima;
    victima.x = posicionVictima.x;
    victima.y = posicionVictima.y;
    this.controls.playing = true;
  };

  gameOver = () => {
    this.containerRestart.style.display = 'block';
    this.parrafo.style.display = 'block';
    document.getElementById('change').innerHTML =
      this.controls.points.toString();
    this.apiDB.savePuntuacion('snake', 8000);
  };

  managePoints = () => {
    //acumulador de puntaje que actualiza el titulo del principio
    this.controls.points += 10;
    document.getElementById('change').innerHTML =
      this.controls.points.toString();
  };

  restartGame = () => {
    window.location.reload();
  };

  start() {
    document.getElementById('containerButton').style.display = 'none';
    document.addEventListener('keydown', this.onKeyDown)
    this.playAgain();
    this.loop();
  }
}
