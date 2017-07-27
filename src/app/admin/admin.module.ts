import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UserAddComponent } from './user-add/user-add.component';
import { TicketAddComponent } from './ticket-add/ticket-add.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [UsersListComponent, UserAddComponent, TicketAddComponent, TicketListComponent, TicketDetailsComponent]
})
export class AdminModule { }
