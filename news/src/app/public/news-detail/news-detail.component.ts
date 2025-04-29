import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';

// Material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NewsService } from '../../core/services/news.service';
import { CategoryService } from '../../core/services/category.service';
import { AuthService } from '../../core/services/auth.service';
import { NewsPost } from '../../shared/models/news-post';
import { Category } from '../../shared/models/category';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
})
export class NewsDetailComponent implements OnInit {
  newsPost: NewsPost | null = null;
  category: Category | null = null;
  relatedPosts: NewsPost[] = [];
  isLoading = true;
  isLoggedIn = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService,
    private categoryService: CategoryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.loadPostData(params['id']);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  loadPostData(id: string): void {
    this.isLoading = true;
    this.newsService.getPostById(id).subscribe(
      (post) => {
        if (post) {
          this.newsPost = post;
          this.loadCategory(post.categoryId);
          this.loadRelatedPosts(post.categoryId, post.id!);
        } else {
          this.router.navigate(['/']);
        }
      },
      (error) => {
        console.error('Error loading post details:', error);
        this.isLoading = false;
        this.router.navigate(['/']);
      }
    );
  }

  loadCategory(categoryId: string): void {
    this.categoryService.getCategoryById(categoryId).subscribe((category) => {
      this.category = category || null;
    });
  }

  loadRelatedPosts(categoryId: string, currentPostId: string): void {
    this.newsService.getAllNews().subscribe(
      (posts) => {
        // Get posts from the same category, excluding the current post
        this.relatedPosts = posts
          .filter(
            (post) =>
              post.categoryId === categoryId && post.id !== currentPostId
          )
          .slice(0, 3); // Limit to 3 related posts

        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading related posts:', error);
        this.isLoading = false;
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  navigateToDetail(postId: string): void {
    // Navigate to the same component with a different post ID
    this.router.navigate(['/news', postId]);
  }

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  navigateToAdmin(): void {
    this.router.navigate(['/admin']);
  }
}
