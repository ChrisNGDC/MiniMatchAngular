import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PuntuacionesService {

  constructor(private http: HttpClient) { }

  async getPuntuaciones(juego: string) {
    return this.http.request('GET', '/puntuaciones/' + juego)
  }
}
