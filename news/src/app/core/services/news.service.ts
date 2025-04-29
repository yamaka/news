import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { NewsPost } from '../../shared/models/news-post';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getAllNews(): Observable<NewsPost[]> {
    return this.http.get<NewsPost[]>(`/news`);
  }

  getPostById(id: string): Observable<NewsPost> {
    return this.http.get<NewsPost>(`/news/${id}`);
  }

  createNews(news: NewsPost): Observable<NewsPost> {
    return this.http.post<NewsPost>(`/news`, news);
  }

  updatePost(id: string, news: NewsPost): Observable<NewsPost> {
    return this.http.put<NewsPost>(`/news/${id}`, news);
  }

  deletePost(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`/news/${id}`);
  }
}
