import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../model/comment/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private httpClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) { }

  save(movieId, comment: Comment): Observable<Comment> {
    return this.httpClient
      .post<Comment>(`${this.baseUrl}api/movies/${movieId}/comments`, comment);
  }


}
