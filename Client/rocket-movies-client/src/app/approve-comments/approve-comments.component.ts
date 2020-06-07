import { Component, OnInit } from '@angular/core';
import { Comment } from '../model/comment/commentForApproval';
import { CommentService } from '../service/comment.service';
import { AlertifyService } from '../service/alertify.service';

@Component({
  selector: 'app-approve-comments',
  templateUrl: './approve-comments.component.html',
  styleUrls: ['./approve-comments.component.css']
})
export class ApproveCommentsComponent implements OnInit {
  comments: Comment[];

  constructor(
    private commentService: CommentService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.commentService.getCommentsForApproval().subscribe(comments => {
      this.comments = comments;
    }, error => {
      this.alertify.error(error);
    });
  }

  approveComment(commentId: number) {
    this.commentService.approveComment(commentId).subscribe(() => {
      this.comments.splice(this.comments.findIndex(c => c.id === commentId), 1);
      this.alertify.success('Comment approved');
    }, error => {
      this.alertify.error(error);
    });
  }

  rejectComment(commentId: number) {
    this.commentService.rejectComment(commentId).subscribe(() => {
      this.comments.splice(this.comments.findIndex(c => c.id === commentId), 1);
      this.alertify.success('Comment rejected');
    }, error => {
      this.alertify.error(error);
    });
  }

}
