import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../shared/service/post';
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
      const newPost = new Post(
        Date.now(),
        'assets/avatar-default.jpg',
        this.foundItemForm.value.description,
        this.foundItemForm.value.location,
        0,
        []
      );
      this.postService.addPost(newPost);
    }
  }
}
