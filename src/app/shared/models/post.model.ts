import { Comment } from './comment.model';

export class Post {
  id: number;
  avatar: string;
  title: string;
  location: string;
  likes: number;
  comments: Comment[];

  constructor(
    id: number,
    avatar: string,
    title: string,
    location: string,
    likes: number,
    comments: Comment[]
  ) {
    this.id = id;
    this.avatar = avatar;
    this.title = title;
    this.location = location;
    this.likes = likes;
    this.comments = comments;
  }
}
