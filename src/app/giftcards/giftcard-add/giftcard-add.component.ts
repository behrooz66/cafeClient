import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { GiftCardService } from '../giftcard.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { FlashMessageService } from '../../shared/flash-message/flash-message.service';
import { FlashMessage } from '../../shared/flash-message/flash-message';
import { GiftCard } from '../igiftcard';

import { NewGiftCardValidators } from './new-giftcard-validators';
import * as moment from 'moment';


@Component({
  selector: 'giftcard-add',
  templateUrl: './giftcard-add.component.html',
  styleUrls: ['./giftcard-add.component.css'],
  providers: [GiftCardService]
})
export class GiftCardAddComponent implements OnInit, OnDestroy {

  sub;
  customerId: number = 0;
  giftcard = new GiftCard();
  newGiftCardForm: FormGroup;

  onSubmitErrors: string[] = [];

  @ViewChild('mOnSumbitValidation') mOnSumbitValidation;
  waiting: boolean = false;

  constructor(private _fb: FormBuilder,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _flashMessage: FlashMessageService,
              private _giftcardService: GiftCardService) 
  {
      this.newGiftCardForm = this._fb.group({
          number: [''],
          amount: ['', Validators.compose([Validators.required, NewGiftCardValidators.amountInvalid])],
          issueDate: ['', Validators.compose([Validators.required, NewGiftCardValidators.dateInvalid])],
          expiryDate: ['', Validators.compose([Validators.required, NewGiftCardValidators.dateInvalid])],
          notes: [''],
          giftcardTypeId: ['', Validators.required]
      });

  }

  ngOnInit() {
      this.sub = this._activatedRoute.params.subscribe(params => {
          this.giftcard.customerId = +params["customerId"];
      });
      this.giftcard.amount = 0;
      this.giftcard.issueDate = moment().format("YYYY-MM-DD").toString();
      this.giftcard.expiryDate = "";
      //this.giftcard.giftCardTypeId = 1;
  }

  ngOnDestroy() {
      this.sub.unsubscribe();
  }

  cancel() {

  }

  private onSubmitValidation() {
      this.onSubmitErrors = [];
      if (this.newGiftCardForm.controls["issueDate"].invalid)
        this.onSubmitErrors.push("The issue date is not valid.");

      if (this.newGiftCardForm.controls["expiryDate"].invalid)
        this.onSubmitErrors.push("The expiry date is not valid.");

      if (this.newGiftCardForm.controls["amount"].invalid) 
        this.onSubmitErrors.push("The amount field is not valid.");
      
      if (this.onSubmitErrors.length > 0)
        return true;
      return false;
  }

  submit() {
      if (this.onSubmitValidation()) {
          this.mOnSumbitValidation.open();
      }
      else {
          this.waiting = true;
          this._giftcardService.post(this.giftcard)
              .subscribe(d => {
                  this._flashMessage.addMessage("", "Gift Card successfully added.", true, "success", 2500, 2);
                  this._router.navigate(["/giftcards/list/", this.giftcard.customerId]);
              },
              d => {
                  this._flashMessage.addMessage("Error", "Unable to add the gift card. Please contact support if this recurring.", false, "danger", 2500, 2);
                  this.waiting = false;
              },
              () => {
                  this.waiting = false;
              });
      }
  }

}
