import { Injectable, EventEmitter } from '@angular/core';
import { FlashMessage } from './flash-message';

@Injectable()
export class FlashMessageService {

  messages: FlashMessage[] = [];
  messagesChanged: EventEmitter<FlashMessage[]>;

  constructor() {
      this.messagesChanged = new EventEmitter();
  }

  addMessage(title: string, body: string, autoClose: boolean, style: string, showTime: number, size: number) {
      let fm = new FlashMessage(title, body, autoClose, style, showTime, size);
      this.messages.push(fm);
      this.messagesChanged.emit(this.messages);
      if (autoClose){
          setTimeout(() => {
              this.messages.splice(this.messages.indexOf(fm), 1);
          }, showTime);
      }
  }

  removeMessage(id: number){
      let fm:FlashMessage = this.messages.filter(m => m.id == id)[0];
      this.messages.splice(this.messages.indexOf(fm),1);
  }





}
