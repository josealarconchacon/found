import {
  Component,
  OnInit,
  Inject,
  Output,
  EventEmitter,
  PLATFORM_ID,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { isPlatformBrowser } from '@angular/common';

declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  isLogin = true;

  @Output() loginSuccess = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadGoogleAuthScript();
    }
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  private loadGoogleAuthScript() {
    const gapiScript = document.createElement('script');
    gapiScript.src = 'https://apis.google.com/js/platform.js';
    gapiScript.async = true;
    gapiScript.defer = true;
    gapiScript.onload = () => this.initializeGoogleAuth();
    document.body.appendChild(gapiScript);
  }

  private initializeGoogleAuth() {
    google.accounts.id.initialize({
      client_id: '', // Use environment variables for sensitive data
      callback: this.handleCredentialResponse.bind(this),
    });

    google.accounts.id.renderButton(
      document.getElementById('googleSignInButton')!,
      { theme: 'outline', size: 'large' }
    );
  }

  private handleCredentialResponse(response: any) {
    const idToken = response.credential;
    this.authService.googleLogin(idToken).subscribe(
      (res) => {
        this.storeTokenAndRedirect(res.token);
      },
      (error) => {
        console.error('Google login error', error);
      }
    );
  }

  onSubmit() {
    if (this.isLogin) {
      this.login();
    } else {
      this.register();
    }
  }

  private login() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        this.storeTokenAndRedirect(response.token);
      },
      (error) => {
        console.error('Login error', error);
      }
    );
  }

  private register() {
    if (this.password !== this.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    this.authService
      .register(this.username, this.email, this.password)
      .subscribe(
        (response) => {
          this.storeTokenAndRedirect(response.token);
        },
        (error) => {
          console.error('Register error', error);
        }
      );
  }

  private storeTokenAndRedirect(token: string) {
    localStorage.setItem('token', token); // Consider using a secure storage solution
    this.loginSuccess.emit();
    this.router.navigate(['/main-board']);
  }

  onGoogleSignIn() {
    const auth2 = google.auth2.getAuthInstance();
    auth2.signIn().then(
      (googleUser: { getAuthResponse: () => { id_token: string } }) => {
        const idToken = googleUser.getAuthResponse().id_token;
        this.authService.googleLogin(idToken).subscribe(
          (response) => {
            this.storeTokenAndRedirect(response.token);
          },
          (error) => {
            console.error('Google login error', error);
          }
        );
      },
      (error: any) => {
        console.error('Google sign-in error', error);
      }
    );
  }
}
