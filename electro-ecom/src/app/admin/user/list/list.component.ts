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
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';

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

  constructor(
    private api: AppApiService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.api.getUsers().subscribe({
      next: (data: any) => {
        this.dataSource.data = data;
      },
      error: (err: any) => {
        console.error('Failed to load users:', err);
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { name: name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.api.deleteUser(id).subscribe({
          next: () => {
            alert('Deleted');
            this.dataSource.data = this.dataSource.data.filter(
              (p) => p.id !== id
            );
          },
          error: (err) => {
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
