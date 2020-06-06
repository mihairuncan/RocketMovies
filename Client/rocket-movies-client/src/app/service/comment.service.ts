import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../model/comment/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = 'https://localhost:5001/';
  constructor(
    private httpClient: HttpClient) { }

  addComment(movieId: number, comment: Comment): Observable<Comment> {
    console.log(`${this.baseUrl}api/movies/${movieId}/comments`);
    return this.httpClient.post<Comment>(`${this.baseUrl}api/movies/${movieId}/comments`, comment);
  }

  deleteComment(id: number, movieId:number): Observable<Comment> {
    return this.httpClient.delete<Comment>(`${this.baseUrl}api/movies/${movieId}/comments/${id}`);
  }

  updateComment(comment: Comment, movieId: number): Observable<Comment> {
    return this.httpClient
      .put<Comment>(`${this.baseUrl}api/movies/${movieId}/comments/${comment.id}`, comment);
  }
}
