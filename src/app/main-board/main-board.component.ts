import { Component, OnInit } from '@angular/core';
import { Post } from '../shared/models/post.model';
import { CommentBoardService } from '../comment-board/service/comment-board.service';
import { PostService } from '../shared/service/post.service';

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.css'],
})
export class MainBoardComponent implements OnInit {
  posts: Post[] = [];
  selectedPostId: number | null = null;

  constructor(
    private commentBoardService: CommentBoardService,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.postService.getPosts();

    this.postService.posts$.subscribe((posts) => {
      console.log('Updated posts in MainBoardComponent:', posts);
      this.posts = posts;
      this.commentBoardService.postsSubject.next(posts);
    });

    this.commentBoardService.selectedPostId$.subscribe(
      (postId: number | null) => (this.selectedPostId = postId)
    );
  }

  toggleComments(post: Post) {
    this.commentBoardService.toggleComments(post.id, post.comments);
  }

  likePost(post: Post) {
    post.likes++;
  }
}
