import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsSubject = new BehaviorSubject<Post[]>([]);
  posts$ = this.postsSubject.asObservable();

  private posts: Post[] = [
    new Post(
      1,
      'assets/avatar1.jpg',
      'Found a hat next to the cafe',
      'B Building',
      0,
      []
    ),
  ];

  constructor() {
    this.postsSubject.next(this.posts);
  }

  addPost(post: Post) {
    this.posts.unshift(post);
    this.postsSubject.next(this.posts);
  }
}
