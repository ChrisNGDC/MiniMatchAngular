import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PuntuacionesService {

  constructor(private http: HttpClient) { }

  async getPuntuaciones() {
    return this.http.request('GET', 'https://j3o3czta78.execute-api.us-east-1.amazonaws.com/scores')
  }
}
