import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../../model/comment/comment';
import { CommentService } from '../../service/comment.service';
import { MovieDetail } from '../../model/movie/movieDetail';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})

export class AddCommentComponent implements OnInit {

  addCommentForm: FormGroup;
  private errorMessages = [];
  @Input() currentMovie: MovieDetail;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private commentService: CommentService,
    private authService: AuthService) { }

  ngOnInit() {
    this.initializeFormData();
    console.log(this.currentMovie.id);
  }

  initializeFormData() {
    this.addCommentForm = this.fb.group({
      commentText: [''],
      addedOn: ['']
    });
  }

  save() {
    this.addCommentForm.patchValue({
      addedOn: new Date(),
    });
   
    console.log(this.addCommentForm.value);
    this.commentService.addComment(this.currentMovie.id, this.addCommentForm.value)
      .subscribe(
        () =>
        {
          console.log("comment added!");
        },
        err => this.errorMessages = err.error.errors);
  }
  cancel() {
    console.log("cancel");
    this.router.navigateByUrl('/movies');
  }
}
