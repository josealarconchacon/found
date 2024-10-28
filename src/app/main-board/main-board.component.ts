import { Component, OnInit } from '@angular/core';
import { Post } from '../shared/models/post.model';
import { Comment } from '../shared/models/comment.model';
import { CommentBoardService } from '../comment-board/service/comment-board.service';
import { PostService } from '../shared/service/post';

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.css'],
})
export class MainBoardComponent implements OnInit {
  posts: Post[] = [];

  constructor(
    private commentBoardService: CommentBoardService,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.postService.posts$.subscribe((posts) => {
      this.posts = posts;
    });
  }

  showComments(post: Post) {
    this.commentBoardService.setComments(post.comments);
  }

  likePost(post: Post) {
    post.likes++;
  }
}
