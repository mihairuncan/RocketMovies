import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user/user';
import { AuthService } from '../service/auth.service';
import { AlertifyService } from '../service/alertify.service';
import { CustomValidators } from '../validators/custom-validators';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  public user: User;
  public errorMessage = [];
  
  public form: FormGroup;

  constructor(
    private alertify: AlertifyService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) {
    //this.form = this.formBuilder.group({
    //  id: 0,
    //  name: new FormControl(''),
    //  username: new FormControl(''),
    //  email: new FormControl(''),
    //  password: new FormControl(''),
    //  confirmedPassword: new FormControl('')
    //});
    this.form = this.createSignUpForm();
  }

  createSignUpForm(): FormGroup {
    return this.formBuilder.group({
      //name is required
      name: [null, Validators.compose([
        Validators.required,
        //check whether the name has upper case letter
        CustomValidators.patternValidator(/^[a-zA-Z]*$/, { hasOnlyLetters: true }),
        ])],
      //username is required
      username: [null, Validators.compose([Validators.required])],
      // email is required and must be a valid email email
      email: [null, Validators.compose([
        Validators.email,
        Validators.required])
      ],
      password: [null, Validators.compose([
        Validators.required,
        //check whether the entered password has numbers
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        //check whether the entered password has upper case letter
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        //check whether the entered password has a lower-case letter
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        Validators.minLength(8)])
      ],
      confirmedPassword: [null, Validators.compose([Validators.required])]
    },
        {
          // check whether our password and confirm password match
          validator: CustomValidators.passwordMatchValidator
        });
    
  }

  addUser() {
    const pswd = this.form.get('password').value;
    const confPswd = this.form.get('confirmedPassword').value;
    if (pswd === confPswd) {
      this.authService.registerUser(this.form.value).subscribe(data => {
        this.router.navigate(['/login']);
      },
        err => {
          this.alertify.error(err);
        });
    } else {
      this.alertify.error('Passwords are not the same!');
    }
  }

}

