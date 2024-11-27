import { Component } from '@angular/core';
import { CommentBoardService } from './comment-board/service/comment-board.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'found';
  isCommentBoardVisible = false;
  isLoggedIn = false;

  constructor(private commentBoardService: CommentBoardService) {
    this.commentBoardService.isVisible$.subscribe(
      (isVisible) => (this.isCommentBoardVisible = isVisible)
    );
  }

  onLoginSuccess() {
    this.isLoggedIn = true;
  }
}
