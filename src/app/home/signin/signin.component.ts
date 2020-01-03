import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  @ViewChild('userNameInput', { static: true } ) userNameInput: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    // tslint:disable-next-line: no-unused-expression
    this.platformDetectorService.isPlatformBrowser() &&
      this.userNameInput.nativeElement.focus();
  }

  login() {
    const userName = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;

    this.authService
        .authenticate(userName, password)
        .subscribe(
            () => this.router.navigate(['user', userName]),
            err => {
                console.log(err.message);
                this.loginForm.reset();
                // tslint:disable-next-line: no-unused-expression
                this.platformDetectorService.isPlatformBrowser() &&
                  this.userNameInput.nativeElement.focus();
                alert('Login inválido!');
            }
        );
  }
}
