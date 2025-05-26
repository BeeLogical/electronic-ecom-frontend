import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppApiService } from '../../../app-api.service';
import { HeaderComponent } from '../../header/header.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';

@Component({
  selector: 'app-edit',
  imports: [CommonModule, HeaderComponent, SidebarComponent],
  standalone: true,
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {}
