import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftCardsListComponent } from './giftcards-list/giftcards-list.component';
import { GiftCardDetailsComponent } from './giftcard-details/giftcard-details.component';
import { GiftCardAddComponent } from './giftcard-add/giftcard-add.component';
import { GiftCardEditComponent } from './giftcard-edit/giftcard-edit.component';

import { GiftCardService } from './giftcard.service';


@NgModule({
  imports: [
      CommonModule
  ],
  declarations: [
      GiftCardsListComponent, 
      GiftCardDetailsComponent,
      GiftCardAddComponent, 
      GiftCardEditComponent
  ],
  providers: [
      GiftCardService
  ],
  exports: [
      GiftCardsListComponent, 
      GiftCardDetailsComponent,
      GiftCardAddComponent, 
      GiftCardEditComponent
  ]
})
export class GiftCardsModule { }
