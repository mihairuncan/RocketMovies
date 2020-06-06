import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Comment } from '../../model/comment/comment';
import { CommentService } from '../../service/comment.service';
import { MovieDetail } from '../../model/movie/movieDetail';

@Component({
  selector: 'app-update-comments',
  templateUrl: './update-comments.component.html',
  styleUrls: ['./update-comments.component.css']
})

export class UpdateCommentsComponent implements OnInit {
  @Input() comment: Comment;
  @Input() currentMovie: MovieDetail;
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
      id: new FormControl(this.comment.id),
      commentText: new FormControl(this.comment.commentText),
      addedOn: new FormControl(this.comment.addedOn)
    });
  }

  save() {
    console.log(this.updateCommentForm.value);
    console.log("save");
    this.commentService.updateComment(this.updateCommentForm.value, this.currentMovie.id)
      .subscribe(_ => {
        this.initializeUpdateCommentData();
        console.log("in the save sub");
      },
      err => this.errorMessages = err.error.errors,
      () => console.log('Comment save complete'));
  }
}
