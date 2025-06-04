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
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';
interface Region {
  id: number;
  name: string;
}
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
  productForm: FormGroup;
  regions: Region[] = [];
  selectedFileName: string | null = null;
  constructor(
    private fb: FormBuilder,
    private api: AppApiService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      region: ['', [Validators.required]],
      image: [
        null,
        [Validators.required, fileTypeValidator(['image/png', 'image/jpeg'])],
      ],
    });
  }
  ngOnInit() {
    this.api.getRegions().subscribe({
      next: (res: any) => {
        this.regions = res;
      },
      error: (err) => {
        console.error('Error fetching regions', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load regions. Please try again later.',
          confirmButtonText: 'OK',
        });
      },
    });
  }
  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    if (this.productForm.valid) {
      const formData = new FormData();

      Object.keys(this.productForm.controls).forEach((key) => {
        if (key !== 'region') {
          const value = this.productForm.get(key)?.value;
          formData.append(key, value);
        }
        if (key === 'region') {
          const value = this.productForm.get(key)?.value;

          value.forEach((element: string | Blob) => {
            formData.append('region', element);
          });
        }
      });
      console.log('Form Data:', formData);
      this.api.createProduct(formData).subscribe({
        next: (res) => {
          console.log('Product created successfully', res);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Product created successfully!',
            confirmButtonText: 'OK',
          });
          this.productForm.reset();
          this.selectedFileName = null;
          this.router.navigate(['/admin/product-list']);
        },
        error: (err) => {
          console.error('Error creating product', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to create product. Please try again later.',
            confirmButtonText: 'OK',
          });
        },
      });
    } else {
      console.error('Form is invalid');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill out all required fields correctly.',
        confirmButtonText: 'OK',
      });
    }
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.productForm.patchValue({
        image: file,
      });

      const control = this.productForm.get('image');
      control?.markAsTouched();
      control?.updateValueAndValidity();
    }
  }
}
function fileTypeValidator(allowedTypes: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const file = control.value;

    if (!file) return null;

    const isValidType = allowedTypes.includes(file.type);
    return isValidType ? null : { invalidFileType: true };
  };
}
