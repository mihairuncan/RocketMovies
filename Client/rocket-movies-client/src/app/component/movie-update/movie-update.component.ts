import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MovieService } from 'src/app/service/movie.service';
import { Router } from '@angular/router';
import { Movie } from 'src/app/model/movie/movie';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movie-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.css']
})
export class MovieUpdateComponent implements OnInit {

  @Input() public movie: Movie;
  @Output() public onSubmit: EventEmitter<Movie> = new EventEmitter<Movie>();

  public titleFormControl: FormControl;
  public yearFormControl: FormControl;
  public plotSummaryFormControl: FormControl;
  public takingsAmountFormControl: FormControl;
  public availableOnDvdFormControl: FormControl;
  public genreFormControl: FormControl;
  public pictureUrlFormControl: FormControl;
  public addMovieForm: FormGroup;

  public waitingEventHandling: boolean;

  constructor(
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initializeFormControls();
  }

  initializeFormControls() {
    this.titleFormControl = new FormControl(this.movie.title);
    this.yearFormControl = new FormControl(this.movie.year);
    this.plotSummaryFormControl = new FormControl(this.movie.plotSummary);
    this.takingsAmountFormControl = new FormControl(this.movie.grossTakingsAmount);
    this.availableOnDvdFormControl = new FormControl(this.movie.isAvailableOnDVD);
    this.genreFormControl = new FormControl(this.movie.genre);
    this.pictureUrlFormControl = new FormControl(this.movie.pictureURL);
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

}
