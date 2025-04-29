import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    children: [
      {
        path: 'news',
        loadComponent: () =>
          import('./news-posts/news-list/news-list.component').then(
            (m) => m.NewsListComponent
          ),
      },
      {
        path: 'news/create',
        loadComponent: () =>
          import('./news-posts/news-form/news-form.component').then(
            (m) => m.NewsFormComponent
          ),
      },
      {
        path: 'news/edit/:id',
        loadComponent: () =>
          import('./news-posts/news-form/news-form.component').then(
            (m) => m.NewsFormComponent
          ),
      },
      {
        path: 'news/:id',
        loadComponent: () =>
          import('./news-posts/news-detail/news-detail.component').then(
            (m) => m.NewsDetailComponent
          ),
      },
    ],
  },
];
