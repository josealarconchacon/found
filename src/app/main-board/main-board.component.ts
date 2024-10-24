import { Component } from '@angular/core';

interface Post {
  id: number;
  avatar: string;
  title: string;
  location: string;
  likes: number;
  comments: number;
}

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.css'],
})
export class MainBoardComponent {
  posts: Post[] = [
    {
      id: 1,
      avatar: 'assets/avatar1.jpg',
      title: 'Found a hat next to the cafe',
      location: 'B Building',
      likes: 0,
      comments: 5,
    },
    {
      id: 2,
      avatar: 'assets/avatar2.jpg',
      title: 'Found a Book in the bathroom',
      location: 'E Building',
      likes: 3,
      comments: 6,
    },
    {
      id: 3,
      avatar: 'assets/avatar3.jpg',
      title: 'Found a laptop charger in B43',
      location: 'M Building',
      likes: 1,
      comments: 0,
    },
  ];

  likePost(post: Post) {
    post.likes++;
  }
}
