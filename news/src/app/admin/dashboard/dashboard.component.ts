import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

// Material imports - IMPORTANT: include all Material modules used in the template
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { AuthService } from '../../core/services/auth.service';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet, // Add this specifically for router-outlet
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
  ],
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  isSidenavOpen = true;

  menuItems = [
    { icon: 'dashboard', label: 'Dashboard', route: '/admin' },
    { icon: 'article', label: 'News Posts', route: '/admin/news' },
    { icon: 'add_circle', label: 'Create News', route: '/admin/news/create' },
    { icon: 'category', label: 'Categories', route: '/admin/categories' },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
  }

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  logout(): void {
    this.authService.logout();
  }
}
