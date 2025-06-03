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
  editRoleForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private api: AppApiService,
    private route: ActivatedRoute
  ) {
    this.editRoleForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }
  ngOnInit() {
    const roleId = this.route.snapshot.paramMap.get('id');

    if (roleId) {
      this.api.getRoleById(roleId).subscribe({
        next: (role: any) => {
          this.editRoleForm.patchValue({
            name: role.name,
          });
        },
        error: (err) => {
          console.error('Error fetching role', err);
        },
      });
    }
  }
  onSubmit() {
    if (this.editRoleForm.invalid) {
      this.editRoleForm.markAllAsTouched();
      return;
    }

    const roleId = this.route.snapshot.paramMap.get('id');
    if (!roleId) {
      console.error('Role ID is missing');
      return;
    }
    const formData = new FormData();

    Object.keys(this.editRoleForm.controls).forEach((key) => {
      const value = this.editRoleForm.get(key)?.value;
      formData.append(key, value);
    });
    formData.append('id', roleId);
    this.api.updateRoles(roleId, formData).subscribe({
      next: (res) => {
        alert('Role updated successfully');
      },
      error: (err) => {
        console.error('Error updating role', err);
      },
    });
  }
}
