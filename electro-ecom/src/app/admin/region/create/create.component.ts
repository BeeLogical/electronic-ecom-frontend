import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppApiService } from '../../../app-api.service';
import { HeaderComponent } from '../../header/header.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';

@Component({
  selector: 'app-create',
  imports: [CommonModule, HeaderComponent, SidebarComponent],
  standalone: true,
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {}
