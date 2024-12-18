import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterComponent } from './filter/filter.component';
import { CommentBoardComponent } from './comment-board/comment-board.component';
import { MainBoardComponent } from './main-board/main-board.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AddFoundItemComponent } from './filter/add-found-item/add-found-item.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ProfileDetailComponent } from './profile/profile-detail/profile-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    CommentBoardComponent,
    MainBoardComponent,
    ProfileComponent,
    AddFoundItemComponent,
    ProfileDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
  ],

  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()), 
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
