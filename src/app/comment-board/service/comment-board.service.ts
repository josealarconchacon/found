import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Comment } from '../../shared/models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentBoardService {
  private commentsSource = new BehaviorSubject<Comment[]>([]);
  private isVisibleSource = new BehaviorSubject<boolean>(false);

  comments$ = this.commentsSource.asObservable();
  isVisible$ = this.isVisibleSource.asObservable();

  toggleComments(comments: Comment[]) {
    if (this.isVisibleSource.value) {
      this.isVisibleSource.next(false);
    } else {
      this.commentsSource.next(comments);
      this.isVisibleSource.next(true);
    }
  }

  hideCommentBoard() {
    this.isVisibleSource.next(false);
  }

  addCommentToPost(comment: Comment) {
    const currentComments = [...this.commentsSource.value, comment];
    this.commentsSource.next(currentComments);
    this.hideCommentBoard();
  }
}
