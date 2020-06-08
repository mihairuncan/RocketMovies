import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Movie } from '../model/movie/movie';
import { MovieDetail } from '../model/movie/movieDetail';
import { UserRating } from '../model/user/user-rating';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private backendMoviesUrl = environment.apiUrl + '/api/movies';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.backendMoviesUrl);
  }

  getMovieDetails(id: number): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(this.backendMoviesUrl + `/${id}`);
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.backendMoviesUrl, movie);
  }

  updateMovie(id: number, movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(this.backendMoviesUrl + `/${id}`, movie);
  }

  deleteMovie(id: number): Observable<Movie> {
    return this.http.delete<Movie>(this.backendMoviesUrl + `/${id}`);
  }

  sendMovieRating(movieId: number, rating: UserRating): Observable<UserRating> {
    return this.http.post<UserRating>(this.backendMoviesUrl + `/${movieId}` + '/ratings', rating);
  }
  
}
