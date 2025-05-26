import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppApiService } from '../../../app-api.service';
import { HeaderComponent } from '../../header/header.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view',
  imports: [CommonModule, HeaderComponent, SidebarComponent, FormsModule],
  standalone: true,
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export class ViewComponent {
  constructor(private router: Router) {}

  goToEditProfile() {
    this.router.navigate(['/admin/edit']);
  }
}
