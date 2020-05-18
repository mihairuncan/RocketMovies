import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movie: Movie = {
    id: 1,
    title: 'Star Wars: The Empire Strikes Back',
    year: 1980,
    plotSummary: 'Darth Vader is adamant about turning Luke Skywalker to the dark side. Master Yoda trains Luke to become a Jedi Knight.',
    grossTakingsAmount: 547900000,
    isAvailableOnDVD: true,
    genre: 'Sci-Fi',
    rating: 4.9,
    pictureURL: 'https://www.bristolfilmfestival.com/wp-content/uploads/2019/05/Empire-Strikes-Back-Hi-Res-One-sheet.jpg'
  }

  constructor() { }

  ngOnInit() {
  }

}
