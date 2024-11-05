import { Component, OnInit } from '@angular/core';
import { Comment } from '../shared/models/comment.model';
import { CommentBoardService } from './service/comment-board.service';
import { Post } from '../shared/models/post.model';

@Component({
  selector: 'app-comment-board',
  templateUrl: './comment-board.component.html',
  styleUrls: ['./comment-board.component.css'],
})
export class CommentBoardComponent implements OnInit {
  comments: Comment[] = [];
  newComment: string = '';
  replyContent: { [key: number]: string } = {};
  currentUserAvatar: string = 'assets/user.jpg';
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
        Date.now(),
        this.currentUserAvatar,
        'You',
        this.newComment,
        new Date().toLocaleTimeString()
      );

      const postId = this.commentBoardService.getSelectedPostId();

      if (postId !== null) {
        this.commentBoardService.addCommentToPost(comment, postId);
      } else {
        console.error('No selected post ID available for adding comment');
      }

      this.newComment = '';
    }
  }

  addReply(parentComment: Comment) {
    const replyText = this.replyContent[parentComment.id]?.trim();
    if (replyText) {
      const reply = new Comment(
        Date.now(),
        this.currentUserAvatar,
        'You',
        replyText,
        new Date().toLocaleTimeString()
      );

      const updatedComment = { ...parentComment };
      updatedComment.replies = [...(updatedComment.replies || []), reply];

      this.commentBoardService.updateComment(updatedComment);
      this.replyContent[parentComment.id] = '';
      parentComment.showReplyInput = false;
    }
  }

  toggleReplyInput(comment: Comment) {
    comment.showReplyInput = !comment.showReplyInput;
    if (comment.showReplyInput) {
      this.replyContent[comment.id] = '';
    }
  }

  likeComment(comment: Comment) {
    const updatedComment = { ...comment };
    if (!updatedComment.isLiked) {
      updatedComment.likes = (updatedComment.likes || 0) + 1;
      updatedComment.isLiked = true;
    } else {
      updatedComment.likes = Math.max(0, (updatedComment.likes || 1) - 1);
      updatedComment.isLiked = false;
    }
    this.commentBoardService.updateComment(updatedComment);
  }

  likeReply(parentComment: Comment, reply: Comment) {
    const updatedParentComment = { ...parentComment };
    const updatedReply = { ...reply };

    if (!updatedReply.isLiked) {
      updatedReply.likes = (updatedReply.likes || 0) + 1;
      updatedReply.isLiked = true;
    } else {
      updatedReply.likes = Math.max(0, (updatedReply.likes || 1) - 1);
      updatedReply.isLiked = false;
    }

    updatedParentComment.replies = updatedParentComment.replies.map((r) =>
      r.id === reply.id ? updatedReply : r
    );

    this.commentBoardService.updateComment(updatedParentComment);
  }

  closeCommentBoard() {
    this.commentBoardService.hideCommentBoard();
  }
}
