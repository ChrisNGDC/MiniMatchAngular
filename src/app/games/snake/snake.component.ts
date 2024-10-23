import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-snake',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './snake.component.html',
  styleUrl: './snake.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class SnakeComponent {
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
    victima: [{ x: 0, y: 250 }],
    playing: false,
    grewUp: 0,
    points: 0,
  };

  // let containerButton = document.getElementById('containerButton');
  // let parrafo = document.getElementById("parrafo");
  // let containerRestart = document.getElementById('containerRestart');

  // document.getElementById('change');
  // change.textContent = controls.points;

  // let goTo;

  // //Referencio el canvas en JS
  // let tablero = document.querySelector("canvas");
  // let ctx = tablero.getContext("2d"); //Referenciamos el contexto 2d de canvas

  // let loop = () => {
  //   let cola = {}; //Armar objeto vacío para la cola
  //   Object.assign(cola, controls.snake[controls.snake.length-1]); //clonar la última posición de bicho en cola
  //   const head = controls.snake[0]; //Instanciar cabeza serpiente
  //   let iGotYou = head.x === controls.victima.x && head.y === controls.victima.y //verifica si la serpiente atrapa a la victima
  //   if(crush()){ //detectamos si la serpiente choca en esa vuelta del loop
  //       controls.playing = false; // se pone en false el juego
  //       gameOver();
  //   }

  //   let dx = controls.direccion.x; //referencio direccion actual
  //   let dy = controls.direccion.y;

  //   let sizeSnake = controls.snake.length - 1; // se guarda el tamaño de la serpiente

  //   if(controls.playing){
  //       for(let idx = sizeSnake; idx > -1; idx--){
  //           const head = controls.snake[idx]; //referencio la cabeza de la serpiente
  //           if(idx === 0){ //si la posición es 0 al igual que la cabeza, se le asigna uno más
  //               head.x += dx;
  //               head.y += dy;
  //           }else{ // a las diferentes posiciones de la cola, se le va sumando hasta llegar a la cabeza
  //               head.x = controls.snake[idx-1].x;
  //               head.y = controls.snake[idx-1].y;
  //           }
  //           }
  //   }

  //   if(iGotYou){ // si es true, llama a createNewPosition. Esta última regenera la posición de la victima.
  //       controls.grewUp += 10;
  //       createNewPosition();
  //       managePoints();
  //   }else{
  //       controls.grewUp = 0;
  //   }

  //   if(controls.grewUp > 0){
  //       controls.snake.push(cola);
  //       controls.grewUp -= 1;
  //   }
  //   //si atrapa presa y la cantidad de puntos es divisible por 50, se restan 10 al intervalo de tiempo
  //   if(controls.points % 50 == 0 && iGotYou){
  //       features.intervalo -=10;
  //   }

  //   requestAnimationFrame(draw);
  //   setTimeout(loop, features.intervalo);
  // }

  // let crush = () => {
  //   //instancia a la cabeza
  //   const HEAD = controls.snake[0];
  //   //detecta si choca con los bordes o se sale de ellos
  //   if(HEAD.x < 0 || HEAD.x >= features.size / features.peso || HEAD.Y >= features.size / features.peso  || HEAD.y < 0){
  //       return true;
  //   }
  //   //detecta si choca contra si misma
  //   for(let idx = 1; idx < controls.snake.length; idx++){
  //       const BODY = controls.snake[idx];
  //       if(BODY.x === HEAD.x && BODY.y === HEAD.y){
  //           return true;
  //       }
  //   }
  // }

  // document.onkeydown = (e)=>{
  //   goTo = MOVIMIENTO[e.key];
  //   const [x, y] = goTo;
  //   if(-x !== controls.direccion.x && -y !== controls.direccion.y){
  //       controls.direccion.x = x;
  //       controls.direccion.y = y;
  //   }
  // }

  // let draw = () => {
  //   ctx.clearRect(0,0,features.size,features.size);
  //   for(let idx=0; idx < controls.snake.length; idx++){
  //       const{x, y} = controls.snake[idx];
  //       drawElements('green', x, y);
  //   }
  //   const victim = controls.victima;
  //   drawElements('red', victim.x, victim.y);
  // }

  // let drawElements = (color, x, y) =>{
  //   ctx.fillStyle = color; //color de lo que voy a crear a continuación
  //   //dibujar un rectángulo -- posiciónX, posiciónY,ancho y alto
  //   ctx.fillRect(x * features.peso, y * features.peso, features.peso,features.peso);
  // }

  // let random= () =>{
  //   let everyWhere = Object.values(MOVIMIENTO);
  //   return{
  //       x: parseInt(Math.random() * features.size / features.peso),
  //       y: parseInt(Math.random() * features.size / features.peso),
  //       d: everyWhere[parseInt(Math.random() * 11)]
  //   }
  // }

  // //posiciiona a la victima cuando fue capturada
  // createNewPosition = () => {
  //   let newPosition = random();
  //   let victima = controls.victima;
  //   victima.x = newPosition.x;
  //   victima.y = newPosition.y;
  // }

  // let playAgain = () => {
  //   //posicion random snake
  //   posiciones = random();
  //   let head = controls.snake[0];
  //   head.x = posiciones.x;
  //   head.y = posiciones.y;
  //   controls.direccion.x = posiciones.d[0];
  //   controls.direccion.y = posiciones.d[1];

  //   //posiciones de la victima
  //   posicionVictima = random();
  //   let victima = controls.victima;
  //   victima.x = posicionVictima.x;
  //   victima.y = posicionVictima.y;
  //   controls.playing = true;
  // }

  // let gameOver = () =>{
  //   containerRestart.style.display = "block";
  //   parrafo.style.display="block";
  //   controls.points = 0;
  //   document.getElementById('change');
  //   change.textContent = controls.points;
  // }

  // let managePoints = () =>{ //acumulador de puntaje que actualiza el titulo del principio
  //   controls.points += 10;
  //   document.getElementById('change');
  //   change.textContent = controls.points;
  // }

  // let restartGame = () => {
  //   document.location.reload();

  // }

  // startButton.addEventListener("click", () => {
  // containerButton.style.display = "none";
  // playAgain();
  // loop();
  // });
}
