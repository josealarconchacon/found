import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

declare var gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: 'YOUR_GOOGLE_CLIENT_ID',
      });
    });
  }

  onGoogleSignIn() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2
      .signIn()
      .then(
        (googleUser: {
          getAuthResponse: () => { (): any; new (): any; id_token: any };
        }) => {
          const idToken = googleUser.getAuthResponse().id_token;
          this.authService.googleLogin(idToken).subscribe(
            (response) => {
              localStorage.setItem('token', response.token);
              this.router.navigate(['/dashboard']);
            },
            (error) => {
              console.error('Google login error', error);
            }
          );
        }
      );
  }

  onSubmit() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          // Handle successful login (store token, navigate, etc.)
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Login error', error);
        }
      );
    } else {
      console.error('Email and password are required');
    }
  }
}
