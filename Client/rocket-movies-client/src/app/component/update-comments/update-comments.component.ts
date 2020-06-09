import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CommentForPost } from '../../model/comment/comment';
import { CommentService } from '../../service/comment.service';
import { MovieDetail } from '../../model/movie/movieDetail';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-update-comments',
  templateUrl: './update-comments.component.html',
  styleUrls: ['./update-comments.component.css']
})

export class UpdateCommentsComponent implements OnInit {
  @Input() comment: any;
  @Input() currentMovie: MovieDetail;
  @Output() public onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onClose: EventEmitter<any> = new EventEmitter<any>();
  private errorMessages = [];

  updateCommentForm: FormGroup = new FormGroup({
   commentText: new FormControl('')
 });

  constructor(private commentService: CommentService, private authService: AuthService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeUpdateCommentData();
    console.log(this.comment);
  }
  

  initializeUpdateCommentData() {
    this.updateCommentForm = this.fb.group({
      id: [this.comment.commentId],
      commentText: new FormControl(this.comment.commentText)
    });
  }

  save() {
    this.commentService.updateComment(this.updateCommentForm.value, this.comment.commentId)
      .subscribe(_ => {
        this.initializeUpdateCommentData();
        this.onSubmit.emit();
      },
       err => this.errorMessages = err.error.errors);
  }

  cancel() {
    this.onClose.emit();
  }
}

