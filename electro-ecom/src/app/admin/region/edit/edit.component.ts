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
  editRegionForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private api: AppApiService,
    private route: ActivatedRoute
  ) {
    this.editRegionForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }
  ngOnInit() {
    const regionId = this.route.snapshot.paramMap.get('id');

    if (regionId) {
      this.api.getRegionById(regionId).subscribe({
        next: (region: any) => {
          this.editRegionForm.patchValue({
            name: region.name,
          });
        },
        error: (err) => {
          console.error('Error fetching region', err);
        },
      });
    }
  }
  onSubmit() {
    if (this.editRegionForm.invalid) {
      this.editRegionForm.markAllAsTouched();
      return;
    }

    const regionId = this.route.snapshot.paramMap.get('id');
    if (!regionId) {
      console.error('Region ID is missing');
      return;
    }
    const formData = new FormData();

    Object.keys(this.editRegionForm.controls).forEach((key) => {
      const value = this.editRegionForm.get(key)?.value;
      formData.append(key, value);
    });
    formData.append('id', regionId);
    this.api.updateRegions(regionId, formData).subscribe({
      next: (res) => {
        alert('Region updated successfully');
      },
      error: (err) => {
        console.error('Error updating region', err);
      },
    });
  }
}
