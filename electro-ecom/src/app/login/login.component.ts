import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AppApiService } from '../app-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: AppApiService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/
          ),
        ],
      ],
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const formData = this.loginForm.value;
    console.log('Form Data:', formData);
    this.api.login(formData).subscribe({
      next: (response: any) => {
        this.loginForm.reset();
        localStorage.setItem('accessToken', response.token);
        localStorage.setItem('role', response.role);
        if (response.role === 'Admin') {
          this.router.navigateByUrl('/admin/home');
        } else if (response.role === 'User') {
          this.router.navigateByUrl('/user/home');
        }
      },
      error: (error) => {
        Swal.fire({
          title: 'Error!',
          text: error.error.message || 'Login failed. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      },
    });
  }
}
