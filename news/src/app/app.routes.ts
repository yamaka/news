import { Routes } from '@angular/router';
// Make sure the path to auth.guard.ts is correct
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./public/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'news/:id',
    loadComponent: () =>
      import('./public/news-detail/news-detail.component').then(
        (m) => m.NewsDetailComponent
      ),
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'news', pathMatch: 'full' },
      {
        path: 'news',
        loadComponent: () =>
          import('./admin/news-posts/news-list/news-list.component').then(
            (m) => m.NewsListComponent
          ),
      },
      {
        path: 'news/create',
        loadComponent: () =>
          import('./admin/news-posts/news-form/news-form.component').then(
            (m) => m.NewsFormComponent
          ),
      },
      {
        path: 'news/edit/:id',
        loadComponent: () =>
          import('./admin/news-posts/news-form/news-form.component').then(
            (m) => m.NewsFormComponent
          ),
      },
      {
        path: 'news/:id',
        loadComponent: () =>
          import('./admin/news-posts/news-detail/news-detail.component').then(
            (m) => m.NewsDetailComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
