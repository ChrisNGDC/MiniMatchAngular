import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PuntuacionesService {

  constructor(private http: HttpClient) { }

  async getPuntuaciones(juego: string) {
    return this.http.request('GET', 'http://54.164.249.125:3000/puntuaciones/' + juego)
  }
}
