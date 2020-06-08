import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MovieDetail } from '../../model/movie/movieDetail';
import { UserRating } from 'src/app/model/user/user-rating';
import { AuthService } from 'src/app/service/auth.service';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  public isOpen: boolean = false;
  public isLoggedIn: boolean;
  public label: string = "Update";

  public userRating: UserRating = new UserRating();
  public lastRatingValue: number;
  public ratings: number[] = [1, 2, 3, 4, 5];

  private movieId: number;
  private currentMovie: MovieDetail;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private movieService: MovieService
  ) { }

  ngOnInit() {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.getDetails();
    this.lastRatingValue = parseInt(localStorage.getItem(this.movieId.toString()));
  }

  getDetails() {
    this.movieService.getMovieDetails(this.movieId).subscribe(
      movie => this.currentMovie = movie
    );
  }

  initializeDeleteMovie() {
    this.movieService.deleteMovie(this.movieId).subscribe(
      _ => {
        this.router.navigateByUrl('movies');
      },
      error => {
        alert(error);
      }
    );
  }

  initializeUpdateMovie() {
    if (this.isOpen == false) {
      this.isOpen = true
    } else {
      this.isOpen = false;
    }
  }

  reloadData(action: any) {
    this.getDetails();
  }

  sendRating(rating: number) {
    localStorage.setItem(this.movieId.toString(), rating.toString());
    this.lastRatingValue = rating;

    this.userRating.userId = parseInt(this.authService.decodedToken.nameid);
    this.userRating.movieId = this.movieId;
    this.userRating.ratingValue = rating;

    this.movieService.sendMovieRating(this.movieId, this.userRating).subscribe(
      rating => console.log("Rating successfully sent!"),
      error => console.log(error)
    );
  }

}
