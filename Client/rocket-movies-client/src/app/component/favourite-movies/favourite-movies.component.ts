import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { MovieService } from '../../service/movie.service';
import { CommentService } from '../../service/comment.service';
import { AlertifyService } from '../../service/alertify.service';
import { FavouriteMovie } from '../../model/movie/favouriteMovie';

@Component({
  selector: 'app-favourite-movies',
  templateUrl: './favourite-movies.component.html',
  styleUrls: ['./favourite-movies.component.css']
})
export class FavouriteMoviesComponent implements OnInit {
  public movies: FavouriteMovie[];
  userId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private movieService: MovieService,
    private commentService: CommentService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.userId = this.authService.decodedToken.nameid;
    this.getFavouriteMovies();
  }
  getFavouriteMovies() {
    this.authService.getFavouriteMovies(this.userId).subscribe(res => {
      this.movies = res;
    })
  }
}
