import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PuntuacionesService } from '../../services/puntuaciones.service';

@Component({
  selector: 'app-tetris',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './tetris.component.html',
  styleUrl: './tetris.component.scss',
})
export class TetrisComponent implements OnInit {
  pieces = [
    { shape: [[1, 1, 1, 1]], color: 'cyan' }, // I
    {
      shape: [
        [1, 1, 1],
        [0, 1, 0],
      ],
      color: 'blue',
    }, // T
    {
      shape: [
        [1, 1],
        [1, 1],
      ],
      color: 'yellow',
    }, // O
    {
      shape: [
        [1, 1, 0],
        [0, 1, 1],
      ],
      color: 'red',
    }, // Z
    {
      shape: [
        [0, 1, 1],
        [1, 1, 0],
      ],
      color: 'green',
    }, // S
    {
      shape: [
        [1, 1, 1],
        [1, 0, 0],
      ],
      color: 'orange',
    }, // L
    {
      shape: [
        [1, 1, 1],
        [0, 0, 1],
      ],
      color: 'purple',
    }, // J
  ];

  canvas: any;
  ctx: any;
  COLS: any;
  ROWS: any;
  BLOCK_SIZE: any;
  board: any;
  currentPiece: any;
  score: any;
  gameOver: any;

  constructor(private apiDB: PuntuacionesService) {}

  ngOnInit(): void {
    this.canvas = <HTMLCanvasElement>document.getElementById('gameCanvas');
    this.ctx = (<HTMLCanvasElement>this.canvas).getContext('2d');
    this.canvas.width = 300;
    this.canvas.height = 600;
    this.COLS = 10;
    this.ROWS = 20;
    this.BLOCK_SIZE = this.canvas.width / this.COLS;
    this.board = [];
    this.score = 0;
    this.gameOver = false;
  }

  startGame() {
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    this.board = this.createBoard();
    this.currentPiece = this.createPiece();
    this.score = 0;
    this.gameOver = false;
    document.getElementById('gameScore').innerText = `${this.score}`;
    document.addEventListener('keydown', this.onKeyDown)
    this.gameLoop();
  }

