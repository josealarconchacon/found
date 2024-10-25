import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Comment } from '../../shared/models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentBoardService {
  private commentsSource = new BehaviorSubject<Comment[]>([]);
  comments$ = this.commentsSource.asObservable();

  setComments(comments: Comment[]) {
    this.commentsSource.next(comments);
  }
}
