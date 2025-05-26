import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppApiService } from '../../../app-api.service';
import { HeaderComponent } from '../../header/header.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';

@Component({
  selector: 'app-list',
  imports: [HeaderComponent, SidebarComponent, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {}
