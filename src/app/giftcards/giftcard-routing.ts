import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GiftCardsListComponent } from './giftcards-list/giftcards-list.component';
import { GiftCardDetailsComponent } from './giftcard-details/giftcard-details.component';
import { GiftCardEditComponent } from './giftcard-edit/giftcard-edit.component';
import { GiftCardAddComponent } from './giftcard-add/giftcard-add.component';

const routes:Routes = [
    {
        path: 'giftcards/list/:customerId',
        component: GiftCardsListComponent
    },
    {
        path: 'giftcards/:id',
        component: GiftCardDetailsComponent
    },
    {
        path: 'giftcards/add/:customerId',
        component: GiftCardAddComponent
    },
    {
        path: 'giftcards/edit/:id',
        component: GiftCardEditComponent
    },

];

export const GiftCardRouting = RouterModule.forChild(routes);