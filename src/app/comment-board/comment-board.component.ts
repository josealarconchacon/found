import { Component } from '@angular/core';

interface Comment {
  id: number;
  avatar: string;
  username: string;
  message: string;
  timestamp: string;
}

@Component({
  selector: 'app-comment-board',
  templateUrl: './comment-board.component.html',
  styleUrls: ['./comment-board.component.css'],
})
export class CommentBoardComponent {
  comments: Comment[] = [
    {
      id: 1,
      avatar: 'assets/amanda.jpg',
      username: 'Amanda',
      message:
        'Hi Sally, I am Amanda. Thank you for posting about the book. When is the best to meet, and let me know if you have any specific requirement.',
      timestamp: '2:30 PM',
    },
    {
      id: 2,
      avatar: 'assets/sally.jpg',
      username: 'Sally',
      message:
        'Amazing. To avoid any mistakes. Could you tell me the name of the book? and also the color. if you guess right, them we can meet to give you the book.',
      timestamp: '2:35 PM',
    },
  ];

  newComment: string = '';

  addComment() {
    if (this.newComment.trim()) {
      const comment: Comment = {
        id: this.comments.length + 1,
        avatar: 'assets/user.jpg',
        username: 'You',
        message: this.newComment,
        timestamp: new Date().toLocaleTimeString(),
      };
      this.comments.push(comment);
      this.newComment = '';
    }
  }
}
