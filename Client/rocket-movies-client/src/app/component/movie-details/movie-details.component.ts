import { Component, OnInit } from '@angular/core';
import { MovieDetail } from '../../model/movie/movieDetail';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/service/movie.service';
import { environment } from 'src/environments/environment';

import { CommentForPost } from '../../model/comment/comment';
import { CommentService } from '../../service/comment.service';
import { AuthService } from 'src/app/service/auth.service';
import { AlertifyService } from '../../service/alertify.service';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  public movieId: number;
  private currentMovie: MovieDetail;
  private GET_DETAILS_URL: string = environment.apiUrl + '/api/movies/';
  public isOpen: boolean = false;
  public label: string = "Update";
  public currentUserRole: string;

  public addCommentMode: boolean = false;
  public updateCommentMode: boolean = false;
  public currentComment: CommentForPost;
  public isUserLoggedIn: boolean = false;
  public loggedUser: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private movieService: MovieService,
    private commentService: CommentService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  getMovieDetails(): void {
    this.http.get<MovieDetail>(this.GET_DETAILS_URL + `${this.movieId}`)
      .subscribe(movie => 
        this.currentMovie = movie
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

  initializeUpdateMovie(): void {
    if (this.isOpen == false) {
      this.isOpen = true
    } else {
      this.isOpen = false;
    }
  }

  reloadData(action: any): void {
    this.getMovieDetails();
    this.updateCommentMode = false;
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
    console.log(commentId);
    this.alertify.confirm('Are you sure you want to delete this comment?', () => {
      this.commentService.deleteComment(commentId)
        .subscribe
        (
          result => {
            this.alertify.success("Comment successfully deleted!");
            this.getMovieDetails();

          },
          error => this.alertify.error(error)
        )
    });
  }

  ngOnInit() {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.getMovieDetails();

    this.isUserLoggedIn = this.authService.isLoggedIn();
    if (this.isUserLoggedIn) {
      this.loggedUser = this.authService.decodedToken.unique_name
    }
    this.currentUserRole = this.authService.getUserRole();
  }
}
