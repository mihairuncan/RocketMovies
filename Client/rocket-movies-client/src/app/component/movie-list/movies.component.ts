import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../service/movie.service';
import { Movie } from '../../model/movie/movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movie[] = [];

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
  };

  constructor(
    private movieService: MovieService,
    private router: Router
  ) { }

  getMovies() {
    // this.movieService.getMovies().subscribe(
    //   movies => {
    //     this.movies = movies; 
    //     console.log("COMPONENT: ", this.movies)
    //   }
    // );
    this.movies.push(this.movie);
  }

  addMovie() {
    this.router.navigate(['movies/new']);
  }

  ngOnInit() {
    this.getMovies();
  }

}
