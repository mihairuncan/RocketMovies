import { Component, OnInit } from '@angular/core';
import { MovieDetail } from '../../model/movie/movieDetail';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/service/movie.service';
import { environment } from 'src/environments/environment';
import { Comment } from '../../model/comment/comment';
import { CommentService } from '../../service/comment.service';

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
  public addCommentMode: boolean = false;
  public updateCommentMode: boolean = false;
  public currentComment: Comment;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private movieService: MovieService,
    private commentService: CommentService
  ) { }

  getMovieDetails(): void {
    this.http.get<MovieDetail>(this.GET_DETAILS_URL + `${this.movieId}`)
      .subscribe(movie => this.currentMovie = movie);
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
  }

  commentFormToggle() {
    this.updateCommentMode = false;
    this.addCommentMode = !this.addCommentMode;
  }

  updateCommentFormToggle(comment) {
    //console.log(comment);
    this.currentComment = comment;
    this.addCommentMode = false;
    this.updateCommentMode = !this.updateCommentMode;
  }

  deleteComment(commentId) {
    console.log(commentId);
    if (confirm('Are you sure you want to delete the comment with id ' + commentId + '?')) {
      this.commentService.deleteComment(commentId, this.currentMovie.id)
        .subscribe
        (
          result => {
            alert('Comment successfully deleted!');
          },
          error => alert('Cannot delete comment')
        )
    }
  }

  ngOnInit() {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.getMovieDetails();
  }

}
