import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { MovieService } from 'src/app/service/movie.service';
import { Movie } from 'src/app/model/movie/movie';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css']
})
export class MovieAddComponent implements OnInit {

  @Output() public onSubmit: EventEmitter<Movie> = new EventEmitter<Movie>();

  public titleFormControl: FormControl;
  public yearFormControl: FormControl;
  public plotSummaryFormControl: FormControl;
  public takingsAmountFormControl: FormControl;
  public availableOnDvdFormControl: FormControl;
  public genreFormControl: FormControl;
  public pictureUrlFormControl: FormControl;
  public addMovieForm: FormGroup;

  waitingEventHandling: boolean;

  constructor(
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initializeFormControls();
  }

  initializeFormControls() {
    this.titleFormControl = new FormControl('');
    this.yearFormControl = new FormControl('');
    this.plotSummaryFormControl = new FormControl('');
    this.takingsAmountFormControl = new FormControl('');
    this.availableOnDvdFormControl = new FormControl(true);
    this.genreFormControl = new FormControl('');
    this.pictureUrlFormControl = new FormControl('');
    this.addMovieForm = new FormGroup(
      {
        "title": this.titleFormControl,
        "year": this.yearFormControl,
        "plotSummary": this.plotSummaryFormControl,
        "takingsAmount": this.takingsAmountFormControl,
        "availableOnDvd": this.availableOnDvdFormControl,
        "genre": this.genreFormControl,
        "pictureUrl": this.pictureUrlFormControl
      }
    );
    this.addMovieForm.updateValueAndValidity();
  }

  submitMovie() {
    try {
      let movie = new Movie();
      movie.title = this.titleFormControl.value;
      movie.year = this.yearFormControl.value;
      movie.plotSummary = this.plotSummaryFormControl.value;
      movie.grossTakingsAmount = this.takingsAmountFormControl.value;
      movie.isAvailableOnDVD = this.availableOnDvdFormControl.value;
      movie.genre = this.genreFormControl.value;
      movie.pictureURL = this.pictureUrlFormControl.value;

      this.waitingEventHandling = true;
      this.onSubmit.emit(movie);
    } catch(e) {
      alert(e.message);
      this.waitingEventHandling = false;
    }
  }

  redirectToViewMovies() {
    this.router.navigate(['movies']);
  }

}
