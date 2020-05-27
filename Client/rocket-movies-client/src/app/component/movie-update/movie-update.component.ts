import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Movie } from 'src/app/model/movie/movie';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movie-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.css']
})
export class MovieUpdateComponent implements OnInit {

  @Input() public submitLabel: string;
  @Input() public selectedMovie: Movie;
  @Output() public onSubmit: EventEmitter<any> = new EventEmitter<any>();

  public updateMovieForm: FormGroup;
  public waitingEventHandling: boolean;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.initializeFormControls();
  }

  initializeFormControls() {
    this.updateMovieForm = new FormGroup(
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
    this.updateMovieForm.updateValueAndValidity();
  }

  submitMovieData() {
    try {
      const movie = this.updateMovieForm.value as Movie;
      movie.id = this.selectedMovie.id;
      this.waitingEventHandling = true;

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
      this.waitingEventHandling = false;
    }
  }

  redirectToViewMovies() {
    this.onSubmit.emit("Cancel");
  }

}
