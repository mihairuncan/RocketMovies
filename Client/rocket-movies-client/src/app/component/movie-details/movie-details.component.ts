import { Component, OnInit } from '@angular/core';
import { MovieDetail } from '../../model/movie/movieDetail';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  public movieId: number;
  private currentMovie: MovieDetail;
  private GET_DETAILS_URL: string = 'https://localhost:5001/api/movies/';
  public isOpen: boolean = false;
  public label: string = "Update";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private movieService: MovieService,
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

  ngOnInit() {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.getMovieDetails();
  }

}
