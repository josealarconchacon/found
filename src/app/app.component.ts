import { Component } from '@angular/core';
import { CommentBoardService } from './comment-board/service/comment-board.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'found';
  isCommentBoardVisible = false;

  constructor(private commentBoardService: CommentBoardService) {
    this.commentBoardService.isVisible$.subscribe(
      (isVisible) => (this.isCommentBoardVisible = isVisible)
    );
  }
}
