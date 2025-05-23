import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private api: AppApiService) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (!this.signupForm.valid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    const formData = this.signupForm.value;
    console.log('Form Data:', formData);
    // Here you can handle the form submission, e.g., send it to a server
    // this.authService.login(formData).subscribe(
    //   (response) => {
    //     console.log('Login successful', response);
    //     // Handle successful login, e.g., redirect to another page
    //   },
    //   (error) => {
    //     console.error('Login failed', error);
    //     // Handle login error, e.g., show an error message
    //   }
    // );
  }
}
