import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-found-item',
  templateUrl: './add-found-item.component.html',
  styleUrls: ['./add-found-item.component.css'],
})
export class AddFoundItemComponent {
  description: string = '';
  location: string = '';
  category: string = '';

  constructor(private dialogRef: MatDialogRef<AddFoundItemComponent>) {}

  shareItem() {
    // You can handle the sharing logic here
    const foundItem = {
      description: this.description,
      location: this.location,
      category: this.category,
    };
    console.log(foundItem);
    this.dialogRef.close(foundItem); // Return the item to the dialogRef
  }

  isFormValid() {
    return (
      this.description.trim() !== '' &&
      this.location !== '' &&
      this.category !== ''
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
