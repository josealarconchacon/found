import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user = {
    avatar: 'assets/profile.jpg',
  };

  showDetail = false;

  goToProfileDetail() {
    this.showDetail = true;
  }

  closeDetail() {
    this.showDetail = false;
  }
}
