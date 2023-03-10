import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  isLoading = false;
  isSubmitted = false;
  returnUrl: string = '';
  error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService) {
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async onSubmit(): Promise<void> {
    this.isSubmitted = true;
    this.error = '';

    if (this.loginForm?.invalid) {
      return;
    }

    this.isLoading = true;

    try {
      await this.authService.login(this.email?.value, this.password?.value);
      this.toastrService.success('Welcome!', 'Brugner');
      this.router.navigate([this.returnUrl]);
    } catch (e: any) {
      this.error = e.error.title;
    }
    finally {
      this.isLoading = false;
      this.isSubmitted = false;
    }
  }
}
