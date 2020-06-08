import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../../model/comment/comment';
import { CommentService } from '../../service/comment.service';
import { MovieDetail } from '../../model/movie/movieDetail';
import { AuthService } from '../../service/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})

export class AddCommentComponent {

  @Output() public onSubmit: EventEmitter<any> = new EventEmitter<any>();
  
  date: string;
  private errorMessages = [];
  @Input() currentMovie: MovieDetail;
  addCommentForm: FormGroup = new FormGroup({
    commentText: new FormControl(''),
    addedOn: new FormControl(new Date())
  });

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private commentService: CommentService,
    private authService: AuthService)
  {
    this.date = new Date().toISOString().slice(0, 16);
  }

  save() {
    let newComment = this.addCommentForm.value as Comment;
  
    this.commentService.addComment(this.currentMovie.id, newComment)
      .subscribe(
        () =>
        {
          this.onSubmit.emit();
          console.log("comment added!");
        },
        err => this.errorMessages = err.error.errors);
  }
  cancel() {
    console.log("cancel");
    this.router.navigateByUrl('/movies');
  }

}
