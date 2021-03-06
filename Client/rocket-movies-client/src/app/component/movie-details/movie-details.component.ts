import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MovieDetail } from '../../model/movie/movieDetail';
import { UserRating } from 'src/app/model/user/user-rating';
import { AuthService } from 'src/app/service/auth.service';
import { MovieService } from 'src/app/service/movie.service';

import { CommentForPost } from '../../model/comment/comment';
import { CommentService } from '../../service/comment.service';
import { AlertifyService } from '../../service/alertify.service';
import { Movie } from 'src/app/model/movie/movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  public isOpen = false;
  public isLoggedIn: boolean;
  public label = 'Update';
  public currentUserRole: string;

  public addCommentMode = false;
  public updateCommentMode = false;
  public currentComment: CommentForPost;
  public isUserLoggedIn = false;
  public loggedUser: string;

  public userRating: UserRating = new UserRating();
  public lastRatingValue: number;
  public hoverIndex: number;
  public ratings: number[] = [1, 2, 3, 4, 5];
  private movieId: number;
  currentMovie: MovieDetail;

  private favouriteMovies: Movie[] = [];
  isAddToFavouriteButtonDisabled = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private movieService: MovieService,
    private commentService: CommentService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {

    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.getDetails();
    this.lastRatingValue = parseInt(localStorage.getItem(this.movieId.toString()), 10);

    this.isUserLoggedIn = this.authService.isLoggedIn();
    if (this.isUserLoggedIn) {
      this.loggedUser = this.authService.decodedToken.unique_name;
    }
    this.currentUserRole = this.authService.getUserRole();
    if (this.isUserLoggedIn) {
      this.getFavouriteMovies();
    }
  }

  getFavouriteMovies() {
    this.authService.getFavouriteMovies(this.authService.decodedToken.nameid)
      .subscribe(data => {
        this.favouriteMovies = data;

        const foundMovie = this.favouriteMovies.find(element => element.id === this.movieId);
        if (foundMovie !== undefined) {
          this.isAddToFavouriteButtonDisabled = true;
        }
      });
  }

  addToFavourites() {
    this.movieService.addMovieToFavourite(this.movieId, this.currentMovie).subscribe(res => {
      this.alertify.success('Added to your favourites!');
      this.isAddToFavouriteButtonDisabled = true;
    });
  }

  getDetails() {
    this.movieService.getMovieDetails(this.movieId).subscribe(
      movie => {
        this.currentMovie = movie;
      }
    );
  }

  initializeDeleteMovie() {
    this.alertify.confirm(
      'Are you sure you want to delete this movie?',
      () => this.movieService.deleteMovie(this.movieId).subscribe(
        _ => {
          this.alertify.success('Movie successfully deleted');
          this.router.navigateByUrl('movies');
        },
        error => {
          this.alertify.error('Movie could not be deleted');
        }
      )
    );
  }

  initializeUpdateMovie() {
    if (this.isOpen === false) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
  }

  reloadData() {
    this.updateCommentMode = false;
    this.isOpen = false;
    this.getDetails();
  }

  sendRating(rating: number) {
    localStorage.setItem(this.movieId.toString(), rating.toString());
    this.lastRatingValue = rating;

    this.userRating.userId = parseInt(this.authService.decodedToken.nameid, 10);
    this.userRating.movieId = this.movieId;
    this.userRating.ratingValue = rating;

    this.movieService.sendMovieRating(this.movieId, this.userRating).subscribe(
      _ => {
        this.alertify.success('Rating successfully submitted');
        this.getDetails();
      }
    );
  }

  commentFormToggle() {
    this.updateCommentMode = false;
    this.addCommentMode = !this.addCommentMode;
  }

  updateCommentFormToggle(comment) {
    this.currentComment = comment;
    this.addCommentMode = false;
    this.updateCommentMode = !this.updateCommentMode;
  }

  addCommentPassChild() {
    this.addCommentMode = false;
  }

  closeFormAtCancel() {
    this.addCommentMode = false;
  }

  closeUpdateFormAtCancel() {
    this.updateCommentMode = false;
  }

  deleteComment(commentId) {
    this.updateCommentMode = false;
    this.alertify.confirm('Are you sure you want to delete this comment?', () => {
      this.commentService.deleteComment(commentId)
        .subscribe
        (
          result => {
            this.alertify.success('Comment successfully deleted!');
            this.getDetails();
          },
          error => this.alertify.error(error)
        );
    });
  }

  constructEmptyArray(n: number): any[] {
    return Array(Math.round(n));
  }

  goBack() {
    this.router.navigateByUrl('/movies');
  }
}
