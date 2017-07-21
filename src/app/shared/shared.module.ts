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
import { OrderTypesComponent } from './order-types/order-types.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { PriceInputComponent } from './price-input/price-input.component';
import { TestComponent } from './test/test.component';
import { ReservationStatusesComponent } from './reservation-statuses/reservation-statuses.component';
import { GiftcardTypeComponent } from './giftcard-type/giftcard-type.component';
import { IconComponent } from './icon/icon.component';
import { MonthPickerComponent } from './month-picker/month-picker.component';
import { LoadingComponent } from './loading/loading.component';
import { WaitComponent } from './wait/wait.component';
//import { ModalService } from './modal/modal.service';

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
    ModalComponent,
    OrderTypesComponent,
    DatePickerComponent,
    TimePickerComponent,
    PriceInputComponent,
    TestComponent,
    ReservationStatusesComponent,
    GiftcardTypeComponent,
    IconComponent,
    MonthPickerComponent,
    LoadingComponent,
    WaitComponent,
  ],
  exports: [
    PagingComponent,
    ProvinceSelectComponent,
    CitySelectComponent,
    CountrySelectComponent,
    ModalComponent,
    OrderTypesComponent,
    DatePickerComponent,
    TimePickerComponent,
    PriceInputComponent,
    TestComponent,
    ReservationStatusesComponent,
    GiftcardTypeComponent,
    IconComponent,
    MonthPickerComponent,
    LoadingComponent,
    WaitComponent
  ],
  providers: [
    //ModalService
  ]
})
export class SharedModule { }
