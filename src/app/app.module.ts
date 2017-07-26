import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { AppMainSidebarComponent } from './app-main-sidebar.component';
import { HomeComponent} from './home.component';
import { AppMessagesPlaceholder} from './app-messages-placeholder.component';

// todo: may not be needed later
import {SharedModule} from './shared/shared.module';
import {ModalService} from './shared/modal/modal.service';
import { FlashMessageService } from './shared/flash-message/flash-message.service';

import { HttpAuthService } from './shared/http-auth.service';
import { AuthService } from './account/auth.service';
import { MessagesService } from './messages/messages.service';

import {CustomersModule} from './customers/customers.module';
import {OrdersModule} from './orders/orders.module';
import {GiftCardsModule} from './giftcards/giftcards.module';
import {ReservationsModule} from './reservations/reservations.module';
import {AccountModule} from './account/account.module';
import {ReportsModule} from './reports/reports.module';
import {AdminModule} from './admin/admin.module';
import {MessagesModule } from './messages/messages.module';


import {AppRouting} from './app-routing';
import {CustomerRouting} from './customers/customer-routing';
import {OrderRouting} from './orders/order-routing';
import {GiftCardRouting} from './giftcards/giftcard-routing';
import {ReservationRouting} from './reservations/reservation-routing';
import {AccountRouting} from './account/account-routing';
import {ReportRouting} from './reports/report-routing';
import {AdminRouting} from './admin/admin-routing';
import {MessagesRouting} from './messages/messages-routing'; 





@NgModule({
  declarations: [
      AppComponent,
      AppMainSidebarComponent,
      AppMessagesPlaceholder,
      HomeComponent
  ],
  imports: [
      SharedModule,
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
      ReportsModule,
      ReportRouting,
      AdminModule,
      AdminRouting,
      MessagesModule,
      MessagesRouting,
      AppRouting
  ],
  providers: [
      //SettingsService,
      FlashMessageService,
      AuthService,
      HttpAuthService,
      MessagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
