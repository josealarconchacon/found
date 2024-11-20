import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Comment } from '../../shared/models/comment.model';
import { Post } from '../../shared/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class CommentBoardService {
  private commentsSubject = new BehaviorSubject<Comment[]>([]);
  private isVisibleSubject = new BehaviorSubject<boolean>(false);
  private selectedPostIdSubject = new BehaviorSubject<number | null>(null);
  public postsSubject = new BehaviorSubject<Post[]>([]);

  comments$ = this.commentsSubject.asObservable();
  isVisible$ = this.isVisibleSubject.asObservable();
  selectedPostId$ = this.selectedPostIdSubject.asObservable();
  posts$ = this.postsSubject.asObservable();

  constructor() {
    this.postsSubject.next([]);
  }

  toggleComments(postId: number, comments: Comment[]) {
    const currentPostId = this.selectedPostIdSubject.value;

    if (currentPostId === postId) {
      this.hideCommentBoard();
    } else {
      this.selectedPostIdSubject.next(postId);
      this.commentsSubject.next(comments);
      this.isVisibleSubject.next(true);
    }
  }

  hideCommentBoard() {
    this.selectedPostIdSubject.next(null);
    this.isVisibleSubject.next(false);
  }

  addCommentToPost(comment: Comment, postId: number) {
    const currentComments = this.commentsSubject.value;
    this.commentsSubject.next([...currentComments, comment]);

    const currentPosts = this.postsSubject.value;
    const postIndex = currentPosts.findIndex((post) => post.id === postId);
    if (postIndex !== -1) {
      const updatedPost = { ...currentPosts[postIndex] };
      updatedPost.comments.push(comment);
      updatedPost.likes = (updatedPost.likes || 0) + 1;
      currentPosts[postIndex] = updatedPost;
      this.postsSubject.next(currentPosts);
    }
  }

  updateComment(updatedComment: Comment) {
    const currentComments = this.commentsSubject.value;
    const updatedComments = currentComments.map((comment) =>
      comment.id === updatedComment.id ? updatedComment : comment
    );
    this.commentsSubject.next(updatedComments);
  }
  getSelectedPostId(): number | null {
    return this.selectedPostIdSubject.value;
  }
}
