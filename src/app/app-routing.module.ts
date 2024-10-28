import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFoundItemComponent } from './filter/add-found-item/add-found-item.component';

const routes: Routes = [
  { path: 'add-found-item', component: AddFoundItemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
