import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChangePassword } from '../models/auth/change-password.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent {

  changePwdForm: FormGroup = this.formBuilder.group({
    currentPwd: ['', Validators.required],
    newPwd: ['', Validators.required],
    repeatNewPwd: ['', Validators.required]
  });

  isLoading = false;
  isSubmitted = false;
  error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router) {

  }

  get currentPwd() {
    return this.changePwdForm.get('currentPwd');
  }

  get newPwd() {
    return this.changePwdForm.get('newPwd');
  }

  get repeatNewPwd() {
    return this.changePwdForm.get('repeatNewPwd');
  }

  async onSubmit(): Promise<void> {
    this.isSubmitted = true;
    this.error = '';

    if (this.changePwdForm?.invalid) {
      return;
    }

    if (this.newPwd?.value !== this.repeatNewPwd?.value) {
      this.repeatNewPwd?.setErrors({ notMatch: true });
      return;
    }

    this.isLoading = true;

    const changePwd = new ChangePassword();
    changePwd.currentPassword = this.currentPwd?.value;
    changePwd.newPassword = this.newPwd?.value;
    changePwd.repeatNewPassword = this.repeatNewPwd?.value;

    const result = await this.authService.changePassword(changePwd);

    this.isLoading = false;

    if (result) {
      this.toastrService.success('Password changed', 'Brugner');
      this.changePwdForm.reset();
      this.router.navigateByUrl('/');
    } else {
      this.error = 'Something went wrong, try again'
    }
  }
}