  restartGame() {
    this.gameOver = true;
    document.getElementById('game-container').classList.add('hidden');
    document.getElementById('menu').classList.remove('hidden');
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  createBoard(): any {
    let board = [];
    for (let y = 0; y < this.ROWS; y++) {
      board[y] = [];
      for (let x = 0; x < this.COLS; x++) {
        board[y][x] = 0;
      }
    }
    return board;
  }

  createPiece() {
    let piece = this.pieces[Math.floor(Math.random() * this.pieces.length)];
    return {
      shape: piece.shape,
      color: piece.color,
      x: Math.floor(this.COLS / 2) - Math.ceil(piece.shape[0].length / 2),
      y: 0,
    };
  }

  drawBlock(
    x: number,
    y: number,
    color: string | CanvasGradient | CanvasPattern
  ) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      x * this.BLOCK_SIZE,
      y * this.BLOCK_SIZE,
      this.BLOCK_SIZE,
      this.BLOCK_SIZE
    );
    this.ctx.strokeStyle = '#000';
    this.ctx.strokeRect(
      x * this.BLOCK_SIZE,
      y * this.BLOCK_SIZE,
      this.BLOCK_SIZE,
      this.BLOCK_SIZE
    );
  }

  drawBoard() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let y = 0; y < this.ROWS; y++) {
      for (let x = 0; x < this.COLS; x++) {
        if (this.board[y][x]) {
          this.drawBlock(x, y, this.board[y][x]);
        }
      }
    }
    this.drawPiece(this.currentPiece);
  }

  drawPiece(piece: { shape: any[]; x: any; y: any; color: any }) {
    piece.shape.forEach((row: any[], y: any) => {
      row.forEach((value: any, x: any) => {
        if (value) {
          this.drawBlock(piece.x + x, piece.y + y, piece.color);
        }
      });
    });
  }

  movePieceDown(): void {
    this.currentPiece.y += 1;
    if (this.collision()) {
      this.currentPiece.y -= 1;
      this.placePiece();
      this.currentPiece = this.createPiece();
      if (this.collision()) {
        this.gameOver = true;
      }
    }
  }

  movePiece(dir: number) {
    this.currentPiece.x += dir;
    if (this.collision()) {
      this.currentPiece.x -= dir;
    }
  }

  rotatePiece() {
    let shape = this.currentPiece.shape;
    let rows = shape.length;
    let cols = shape[0].length;
    let newShape = [];

    // Crear una nueva matriz rotada basada en la forma original
    for (let y = 0; y < cols; y++) {
      newShape[y] = [];
      for (let x = 0; x < rows; x++) {
        newShape[y][x] = shape[rows - 1 - x][y];
      }
    }

    // Guardar la posición original
    let oldX = this.currentPiece.x;
    let oldY = this.currentPiece.y;

    // Verificar si la rotación está dentro del tablero
    this.currentPiece.shape = newShape;
    if (this.collision()) {
      this.currentPiece.shape = shape; // Revertir a la forma original
      this.currentPiece.x = oldX; // Revertir a la posición original en X
      this.currentPiece.y = oldY; // Revertir a la posición original en Y
    } else {
      // Ajustar la posición X para evitar salirse del tablero
      if (this.currentPiece.x + newShape[0].length > this.COLS) {
        this.currentPiece.x = this.COLS - newShape[0].length;
      }
      // Ajustar la posición Y para evitar salirse del tablero por arriba
      if (this.currentPiece.y + newShape.length > this.ROWS) {
        this.currentPiece.y = this.ROWS - newShape.length;
      }
    }
  }

  collision() {
    for (let y = 0; y < this.currentPiece.shape.length; y++) {
      for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
        if (
          this.currentPiece.shape[y][x] &&
          (this.currentPiece.y + y >= this.ROWS || // Colisión con el fondo del tablero
            this.currentPiece.x + x < 0 || // Colisión con el borde izquierdo
            this.currentPiece.x + x >= this.COLS || // Colisión con el borde derecho
            this.board[this.currentPiece.y + y][this.currentPiece.x + x]) // Colisión con piezas existentes
        ) {
          return true;
        }
      }
    }
    return false;
  }

  placePiece() {
    this.currentPiece.shape.forEach((row: any[], y: any) => {
      row.forEach((value: any, x: any) => {
        if (value) {
          this.board[this.currentPiece.y + y][this.currentPiece.x + x] =
            this.currentPiece.color;
        }
      });
    });
    this.checkLines();
  }

  checkLines() {
    let lines = 0;
    for (let y = this.ROWS - 1; y >= 0; y--) {
      if (this.board[y].every((value: number) => value !== 0)) {
        this.board.splice(y, 1);
        this.board.unshift(new Array(this.COLS).fill(0));
        lines++;
      }
    }
    this.score += lines * 500;
    document.getElementById('gameScore').innerText = `${this.score}`;
  }

  gameLoop() {
    if (!this.gameOver) {
      this.movePieceDown();
      this.drawBoard();
      setTimeout(() => {
        this.gameLoop();
      }, 500); // Velocidad del juego
    } else {
      alert('Game Over! Tus Puntos: ' + this.score);
      this.apiDB.savePuntuacion('tetris', this.score)
      this.restartGame();
    }
  }

  onKeyDown = (event: any) => {
    if (!this.gameOver) {
      if (event.key == 'ArrowLeft') {
        this.movePiece(-1);
      } else if (event.key == 'ArrowRight') {
        this.movePiece(1);
      } else if (event.key == 'ArrowDown') {
        this.movePieceDown();
      } else if (event.key == 'ArrowUp') {
        this.rotatePiece();
      }
      this.drawBoard();
    }
  };
}
