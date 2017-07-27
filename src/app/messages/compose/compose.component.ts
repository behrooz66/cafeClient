import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessagesService } from '../messages.service';
import { FlashMessageService } from '../../shared/flash-message/flash-message.service';
import { AuthService } from '../../account/auth.service';

@Component({
  selector: 'msg-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css'],
  providers: [ MessagesService ]
})
export class ComposeComponent implements OnInit, OnDestroy {

  sub;
  message = {
      subject: "",
      body: "",
      receiverIds: [],
      replyToMessageId: null
  };

  users = [];
  msgForm: FormGroup;

  constructor(fb: FormBuilder,
              private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _msg: MessagesService,
              private _flash: FlashMessageService,
              private _auth:AuthService) 
  {
      this.msgForm = fb.group({
          subject: ['', Validators.required, null],
          body: ['', Validators.required, null],
          receiverIds: ['', Validators.required, null],
          replyToMessageId: ['', null, null]
      });
  }

  ngOnInit() 
  {
        this.sub = this._activatedRoute.params.subscribe(
            params => {
                this.message.replyToMessageId = +params["id"];
                if (this.message.replyToMessageId)
                    this.getOriginalMessage();
                this.getUsers();
            }
        );
  }

  refresh() 
  {

  }

  getOriginalMessage()
  {
      this._msg.getMessageById(this.message.replyToMessageId)
            .subscribe(
                d => {
                    this.message.subject = "RE: " + d.subject;
                    this.message.body = "\n \\- - - - - - - - - - - - - - - - - - - - - \\ \n" + 
                                        "Original Message: \n" + 
                                        d.body + 
                                        "\n \\- - - - - - - - - - - - - - - - - - - - - \\";
                },
                d => {
                    this._flash.addMessage("Error", "Could not retrieve original message", true, "danger", 2500, 2);
                }
            );
  }

  getUsers()
  {
        this._msg.getUsers().subscribe(
            d => {
                this.users = d;
                
                // removing the self users from recipients list
                let k = this.users.filter(u => u.id == this._auth.getUserId())[0];
                let k2 = this.users.indexOf(k);
                this.users.splice(k2, 1);
            },
            d => {
                this._flash.addMessage("Error", "Could not retrieve users list", true, "danger", 2500, 2);
            });
  }

  submit() 
  {
        let replyId: number = null;
        if (this.message.replyToMessageId === 0) replyId = null;
        else replyId = this.message.replyToMessageId;

        this._msg.sendMessage({
            senderId: this._auth.getUserId(),
            receiverIds: this.message.receiverIds,
            subject: this.message.subject,
            body: this.message.body,
            replyToMessageId: replyId
        })
        .subscribe(
            d => {
                this._flash.addMessage("Success", "Message was sent.", true, "success", 2500, 2);
                setTimeout(() => {
                    this._router.navigate(['/messages/sent']);
                }, 1000);
            },
            d => {
                this._flash.addMessage("Error", "Could not send the message", true, "danger", 2500, 2);
            }
        );
  }

  change(x){
      if (this.message.receiverIds.indexOf(x) !== -1)
         this.message.receiverIds.splice(this.message.receiverIds.indexOf(x), 1);
      else 
         this.message.receiverIds.push(x);
  }

  ngOnDestroy()
  {
      this.sub.unsubscribe();
  }

}
