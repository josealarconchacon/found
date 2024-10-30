import { Component, OnInit } from '@angular/core';
import { Comment } from '../shared/models/comment.model';
import { CommentBoardService } from './service/comment-board.service';

@Component({
  selector: 'app-comment-board',
  templateUrl: './comment-board.component.html',
  styleUrls: ['./comment-board.component.css'],
})
export class CommentBoardComponent implements OnInit {
  comments: Comment[] = [];
  newComment: string = '';
  replyContent: { [key: number]: string } = {};
  currentUserAvatar: any;
  isVisible: boolean = false;

  constructor(private commentBoardService: CommentBoardService) {}

  ngOnInit() {
    this.commentBoardService.comments$.subscribe((comments) => {
      this.comments = comments;
    });
    this.commentBoardService.isVisible$.subscribe((isVisible) => {
      this.isVisible = isVisible;
      if (!isVisible) {
        this.newComment = '';
      }
    });
  }

  addComment() {
    if (this.newComment.trim()) {
      const comment = new Comment(
        this.comments.length + 1,
        'assets/user.jpg',
        'You',
        this.newComment,
        new Date().toLocaleTimeString()
      );
      this.comments.push(comment);
      this.commentBoardService.addCommentToPost(comment);
    }
  }

  addReply(parentComment: Comment) {
    const replyText = this.replyContent[parentComment.id]?.trim();
    if (replyText) {
      const reply = new Comment(
        parentComment.replies.length + 1,
        'assets/profile.png',
        'You',
        replyText,
        new Date().toLocaleTimeString()
      );
      parentComment.replies.push(reply);
      this.replyContent[parentComment.id] = '';
      this.commentBoardService.addCommentToPost(reply);
      this.commentBoardService.hideCommentBoard();
    }
  }

  toggleReplyInput(comment: Comment) {
    comment.showReplyInput = !comment.showReplyInput;
  }

  likeComment(comment: Comment) {
    if (!comment.isLiked) {
      comment.likes = (comment.likes || 0) + 1;
      comment.isLiked = true;
    } else {
      comment.likes--;
      comment.isLiked = false;
    }
  }

  likeReply(reply: Comment) {
    if (!reply.isLiked) {
      reply.likes = (reply.likes || 0) + 1;
      reply.isLiked = true;
    } else {
      reply.likes--;
      reply.isLiked = false;
    }
  }
}
