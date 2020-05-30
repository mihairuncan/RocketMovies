import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Movie } from 'src/app/model/movie/movie';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movie-upsert',
  templateUrl: './movie-upsert.component.html',
  styleUrls: ['./movie-upsert.component.css']
})
export class MovieUpsertComponent implements OnInit {

  @Input() public submitLabel: string;
  @Input() public selectedMovie: Movie;
  @Output() public onSubmit: EventEmitter<any> = new EventEmitter<any>();

  public movieForm: FormGroup;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.initializeFormControls();
  }

  initializeFormControls() {
    this.movieForm = new FormGroup(
      {
        "title": new FormControl(this.selectedMovie.title),
        "year": new FormControl(this.selectedMovie.year),
        "plotSummary": new FormControl(this.selectedMovie.plotSummary),
        "grossTakingsAmount": new FormControl(this.selectedMovie.grossTakingsAmount),
        "isAvailableOnDVD": new FormControl(this.selectedMovie.isAvailableOnDVD),
        "genre": new FormControl(this.selectedMovie.genre),
        "pictureURL": new FormControl(this.selectedMovie.pictureURL)
      }
    );
    this.movieForm.updateValueAndValidity();
  }

  submitMovieData() {
    try {
      const movie = this.movieForm.value as Movie;
      movie.id = this.selectedMovie.id;

      if (this.submitLabel === "Add") {
        this.movieService.addMovie(movie).subscribe(
          _ => {
            this.onSubmit.emit(this.submitLabel);
          },
          error => {
            alert(error);
          }
        );
      }
      else {
        this.movieService.updateMovie(movie.id, movie).subscribe(
          _ => {
            this.onSubmit.emit(this.submitLabel);
          },
          error => {
            alert(error);
          }
        );
      }
    } catch(e) {
      alert(e.message);
    }
  }

  redirectToViewMovies() {
    this.onSubmit.emit("Cancel");
  }

}
