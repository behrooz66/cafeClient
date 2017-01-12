import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, ConnectionBackend, RequestOptions, XHRBackend } from '@angular/http';
import { PagingComponent } from './paging/paging.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpAuthService } from './http-auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    HttpModule
  ],
  declarations: [
    PagingComponent,
    NotFoundComponent
  ],
  exports: [PagingComponent],
})
export class SharedModule { }
