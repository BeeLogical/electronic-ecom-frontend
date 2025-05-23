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
}
