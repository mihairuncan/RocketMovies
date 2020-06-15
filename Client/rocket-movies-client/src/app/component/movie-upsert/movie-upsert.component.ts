import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Movie } from 'src/app/model/movie/movie';
import { MovieService } from 'src/app/service/movie.service';
import { AlertifyService } from 'src/app/service/alertify.service';

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

  constructor(private movieService: MovieService, private alertify: AlertifyService) { }

  ngOnInit() {

    this.initializeFormControls();
  }

  initializeFormControls() {
    this.movieForm = new FormGroup(
      {
        "title": new FormControl(this.selectedMovie.title, Validators.required),
        "year": new FormControl(this.selectedMovie.year, [Validators.required, Validators.min(1900)]),
        "plotSummary": new FormControl(this.selectedMovie.plotSummary, Validators.required),
        "grossTakingsAmount": new FormControl(this.selectedMovie.grossTakingsAmount),
        "isAvailableOnDVD": new FormControl(this.selectedMovie.isAvailableOnDVD),
        "genre": new FormControl(this.selectedMovie.genre, Validators.required),
        "pictureURL": new FormControl(this.selectedMovie.pictureURL, [Validators.required, Validators.pattern(/(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/)])
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
            this.alertify.success("Movie successfully added");
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
            this.alertify.success("Movie successfully updated");
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
