import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagingComponent } from './paging/paging.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [PagingComponent],
  exports: [PagingComponent]
})
export class SharedModule { }
