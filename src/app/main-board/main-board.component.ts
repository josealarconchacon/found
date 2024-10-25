import { Component } from '@angular/core';
import { Post } from '../shared/models/post.model';
import { Comment } from '../shared/models/comment.model';
import { CommentBoardService } from '../comment-board/service/comment-board.service';

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.css'],
})
export class MainBoardComponent {
  posts: Post[] = [
    new Post(
      1,
      'assets/avatar1.jpg',
      'Found a hat next to the cafe',
      'B Building',
      0,
      [
        new Comment(
          1,
          'assets/user1.jpg',
          'Alice',
          'Is it a black hat?',
          '10:00 AM',
          [] // Empty replies array
        ),
      ]
    ),
    new Post(
      2,
      'assets/avatar2.jpg',
      'Found a Book in the bathroom',
      'E Building',
      3,
      [
        new Comment(
          2,
          'assets/user2.jpg',
          'Bob',
          'I think it’s mine. Can we meet?',
          '11:00 AM',
          [] // Empty replies array
        ),
      ]
    ),
  ];

  constructor(private commentBoardService: CommentBoardService) {}

  showComments(post: Post) {
    this.commentBoardService.setComments(post.comments);
  }

  likePost(post: Post) {
    post.likes++;
  }
}
