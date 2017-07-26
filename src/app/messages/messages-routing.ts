import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxComponent } from './inbox/inbox.component';
import { SentComponent } from './sent/sent.component';
import { ComposeComponent } from './compose/compose.component';
import { MessageViewComponent } from './message-view/message-view.component';


const routes:Routes = [
    {
        path: 'messages/inbox',
        component: InboxComponent
    },
    {
        path: 'messages/view/:id',
        component: MessageViewComponent
    },
    {
        path: 'messages/sent',
        component: SentComponent
    },
    {
        path: 'messages/compose/:id',
        component: ComposeComponent
    }
];

export const MessagesRouting = RouterModule.forChild(routes);