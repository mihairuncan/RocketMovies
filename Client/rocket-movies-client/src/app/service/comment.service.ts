import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Comment } from '../model/comment/commentForApproval';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

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
