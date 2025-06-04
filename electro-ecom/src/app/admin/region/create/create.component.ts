import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppApiService } from '../../../app-api.service';
import { HeaderComponent } from '../../header/header.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    MatSelectModule,
  ],
  standalone: true,
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent implements OnInit {
  regionForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private api: AppApiService,
    private router: Router
  ) {
    this.regionForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }
  ngOnInit() {}
  onSubmit() {
    if (this.regionForm.invalid) {
      this.regionForm.markAllAsTouched();
      return;
    }
    if (this.regionForm.valid) {
      const formData = new FormData();

      Object.keys(this.regionForm.controls).forEach((key) => {
        const value = this.regionForm.get(key)?.value;
        formData.append(key, value);
      });
      this.api.createRegion(formData).subscribe({
        next: (res) => {
          this.regionForm.reset();
          Swal.fire({
            title: 'Success',
            text: 'Region created successfully',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            this.router.navigate(['/admin/region-list']);
          });
        },
        error: (err) => {
          console.error('Error creating region', err);
          Swal.fire({
            title: 'Error',
            text: 'Failed to create region. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        },
      });
    } else {
      console.error('Form is invalid');
      Swal.fire({
        title: 'Error',
        text: 'Please fill in all required fields.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }
}
