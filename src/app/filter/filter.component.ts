import { Component } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  buildings: string[] = ['C', 'B', 'E', 'M'];
  categories: string[] = ['Clothing', 'Books', 'Electronics', 'Keys', 'Others'];
  selectedCategories: string[] = [];
  showAddFoundItem: boolean = false; // Toggle variable to control the view

  toggleCategory(category: string) {
    const index = this.selectedCategories.indexOf(category);
    if (index === -1) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories.splice(index, 1);
    }
  }

  applyFilter() {
    console.log('Applied filters:', this.selectedCategories);
  }

  toggleAddFoundItem() {
    this.showAddFoundItem = !this.showAddFoundItem; // Toggle between views
  }
}
