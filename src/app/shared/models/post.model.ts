import { Comment } from './comment.model';

export class Post {
  id: number;
  avatar: string;
  title: string;
  whereItWasFound: string;
  likes: number;
  comments: Comment[];
  description: any;

  constructor(
    id: number,
    avatar: string,
    title: string,
    whereItWasFound: string,
    likes: number,
    comments: Comment[]
  ) {
    this.id = id;
    this.avatar = avatar;
    this.title = title;
    this.whereItWasFound = whereItWasFound;
    this.likes = likes;
    this.comments = comments;
  }
}
