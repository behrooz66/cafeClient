import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { FlashMessageService } from '../../shared/flash-message/flash-message.service'


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
  providers: [
      AdminService
  ]
})
export class UserAddComponent implements OnInit {

  user = {
      name: '',
      username: ''
  };

  password: string = "";
  showPassword: boolean = false;

  @ViewChild('mWait') mWait;

  constructor(
              private _flash: FlashMessageService,
              private _admin: AdminService)
  {
  }

  ngOnInit() 
  {

  }

  submit() 
  {
      this.mWait.open();
      this._admin.addUser(this.user.name, this.user.username)
          .subscribe(
              d => {
                  this.password = d.password;
                  this.showPassword = true;
                  this.mWait.close();
              },
              d => {
                  this.mWait.close();
                  if (d.status === 409)
                      this._flash.addMessage(
                         "Error",
                         "The username is already taken.",
                         true, 
                         "danger",
                         2500,
                         2
                      );
                  else {
                      this._flash.addMessage("Error", "Unable to create the user.", true, "danger", 2500, 2);
                  }

                  console.log(d);
              }
          );
  }

}
