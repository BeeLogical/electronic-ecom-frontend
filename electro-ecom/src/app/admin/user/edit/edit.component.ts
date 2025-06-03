import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AppApiService } from '../../../app-api.service';
import { HeaderComponent } from '../../header/header.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
interface Role {
  id: number;
  name: string;
}

@Component({
  selector: 'app-edit',
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
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  editUserForm: FormGroup;
  roles: Role[] = [];
  constructor(
    private fb: FormBuilder,
    private api: AppApiService,
    private route: ActivatedRoute
  ) {
    this.editUserForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email],
      ],
      phone: ['', [Validators.required]],
      role: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }
  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    this.api.getRoles().subscribe({
      next: (res: any) => {
        this.roles = res;
      },
      error: (err) => {
        console.error('Error fetching roles', err);
      },
    });
    if (userId) {
      this.api.getUserById(userId).subscribe({
        next: (user: any) => {
          this.editUserForm.patchValue({
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            status: user.status,
          });
        },
        error: (err) => {
          console.error('Error fetching user', err);
        },
      });
    }
  }
  onSubmit() {
    if (this.editUserForm.invalid) {
      this.editUserForm.markAllAsTouched();
      return;
    }

    const userId = this.route.snapshot.paramMap.get('id');
    if (!userId) {
      console.error('User ID is missing');
      return;
    }
    const formData = new FormData();

    Object.keys(this.editUserForm.controls).forEach((key) => {
      const value = this.editUserForm.get(key)?.value;
      formData.append(key, value);
    });
    formData.append('id', userId);
    this.api.updateUser(userId, formData).subscribe({
      next: (res) => {
        alert('User updated successfully');
      },
      error: (err) => {
        console.error('Error updating user', err);
      },
    });
  }
}
