import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

import { NewsPost } from '../../../shared/models/news-post';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatChipsModule],
})
export class NewsCardComponent {
  @Input() newsPost!: NewsPost;
  @Input() categoryName: string = 'Uncategorized';
  @Input() showFullContent: boolean = false;
  @Output() cardClick = new EventEmitter<string>();

  get contentPreview(): string {
    if (!this.newsPost?.content) return '';

    return this.showFullContent
      ? this.newsPost.content
      : `${this.newsPost.content.slice(0, 150)}...`;
  }

  onCardClick(): void {
    if (this.newsPost?.id) {
      this.cardClick.emit(this.newsPost.id);
    }
  }
}
