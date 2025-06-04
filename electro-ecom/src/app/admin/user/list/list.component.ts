import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AppApiService } from '../../../app-api.service';
import { HeaderComponent } from '../../header/header.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  imports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    RouterLink,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'phone',
    'role',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<UserData>();

  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator();
  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  constructor(private api: AppApiService, private router: Router) {}

  ngOnInit() {
    this.api.getUsers().subscribe({
      next: (data: any) => {
        this.dataSource.data = data;
      },
      error: (err: any) => {
        console.error('Failed to load users:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load users. Please try again later.',
          confirmButtonText: 'OK',
        });
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getSerialNumber(index: number): number {
    return (
      index +
      1 +
      (this.paginator?.pageIndex || 0) * (this.paginator?.pageSize || 0)
    );
  }
  deleteUser(id: any, name: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this user?',
      footer: 'This action cannot be undone.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      confirmButtonColor: '#d33',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteUser(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Deleted!',
              text: 'User has been deleted successfully.',
              icon: 'success',
              confirmButtonText: 'OK',
            });
            this.dataSource.data = this.dataSource.data.filter(
              (p) => p.id !== id
            );
          },
          error: (err) => {
            Swal.fire({
              title: 'Error',
              text: 'Failed to delete user. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
            console.error('Error', err);
          },
        });
      }
    });
  }
}
export interface UserData {
  id: number | string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
}
