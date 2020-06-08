import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentForPost } from '../model/comment/comment';
import { environment } from 'src/environments/environment';
import { Comment } from '../model/comment/commentForApproval';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  addComment(movieId: number, comment: CommentForPost): Observable<CommentForPost> {
    return this.http.post<CommentForPost>(`${this.baseUrl}/api/movies/${movieId}/comments`, comment);
  }

  deleteComment(commentId: number): Observable<CommentForPost> {
    return this.http.delete<CommentForPost>(`${this.baseUrl}/api/comments/${commentId}`);
  }

  updateComment(comment: CommentForPost, commentId: number): Observable<CommentForPost> {
    return this.http.put<CommentForPost>(`${this.baseUrl}/api/comments/${commentId}`, comment);
  }

  getCommentsForApproval(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.baseUrl + '/api/comments');
  }

  approveComment(commentId: number) {
    return this.http.post(this.baseUrl + '/api/comments/approve/' + commentId, {});
  }

  rejectComment(commentId: number) {
    return this.http.post(this.baseUrl + '/api/comments/reject/' + commentId, {});
  }
}
