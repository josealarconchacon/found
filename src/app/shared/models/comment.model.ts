export class Comment {
  id: number;
  avatar: string;
  username: string;
  message: string;
  timestamp: string;
  replies: Comment[];
  likes: number;
  showReplyInput: any;
  isLiked: any;

  constructor(
    id: number,
    avatar: string,
    username: string,
    message: string,
    timestamp: string,
    replies: Comment[] = [],
    likes: number = 0
  ) {
    this.id = id;
    this.avatar = avatar;
    this.username = username;
    this.message = message;
    this.timestamp = timestamp;
    this.replies = replies;
    this.likes = likes;
  }
}
