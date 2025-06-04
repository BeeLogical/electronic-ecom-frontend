import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AppApiService } from '../app-api.service';
import { RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: AppApiService,
    private router: Router
  ) {
    this.signupForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
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
        confirm_password: ['', [Validators.required]],
      },
      {
        validator: this.matchPasswords('password', 'confirm_password'),
      }
    );
  }
  matchPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get(passwordKey)?.value;
      const confirmPassword = group.get(confirmPasswordKey)?.value;

      if (password !== confirmPassword) {
        group.get(confirmPasswordKey)?.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        const errors = group.get(confirmPasswordKey)?.errors;
        if (errors) {
          delete errors['passwordMismatch'];
          if (Object.keys(errors).length === 0) {
            group.get(confirmPasswordKey)?.setErrors(null);
          }
        }
        return null;
      }
    };
  }

  onSubmit() {
    if (!this.signupForm.valid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    const formData = this.signupForm.value;
    formData.id = 0;
    formData.status = 'active';
    formData.role = 'User';
    const payload = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      id: formData.id,
      status: formData.status,
      role: formData.role,
    };

    this.api.signup(payload).subscribe({
      next: (response) => {
        this.signupForm.reset();
        Swal.fire({
          title: 'Success!',
          text: 'Registration successful. Please log in.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          this.router.navigateByUrl('/login');
        });
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
