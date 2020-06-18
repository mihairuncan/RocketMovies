import { Component, OnInit, OnDestroy } from '@angular/core';

import { Movie } from 'src/app/model/movie/movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit, OnDestroy {

  public label = 'Add';
  public movie = new Movie();

  constructor(private router: Router) { }

  ngOnInit() {
    document.body.classList.add('list-bg');
  }

  reloadData(action: any) {
    this.router.navigate(['movies']);
  }

  ngOnDestroy() {
    document.body.classList.remove('list-bg');
  }

}
