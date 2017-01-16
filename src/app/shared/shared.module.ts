import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, ConnectionBackend, RequestOptions, XHRBackend } from '@angular/http';
import { PagingComponent } from './paging/paging.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpAuthService } from './http-auth.service';
import { CitySelectComponent } from './city-select/city-select.component';
import { ProvinceSelectComponent } from './province-select/province-select.component';
import { CountrySelectComponent } from './country-select/country-select.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    HttpModule
  ],
  declarations: [
    PagingComponent,
    NotFoundComponent,
    CitySelectComponent,
    ProvinceSelectComponent,
    CountrySelectComponent,
    ModalComponent
  ],
  exports: [
    PagingComponent,
    ProvinceSelectComponent,
    CitySelectComponent,
    CountrySelectComponent,
    ModalComponent
  ],
})
export class SharedModule { }
