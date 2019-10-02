import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken-validator.service';
import { NewUser } from './new-user';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [ UserNotTakenValidatorService ]
})
export class SignupComponent implements OnInit {

  private signupForm: FormGroup;
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private signupService: SignupService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      fullName: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40)
        ]
      ],
      userName: ['',
        [
          Validators.required,
          lowerCaseValidator,
          Validators.minLength(2),
          Validators.maxLength(30)
        ],
        this.userNotTakenValidatorService.chekUserNameTaken()
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(14)
        ]
      ]
    });
    // tslint:disable-next-line: no-unused-expression
    this.platformDetectorService.isPlatformBrowser() &&
      this.emailInput.nativeElement.focus();
  }

  signup() {
    const newUser = this.signupForm.getRawValue() as NewUser;
    this.signupService.signup(newUser)
      .subscribe(() => {
        alert('Usuario cadastrado com sucesso!');
        this.router.navigate(['']);
      },
      err => {
        // tslint:disable-next-line: no-unused-expression
        this.platformDetectorService.isPlatformBrowser() &&
          this.emailInput.nativeElement.focus();
        console.log(err.message);
      });
  }

}
