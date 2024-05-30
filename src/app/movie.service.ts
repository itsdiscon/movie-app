import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '9b02cb77934f58b549e1ece9dcd567ca';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  getMovies(page: number = 1, query: string = ''): Observable<any> {
    let url = `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&page=${page}`;
    if (query) {
      url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}&page=${page}`;
    }
    return this.http.get<any>(url);
  }

  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}`);
  }

  getMovieVideos(movieId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movie/${movieId}/videos?api_key=${this.apiKey}`);
  }
}
