import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CommentForPost } from '../../model/comment/comment';
import { CommentService } from '../../service/comment.service';
import { MovieDetail } from '../../model/movie/movieDetail';

@Component({
  selector: 'app-update-comments',
  templateUrl: './update-comments.component.html',
  styleUrls: ['./update-comments.component.css']
})

export class UpdateCommentsComponent implements OnInit {
  @Input() comment: any;
  @Input() currentMovie: MovieDetail;
  @Output() public onSubmit: EventEmitter<any> = new EventEmitter<any>();
  private errorMessages = [];

  updateCommentForm: FormGroup = new FormGroup({
   commentText: new FormControl(''),
   addedOn: new FormControl('')
 });

  constructor(private commentService: CommentService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeUpdateCommentData();
  }
  

  initializeUpdateCommentData() {
    this.updateCommentForm = this.fb.group({
      Id: new FormControl(this.comment.commentId),
      commentText: new FormControl(this.comment.commentText),
      addedOn: new FormControl(this.comment.addedOn)
    });
  }

  save() {
    this.commentService.updateComment(this.updateCommentForm.value, this.currentMovie.id, this.comment.id)
      .subscribe(_ => {
        this.initializeUpdateCommentData();
        this.onSubmit.emit();
      },
        err => this.errorMessages = err.error.errors);
  }
}
