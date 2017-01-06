import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagingComponent } from './paging/paging.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    PagingComponent,
    NotFoundComponent
  ],
  exports: [PagingComponent]
})
export class SharedModule { }
