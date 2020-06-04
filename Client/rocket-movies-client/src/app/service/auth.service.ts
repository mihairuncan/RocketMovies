import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../model/movie/movie';
import { MovieService } from './movie.service';

@Injectable()
export class AuthService {

    private registerUrl = "https://localhost:5001/api/register";
    private loginUrl = "https://localhost:5001/api/login";

    movie = {
        "id": 1,
        "title": "Star Wars: The Empire Strikes Back",
        "year": 1980,
        "plotSummary": "Darth Vader is adamant about turning Luke Skywalker to the dark side. Master Yoda trains Luke to become a Jedi Knight.",
        "grossTakingsAmount": 547900000,
        "isAvailableOnDVD": true,
        "genre": "Sci-Fi",
        "rating": 4.9,
        "pictureURL": "https://www.bristolfilmfestival.com/wp-content/uploads/2019/05/Empire-Strikes-Back-Hi-Res-One-sheet.jpg"
    }

    constructor(private http: HttpClient, private movieService: MovieService) { }

    registerUser(user) {
        return this.http.post<any>(this.registerUrl, user);
    }

    loginUser(movie: Movie) {
        return this.http.post<Movie>("https://localhost:5001/api/movies", movie);
    }

    getToken() {
        return localStorage.getItem('token');
    }
}