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
  selector: 'app-view',
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
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export class ViewComponent {
  viewForm: FormGroup;
  roles: Role[] = [];
  get id(): AbstractControl | null {
    return this.viewForm.get('id');
  }
  constructor(
    private fb: FormBuilder,
    private api: AppApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.viewForm = this.fb.group({
      id: [{ value: '', disabled: true }, [Validators.required]],
      name: [{ value: '', disabled: true }, [Validators.required]],
      email: [{ value: '', disabled: true }, []],
      phone: [{ value: '', disabled: true }, [Validators.required]],
      role: [{ value: '', disabled: true }, [Validators.required]],
    });
  }
  ngOnInit() {
    this.api.getRoles().subscribe({
      next: (res: any) => {
        this.roles = res;
      },
      error: (err) => {
        console.error('Error fetching roles', err);
      },
    });
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      this.api.getUsersByToken({ token: accessToken }).subscribe(
        (response: any) => {
          const user = response;
          this.viewForm.patchValue({
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            id: user.id,
          });
        },
        (error) => {
          this.api.handle401Error(error);
        }
      );
    } else {
      this.api.handle401Error({
        status: 401,
        error: { message: 'Unauthorized' },
      });
    }
  }

  goToEditProfile() {
    const userId = this.id?.value;
    if (userId) {
      this.router.navigate(['/admin/edit', userId]);
    } else {
      console.error('User ID is not available for navigation');
    }
  }
}
