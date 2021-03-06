import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommentForPost } from '../../model/comment/comment';
import { CommentService } from '../../service/comment.service';
import { MovieDetail } from '../../model/movie/movieDetail';
import { AuthService } from '../../service/auth.service';
import { environment } from '../../../environments/environment';
import { AlertifyService } from '../../service/alertify.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})

export class AddCommentComponent {

  @Output() public onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onClose: EventEmitter<any> = new EventEmitter<any>();

  @Input() currentMovie: MovieDetail;

  addCommentForm: FormGroup = new FormGroup({
    commentText: new FormControl('')
  });

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private commentService: CommentService,
    private authService: AuthService,
    private alertify: AlertifyService) {
  }

  save() {
    const newComment = this.addCommentForm.value as CommentForPost;
    this.commentService.addComment(this.currentMovie.id, newComment)
      .subscribe(
        () => {
          this.alertify.success('Comment waiting for approval!');
          this.onSubmit.emit();
        },
        err => {
          this.alertify.error(err);
        });
  }

  cancel() {
    this.onClose.emit();
  }
}
