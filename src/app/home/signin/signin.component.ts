import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  fromUrl: string;
  loginForm: FormGroup;
  @ViewChild('userNameInput', { static: true } ) userNameInput: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => this.fromUrl = params.fromUrl);
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
            () => this.fromUrl
                  ? this.router.navigateByUrl(this.fromUrl)
                  : this.router.navigate(['user', userName]),
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
