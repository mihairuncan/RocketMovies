import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';

import { Movie } from '../model/movie/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private backendMoviesUrl = 'https://localhost:5001/api/expenses';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.backendMoviesUrl);
  }

  addMovie(movie: Movie): Observable<any> {
    return this.http.post<Movie>(this.backendMoviesUrl, movie);
  }
}
