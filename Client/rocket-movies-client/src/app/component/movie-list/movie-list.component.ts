import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Movie } from '../../model/movie/movie';
import { MovieService } from '../../service/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  public isOpen: boolean = false;
  public label: string;
  public movie: Movie;
  public id: number;
  public allMovies: Movie[] = [];

  constructor(
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.movieService.getMovies().subscribe(
      movies => {
        this.allMovies = movies;
      }
    );
  }

  initializeAddMovie() {
    this.isOpen = true;
    this.label = "Add";
    this.movie = new Movie();
  }

  initializeUpdateMovie() {
    this.isOpen = true;
    this.label = "Update";
    this.movie = this.getMovieById(this.id);
  }

  initializeDeleteMovie() {
    this.movieService.deleteMovie(this.id).subscribe(
      _ => {
        this.reloadData("Delete");
      },
      error => {
        alert(error);
      }
    );
  }

  reloadData(action: any) {
    this.id = undefined;
    this.isOpen = false;
    if (action !== "Cancel") {
      this.getMovies();
    }
  }

  openMovieDetails(movie: Movie) {
    console.log(movie);
  }

  getMovieById(id: number) {
    return this.allMovies.find(movie => movie.id == id);
  }

}
