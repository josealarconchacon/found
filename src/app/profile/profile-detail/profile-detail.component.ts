import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in'),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class ProfileDetailComponent implements OnInit {
  @Output() closeDetail = new EventEmitter<void>();
  isExpanded = false;

  profileForm: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  isEditing: boolean = false;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      username: [''],
      bio: [''],
    });
  }

  ngOnInit() {}

  close() {
    this.closeDetail.emit();
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  enableEditing() {
    this.isEditing = true;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
      this.isEditing = false;
    }
  }

  deletePhoto() {
    this.selectedFile = null;
    this.previewUrl = null;
  }
}
