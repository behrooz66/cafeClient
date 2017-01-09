import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { AppMainSidebarComponent } from './app-main-sidebar.component';
import { HomeComponent} from './home.component';

import {CustomersModule} from './customers/customers.module';
import {OrdersModule} from './orders/orders.module';
import {GiftCardsModule} from './giftcards/giftcards.module';
import {ReservationsModule} from './reservations/reservations.module';
import {AccountModule} from './account/account.module';

import {AppRouting} from './app-routing';
import {CustomerRouting} from './customers/customer-routing';
import {OrderRouting} from './orders/order-routing';
import {GiftCardRouting} from './giftcards/giftcard-routing';
import {ReservationRouting} from './reservations/reservation-routing';
import {AccountRouting} from './account/account-routing';


@NgModule({
  declarations: [
    AppComponent,
    AppMainSidebarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CustomersModule,
    OrdersModule,
    GiftCardsModule,
    ReservationsModule,
    AccountModule,
    RouterModule,
    CustomerRouting,
    OrderRouting,
    GiftCardRouting,
    ReservationRouting,
    AccountRouting,
    AppRouting
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
