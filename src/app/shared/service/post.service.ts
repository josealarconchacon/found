import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Post } from '../models/post.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsSubject = new BehaviorSubject<Post[]>([]);
  posts$ = this.postsSubject.asObservable();
  private apiUrl = 'http://localhost:5001/api/posts';

  constructor(private http: HttpClient) {}

  getPosts(): void {
    this.http.get<Post[]>(this.apiUrl).subscribe(
      (posts) => {
        this.postsSubject.next(posts);
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  addPost(post: Partial<Post>): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post).pipe(
      tap((newPost) => {
        this.postsSubject.next([newPost, ...this.postsSubject.getValue()]);
      })
    );
  }
}
