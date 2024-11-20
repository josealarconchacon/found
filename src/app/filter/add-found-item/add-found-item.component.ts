import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../shared/service/post.service';
import { Post } from '../../shared/models/post.model';

@Component({
  selector: 'app-add-found-item',
  templateUrl: './add-found-item.component.html',
  styleUrls: ['./add-found-item.component.css'],
})
export class AddFoundItemComponent implements OnInit {
  foundItemForm!: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostService) {}

  ngOnInit(): void {
    this.foundItemForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(5)]],
      location: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  shareItem() {
    if (this.foundItemForm.valid) {
      const formData = this.foundItemForm.value;
      this.postService.addPost(formData).subscribe({
        next: (response) => {
          console.log('Post created:', response);
          this.postService.getPosts();
        },
        error: (error) => {
          console.error('Error creating post:', error);
        },
      });
    }
  }
}
