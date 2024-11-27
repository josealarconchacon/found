import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFoundItemComponent } from './filter/add-found-item/add-found-item.component';
import { MainBoardComponent } from './main-board/main-board.component';

const routes: Routes = [
  { path: 'add-found-item', component: AddFoundItemComponent },
  { path: 'main-board', component: MainBoardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
