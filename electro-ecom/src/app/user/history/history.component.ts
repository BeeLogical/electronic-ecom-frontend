import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AppApiService } from '../../app-api.service';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
export interface SalesTransactionData {
  id: number | string;
  userName: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  saleStatus: string;
  date: string;
}
@Component({
  selector: 'app-history',
  imports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'productName',
    'quantity',
    'totalPrice',
    'saleStatus',
    'date',
  ];
  dataSource = new MatTableDataSource<SalesTransactionData>();

  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator();
  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  constructor(private api: AppApiService, private router: Router) {}

  ngOnInit() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      this.api.getUsersByToken({ token: accessToken }).subscribe(
        (response: any) => {
          const user = response;
          this.api.getSalesTransactionsByUserId(user.id).subscribe({
            next: (data: any) => {
              this.dataSource.data = data;
            },
            error: (err: any) => {
              console.error('Failed to load products:', err);
            },
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
}
