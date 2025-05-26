import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  dropdownOpen = false;

  constructor(private router: Router) {}

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }
  viewProfile() {
    this.router.navigate(['/user/view']);
  }
}
