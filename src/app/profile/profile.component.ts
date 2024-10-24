import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user = {
    avatar: 'assets/profile.jpg',
    username: 'John Doe',
    email: 'john@example.com',
  };

  logout() {
    // Implement logout logic
    console.log('Logging out...');
  }
}
