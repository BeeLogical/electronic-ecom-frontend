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
import Swal from 'sweetalert2';
interface Region {
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
  editProductForm: FormGroup;
  regions: Region[] = [];
  selectedFileName: string | null = null;
  imagePreviewUrl: string | null = null;
  constructor(
    private fb: FormBuilder,
    private api: AppApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editProductForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      region: ['', [Validators.required]],
      image: [null, [fileTypeValidator(['image/png', 'image/jpeg'])]],
    });
  }
  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
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
    if (productId) {
      this.api.getProductById(productId).subscribe({
        next: (product: any) => {
          this.editProductForm.patchValue({
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            region: product.regionId,
          });
          this.imagePreviewUrl = product.imagePath || null;
        },
        error: (err) => {
          console.error('Error fetching product', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to load product details. Please try again later.',
            confirmButtonText: 'OK',
          });
        },
      });
    }
  }
  onSubmit() {
    if (this.editProductForm.invalid) {
      this.editProductForm.markAllAsTouched();
      return;
    }

    const productId = this.route.snapshot.paramMap.get('id');
    if (!productId) {
      console.error('Product ID is missing');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Product ID is missing. Please try again.',
        confirmButtonText: 'OK',
      });
      return;
    }
    const formData = new FormData();

    Object.keys(this.editProductForm.controls).forEach((key) => {
      const value = this.editProductForm.get(key)?.value;
      formData.append(key, value);
    });
    formData.append('regionId', this.editProductForm.get('region')?.value);
    formData.append('id', productId);
    this.api.updateProduct(productId, formData).subscribe({
      next: (res) => {
        //alert('Product updated successfully');
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Product updated successfully!',
          confirmButtonText: 'OK',
        });
        this.router.navigate(['/admin/product-list']);
      },
      error: (err) => {
        console.error('Error updating product', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update product. Please try again later.',
          confirmButtonText: 'OK',
        });
      },
    });
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.editProductForm.patchValue({
        image: file,
      });

      const control = this.editProductForm.get('image');
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
