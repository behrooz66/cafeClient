import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessagesService } from '../messages.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessageService } from '../../shared/flash-message/flash-message.service';
//import { RecordService } from '../../shared/record.service';
import { AuthService } from '../../account/auth.service';
import { Settings } from '../../settings';


@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.css'],
  providers: [
      //MessagesService
  ]
})
export class MessageViewComponent implements OnInit, OnDestroy {

  sub;
  id: number;
  message: any = {};

  waiting: boolean = false;

  constructor(private _msg: MessagesService,
              private _activatedRoute: ActivatedRoute,
              private _flash: FlashMessageService,
              private _router: Router)
  { }

  ngOnInit() 
  {
      this.waiting = true;
      this.sub = this._activatedRoute.params.subscribe(
        params => {
            this.id = +params["id"];
            this._msg.markAsRead(this.id).subscribe(d => {
                this._msg.next();
            });
            
            this._msg.getMessageById(this.id).subscribe(
                d => {
                    this.message = d;
                    this.waiting = false;
                },
                d => {
                    this.waiting = false;
                    this._flash.addMessage("Error", "Message could not be retrieved.", true, "danger", 2500, 2);
                }
            );
        }
      );

      
  }

  reply()
  {
      this._router.navigate(['/messages/compose', +this.id]);
  }

  delete()
  {

  }

  ngOnDestroy() 
  {
      this.sub.unsubscribe();
  }



}
