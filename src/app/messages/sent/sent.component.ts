import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';
import { FlashMessageService } from '../../shared/flash-message/flash-message.service';
import { RecordService } from '../../shared/record.service';
import { AuthService } from '../../account/auth.service';
import { Settings } from '../../settings';

@Component({
  selector: 'msg-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css'],
  providers: [ 
      //MessagesService
      , RecordService ]
})
export class SentComponent implements OnInit {

  messages: any[] = [];

  body: string = "";
  showBody: boolean = false;

  pageInfo = {
      pageSize: 5,
      index: 0
  };
  pageRecords: any[] = [];
  pages: any[] = [];

  waiting = false;

  constructor(private _msg: MessagesService,
              private _auth: AuthService,
              private _flash: FlashMessageService,
              private _record: RecordService) 
  { }

  ngOnInit() 
  {
      this.pageInfo.pageSize = Settings.messages.pageSize;
      this.refresh();
  }

  refresh() 
  {
      this.waiting = true;
      this._msg.getMessagesBySender(this._auth.getUserId())
          .subscribe(
              d => {
                  this.messages = d;
                  this.pageSetup();
                  this.waiting = false;
              },
              d => {
                  this.waiting = false;
                  this._flash.addMessage("Error", "Could not retrieve messages.", true, "danger", 2500, 2);
              }
          );
  }

  //** Paging */

  private pageSetup()
  {
      let temp = this._record.getPageItems(this.messages, null, null, this.pageInfo);
      this.pageRecords = temp.data;
      this.pages = new Array(temp.numberOfPages);
      if (this.pageRecords.length === 0 && this.pageInfo.index > 0) {
          this.pageInfo.index--;
          this.pageSetup();
      }
  }

  private setPage(i) {
      this.pageInfo.index = i;
      this.pageSetup();
  }

  private firstPage(){
      this.pageInfo.index = 0;
      this.pageSetup();
  }

  private lastPage(){
      this.pageInfo.index = this.pages.length - 1;
      this.pageSetup();
  }

  private nextPage() {
      if (this.pageInfo.index < this.pages.length - 1)
      {
          this.pageInfo.index ++;
          this.pageSetup();
      }
  }

  private prevPage() {
      if (this.pageInfo.index > 0)
      {
          this.pageInfo.index--;
          this.pageSetup();
      }
  }

  pageSizeChange(){
      this.pageSetup();
      Settings.messages.pageSize = this.pageInfo.pageSize;
  }

}
