import { Component, OnInit } from '@angular/core';
import { FlashMessageService } from './shared/flash-message/flash-message.service';
import { FlashMessage } from './shared/flash-message/flash-message';
import { AuthService } from './account/auth.service';
import { Observable } from "rxjs/Observable";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'app works!';
  flashMessages: FlashMessage[] = [];

  isLoggedIn: boolean = false;
  role: string = "";
  username: string = "";

  constructor(private _flashMsg: FlashMessageService,
              private _auth: AuthService){
      
  }

  ngOnInit(){
      this._flashMsg.messagesChanged.subscribe(
          d => this.flashMessages = d
      )

      this._auth.isUserLoggedIn()
            .subscribe(
                d => {
                    if (d)
                    {
                        this.isLoggedIn = true;
                        //this.isManager = this._auth.isManager();
                        this.role = this._auth.getRole();
                        this.username = this._auth.getUsername();
                    }
                    else {
                        this.isLoggedIn = false;    
                        this.role = "";
                    }
                },
                d => {
                    //this._flashMsg.addMessage("Error", "An error has happened in authentication.", true, "danger", 3500, 2);
                },
                () => {
                    
                }
            );
  }

  addMsg(){
      this._flashMsg.addMessage("salam!", "kir!", false, "danger", 3000, 3);
  }

  addMsg2() {
      this._flashMsg.addMessage("bye!", "koon!", true, "success", 3000, 2);
  }

  removeMessage($event){
      this._flashMsg.removeMessage($event);
  }

}
