import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { AlertifyService } from '../service/alertify.service';
import { Router } from '@angular/router';
import { trigger, transition, state, style, animate } from '@angular/animations';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(2000)
      ])
    ])
  ]
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForgotPasswordForm();
  }

  createForgotPasswordForm() {
    this.forgotPasswordForm = this.fb.group({
      username: [''],
      email: ['']
    });
  }

  resetPassword() {
    const el = document.querySelector('.spinner');
    el.className += ' loader';
    console.log(this.forgotPasswordForm.value);
    this.authService.resetPassword(this.forgotPasswordForm.value).subscribe(() => {
      this.router.navigateByUrl('/login');
      this.alertify.success('Check your mail for the new password');
    }, error => {
      this.alertify.error(error);
    });
  }
}
