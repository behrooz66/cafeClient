import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { FlashMessageService } from '../../shared/flash-message/flash-message.service';
import { FlashMessage } from '../../shared/flash-message/flash-message';

@Component({
  selector: 'customer-history',
  templateUrl: './customer-history.component.html',
  styleUrls: ['./customer-history.component.css'],
  providers: [ CustomerService ]
})
export class CustomerHistoryComponent implements OnInit, OnDestroy {

  sub;
  history: any[] = [];
  
  @ViewChild('mWait') mWait;

  constructor(private _customerService: CustomerService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _flashMessage: FlashMessageService) { }


 ngOnInit() {
      this.mWait.open();
      let id: number;
      this.sub = this._activatedRoute.params.subscribe(
           params => {
              id = +params["id"];
           }
      );

      this._customerService.getHistory(id).subscribe(
        d => {
            this.history = d;
            this.mWait.close();
        },
        d => {
            this.mWait.close();
            this._flashMessage.addMessage("Error", "Error in retrieving history. Please refresh the page.", false, "danger", 2000, 2);
        }
      )
  }

  ngOnDestroy() {
      this.sub.unsubscribe();
  }

}
