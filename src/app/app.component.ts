import { Component, OnInit } from '@angular/core';
import { FlashMessageService } from './shared/flash-message/flash-message.service';
import { FlashMessage } from './shared/flash-message/flash-message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'app works!';
  flashMessages: FlashMessage[] = [];

  constructor(private _flashMsg:FlashMessageService){

  }

  ngOnInit(){
      this._flashMsg.messagesChanged.subscribe(
          d => this.flashMessages = d
      )
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
