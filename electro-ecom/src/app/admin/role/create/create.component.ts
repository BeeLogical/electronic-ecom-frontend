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
  roleForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private api: AppApiService,
    private router: Router
  ) {
    this.roleForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }
  ngOnInit() {}
  onSubmit() {
    if (this.roleForm.invalid) {
      this.roleForm.markAllAsTouched();
      return;
    }
    if (this.roleForm.valid) {
      const formData = new FormData();

      Object.keys(this.roleForm.controls).forEach((key) => {
        const value = this.roleForm.get(key)?.value;
        formData.append(key, value);
      });
      this.api.createRole(formData).subscribe({
        next: (res) => {
          this.roleForm.reset();
          Swal.fire({
            icon: 'success',
            title: 'Role Created',
            text: 'The role has been created successfully.',
            confirmButtonText: 'OK',
          }).then(() => {
            this.router.navigate(['/admin/role-list']);
          });
        },
        error: (err) => {
          console.error('Error creating role', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to create role. Please try again later.',
            confirmButtonText: 'OK',
          });
        },
      });
    } else {
      console.error('Form is invalid');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in all required fields correctly.',
        confirmButtonText: 'OK',
      });
    }
  }
}
