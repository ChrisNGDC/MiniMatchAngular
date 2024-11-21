import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './AuthService';

@Injectable({
  providedIn: 'root',
})
export class PuntuacionesService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  async getPuntuaciones() {
    return this.http.request(
      'GET',
      'https://j3o3czta78.execute-api.us-east-1.amazonaws.com/scores'
    );
  }

  async savePuntuacion(game: any, score: any) {
    this.auth.getCurrentUser().then((user) => {
      this.auth.getCurrentUserFullName().then((username) => {
        console.log(user);
        if (user) {
          const options = {
            headers: new HttpHeaders().set('Access-Control-Allow-Origin:', '*')
          };
          const body = {
            username: username,
            score: score,
            id: user.userId,
          };
          this.http.post('https://j3o3czta78.execute-api.us-east-1.amazonaws.com/scores/' + game, body, options)
            .subscribe({
              next: (response) => {
                console.log(response);
              },
              error: (error) => {
                console.error(error);
              },
            });
        }
      });
    });
  }
}
