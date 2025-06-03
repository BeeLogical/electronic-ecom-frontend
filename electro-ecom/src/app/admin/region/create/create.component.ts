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
  regionForm: FormGroup;
  constructor(private fb: FormBuilder, private api: AppApiService) {
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
          alert('Region created successfully');
          this.regionForm.reset();
        },
        error: (err) => {
          console.error('Error creating region', err);
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
