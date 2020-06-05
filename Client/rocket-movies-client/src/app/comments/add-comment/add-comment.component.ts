import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MovieService } from '../../service/movie.service';
import { Comment } from '../../model/comment/comment';
@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  addCommentForm: FormGroup;
  private errorMessages = [];

  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeFormData();
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

  }
  cancel() {
    console.log("cancel");
    this.router.navigateByUrl('/movies');
  }
}
