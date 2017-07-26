import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { FlashMessageService } from '../../shared/flash-message/flash-message.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  providers: [
      AdminService
  ]
})
export class UsersListComponent implements OnInit {

  users = [];

  @ViewChild('mWait') mWait;

  constructor(private _admin: AdminService,
              private _flash: FlashMessageService) 
  {
      
  }

  ngOnInit() 
  {
      this.refresh();
  }

  refresh()
  {
      this.mWait.open();
      this._admin.getUsersList()
          .subscribe(
              d => {
                  this.users = d;
                  this.mWait.close();
              },
              d => {
                  this._flash.addMessage("Error", "Could not retrieve the users list.", true, "danger", 2500, 2);
                  this.mWait.close();
              }
          )
  }

  activate(id)
  {
      this._admin.activateUser(id)
            .subscribe(
                d => {
                    this.refresh();
                    this._flash.addMessage("Success", "The user was activated.", true, "success", 2500, 2);
                },
                d => {
                    this._flash.addMessage("Error", "Unable to perform the operation.", true, "danger", 2500, 2);
                }
            );
  }

  deactivate(id)
  {
      this._admin.deactivateUser(id)
            .subscribe(
                d => {
                    this.refresh();
                    this._flash.addMessage("Success", "The user was deactivated.", true, "success", 2500, 2);
                },
                d => {
                    this._flash.addMessage("Error", "Unable to perform the operation.", true, "danger", 2500, 2);
                }
            );
  }

  delete(id)
  {
      this._admin.deleteUser(id)
            .subscribe(
                d => {
                    this.refresh();
                    this._flash.addMessage("Success", "The user was deleted.", true, "success", 2500, 2);
                },
                d => {
                    this._flash.addMessage("Error", "Unable to perform the operation.", true, "danger", 2500, 2);
                    console.log(d);
                }
            );
  }

  resetPassword(id)
  {
      this._admin.resetPassword(id)
          .subscribe(
              d => {
                  this._flash.addMessage("Success", "The new temporary password is " + d._body , false, "success", 3000, 2);
              },
              d => {
                  this._flash.addMessage("Error", "Unable to perform the operation.", true, "danger", 2500, 2);
                  console.log(d);
              }
          )
  }

  

}
