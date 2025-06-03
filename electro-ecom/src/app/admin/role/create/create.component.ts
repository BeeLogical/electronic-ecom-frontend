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
  constructor(private fb: FormBuilder, private api: AppApiService) {
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
          alert('Role created successfully');
          this.roleForm.reset();
        },
        error: (err) => {
          console.error('Error creating role', err);
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
