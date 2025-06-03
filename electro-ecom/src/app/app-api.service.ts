import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AppApiService {
  url = 'http://localhost:5276/api/';
  constructor(private http: HttpClient, private router: Router) {}
  public authToken: any = localStorage.getItem('accessToken') as any;

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: localStorage.getItem('accessToken')
          ? 'Bearer ' + localStorage.getItem('accessToken')
          : '',
      }),
    };
  }

  handle401Error(error: any) {
    if (error.status === 401) {
      this.router.navigate(['/login']);
      Swal.fire('Error', 'Session Expired. Please login again.', 'error');
    } else if (error.status === 409) {
      Swal.fire('Cannot Delete', error.error.message, 'error');
    } else {
      console.error('Error:', error);
    }
  }

  login(request: any) {
    const httpOptions = this.getHttpOptions();
    return this.http.post(this.url + 'Auth/login', request, httpOptions);
  }
  signup(request: any) {
    const httpOptions = this.getHttpOptions();
    return this.http.post(this.url + 'Users', request, httpOptions);
  }
  getProducts() {
    const httpOptions = this.getHttpOptions();
    return this.http.get(this.url + 'Products', httpOptions);
  }
  getRegions() {
    const httpOptions = this.getHttpOptions();
    return this.http.get(this.url + 'Regions', httpOptions);
  }
  getUsers() {
    const httpOptions = this.getHttpOptions();
    return this.http.get(this.url + 'Users', httpOptions);
  }
  getSalesTransactions() {
    const httpOptions = this.getHttpOptions();
    return this.http.get(this.url + 'SalesTransactions', httpOptions);
  }
  createProduct(request: any) {
    const httpOptions = this.getHttpOptions();
    return this.http.post(this.url + 'Products', request, httpOptions);
  }
  getProductById(id: string) {
    const httpOptions = this.getHttpOptions();
    return this.http.get(this.url + 'Products/' + id, httpOptions);
  }
  updateProduct(id: string, request: any) {
    const httpOptions = this.getHttpOptions();
    return this.http.put(this.url + 'Products/' + id, request, httpOptions);
  }
  deleteProduct(id: any) {
    const httpOptions = this.getHttpOptions();
    return this.http.delete(this.url + 'Products/' + id, httpOptions).pipe(
      catchError((error) => {
        this.handle401Error(error);
        return throwError(() => error);
      })
    );
  }
  getRoles() {
    const httpOptions = this.getHttpOptions();
    return this.http.get(this.url + 'Roles', httpOptions);
  }
  createRegion(request: any) {
    const httpOptions = this.getHttpOptions();
    return this.http.post(this.url + 'Regions', request, httpOptions);
  }
  updateRegions(id: string, request: any) {
    const httpOptions = this.getHttpOptions();
    return this.http.put(this.url + 'Regions/' + id, request, httpOptions);
  }
  getRegionById(id: string) {
    const httpOptions = this.getHttpOptions();
    return this.http.get(this.url + 'Regions/' + id, httpOptions);
  }
  deleteRegion(id: any) {
    const httpOptions = this.getHttpOptions();
    return this.http.delete(this.url + 'Regions/' + id, httpOptions).pipe(
      catchError((error) => {
        this.handle401Error(error);
        return throwError(() => error);
      })
    );
  }
  deleteUser(id: any) {
    const httpOptions = this.getHttpOptions();
    return this.http.delete(this.url + 'Users/' + id, httpOptions).pipe(
      catchError((error) => {
        this.handle401Error(error);
        return throwError(() => error);
      })
    );
  }
  getUserById(userId: string) {
    const httpOptions = this.getHttpOptions();
    return this.http.get(this.url + 'Users/' + userId, httpOptions);
  }
  updateUser(id: string, request: any) {
    const httpOptions = this.getHttpOptions();
    return this.http.put(this.url + 'Users/' + id, request, httpOptions);
  }
  deleteRole(id: any) {
    const httpOptions = this.getHttpOptions();
    return this.http.delete(this.url + 'Roles/' + id, httpOptions).pipe(
      catchError((error) => {
        this.handle401Error(error);
        return throwError(() => error);
      })
    );
  }
  createRole(request: any) {
    const httpOptions = this.getHttpOptions();
    return this.http.post(this.url + 'Roles', request, httpOptions);
  }
  updateRoles(id: string, request: any) {
    const httpOptions = this.getHttpOptions();
    return this.http.put(this.url + 'Roles/' + id, request, httpOptions);
  }
  getRoleById(roleId: string) {
    const httpOptions = this.getHttpOptions();
    return this.http.get(this.url + 'Roles/' + roleId, httpOptions);
  }
  getUsersByToken(request: any) {
    const httpOptions = this.getHttpOptions();
    return this.http.post(
      this.url + 'Auth/getUserByToken',
      request,
      httpOptions
    );
  }
  getProductsByRegion(regionId: string) {
    const httpOptions = this.getHttpOptions();
    return this.http.get(
      this.url + 'Products/GetByRegionId/' + regionId,
      httpOptions
    );
  }
  getProductsBySearchTerm(
    searchTerm: string,
    selectedRegionId: string | null = null
  ) {
    const httpOptions = this.getHttpOptions();
    return this.http.get(this.url + 'Products/search/', {
      ...httpOptions,
      params: { searchTerm, regionId: selectedRegionId || '' },
    });
  }
  cartCheckout(request: any) {
    console.log('Checkout request:', request);
    const httpOptions = this.getHttpOptions();
    return this.http.post(this.url + 'SalesTransactions', request, httpOptions);
  }
  getSalesTransactionsByUserId(id: any) {
    const httpOptions = this.getHttpOptions();
    return this.http.get(
      this.url + 'SalesTransactions/GetByUserId/' + id,
      httpOptions
    );
  }
}
