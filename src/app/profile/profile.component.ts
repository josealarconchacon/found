import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user = {
    avatar: 'assets/profile.jpg',
    username: 'Default User',
    bio: 'This is your bio.',
  };

  showDetail = false;

  goToProfileDetail() {
    this.showDetail = true;
  }

  closeDetail() {
    this.showDetail = false;
  }

  updateProfile(updatedData: {
    avatar?: string;
    username?: string;
    bio?: string;
  }) {
    if (updatedData.avatar) {
      this.user.avatar = updatedData.avatar;
    }
    if (updatedData.username) {
      this.user.username = updatedData.username;
    }
    if (updatedData.bio) {
      this.user.bio = updatedData.bio;
    }
  }
}
