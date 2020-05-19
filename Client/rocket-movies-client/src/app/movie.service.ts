import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }

  getMovies(): Observable<Movie[]> {
    let sampleData : Movie[];

    let sampleMovie: Movie = {
      id: 1,
      title: "Star Wars: The Empire Strikes Back",
      year: 1980,
      plotSummary: "Darth Vader is adamant about turning Luke Skywalker to the dark side. Master Yoda trains Luke to become a Jedi Knight.",
      grossTakingsAmount: 547900000,
      isAvailableOnDVD: true,
      genre: "Sci-Fi",
      rating: 4.9,
      pictureURL: "https://www.bristolfilmfestival.com/wp-content/uploads/2019/05/Empire-Strikes-Back-Hi-Res-One-sheet.jpg"
    }

    sampleData.push(sampleMovie)
    return of(sampleData);
  }
}
