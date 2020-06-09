import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CommentForPost } from '../../model/comment/comment';
import { CommentService } from '../../service/comment.service';
import { MovieDetail } from '../../model/movie/movieDetail';
import { AuthService } from '../../service/auth.service';
import { AlertifyService } from '../../service/alertify.service';

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

  updateCommentForm: FormGroup = new FormGroup({
   commentText: new FormControl('')
 });

  constructor(private commentService: CommentService,
    private authService: AuthService,
    private alertify: AlertifyService,
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
      err => {
        this.alertify.error(err);
      });
  }

  cancel() {
    this.onClose.emit();
  }
}

