import { Injectable } from '@angular/core';
import { Settings } from '../settings';
import { HttpAuthService } from '../shared/http-auth.service';

//import { Observable } from 'rxjs/Rx';
//import 'rxjs/add/operator/map';
import { Subject } from "rxjs/Subject";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MessagesService {

  apiBase: string;
  constructor(private _http: HttpAuthService) 
  {
      this.apiBase = Settings.apiBase + 'message/';
  }

  getUsers()
  {
      return this._http.get(this.apiBase + 'getUsers')
          .map(res => res.json());
  }

  getMessagesByReceiver(receiverId: string)
  {
      return this._http.get(this.apiBase + 'getByReceiver/' + receiverId)
          .map(res => res.json());
  }

  getMessagesBySender(senderId: string)
  {
      return this._http.get(this.apiBase + 'getBySender/' + senderId)
          .map(res => res.json());
  }

  getMessageById(id: number)
  {
      return this._http.get(this.apiBase + 'getById/' + id.toString())
          .map(res => res.json());
  }

  sendMessage(message: any) 
  {
      return this._http.post(this.apiBase + 'send', {
          senderId: message.senderId,
          receiverIds: message.receiverIds,
          subject: message.subject,
          body: message.body,
          replyToMessageId: message.replyToMessageId
      });
  }

  markAsRead(id: number)
  {
      return this._http.put(this.apiBase + 'markAsRead/' + id, {});
  }

  markAsUnread(id: number)
  {
      return this._http.put(this.apiBase + 'markAsUnread/' + id, {});
  }

  getNewMessagesCount()
  {
      return this._http.get(this.apiBase + 'getNewMessagesCount')
            .map(res => res.json());
  }

  private countChanged = new BehaviorSubject<boolean>(false);
  isCountChanged(): Observable<boolean>
  {
      return this.countChanged.asObservable();
  }

  next(){
      this.countChanged.next(true);
  }

}
