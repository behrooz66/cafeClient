import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GiftCardService } from '../giftcard.service';
import { ActivatedRoute, Router} from '@angular/router';
import { GiftCard } from '../igiftcard';
import { ModalComponent } from '../../shared/modal/modal.component';
import { FlashMessageService } from '../../shared/flash-message/flash-message.service';
import { FlashMessage } from '../../shared/flash-message/flash-message';

import { EditGiftCardValidators } from './edit-giftcard-validators';
import * as moment from 'moment';

@Component({
  selector: 'giftcard-edit',
  templateUrl: './giftcard-edit.component.html',
  styleUrls: ['./giftcard-edit.component.css'],
  providers: [GiftCardService]
})

export class GiftCardEditComponent implements OnInit, OnDestroy {

  sub;
  customerId: number = 0;
  giftcard  = new GiftCard();
  editGiftCardForm: FormGroup;

  onSubmitErrors: string[] = [];

  @ViewChild('mOnSumbitValidation') mOnSumbitValidation;
  waiting: boolean = false;

  constructor(private _fb: FormBuilder,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _flashMessage: FlashMessageService,
              private _giftcardService: GiftCardService)  
  {
      this.editGiftCardForm = this._fb.group({
          number: [this.giftcard.number, Validators.required],
          amount: [this.giftcard.amount, Validators.compose([Validators.required, EditGiftCardValidators.amountInvalid])],
          issueDate: [this.giftcard.issueDate, Validators.compose([Validators.required, EditGiftCardValidators.dateInvalid])],
          expiryDate: [this.giftcard.issueDate, Validators.compose([Validators.required, EditGiftCardValidators.dateInvalid])],
          giftcardTypeId: [this.giftcard.giftCardTypeId, Validators.required],
          notes: [this.giftcard.notes]
      });
  }

  ngOnInit() {
      this.sub = this._activatedRoute.params.subscribe(params => {
          let id = +params["id"];
          this._giftcardService.getGiftCard(id)
              .subscribe(
                  d => {
                      this.giftcard.id = id;
                      this.giftcard.number = d.number;
                      this.giftcard.issueDate = d.issueDate.substr(0,10);
                      this.giftcard.expiryDate = d.expiryDate.substr(0,10);
                      this.giftcard.amount = d.amount;
                      this.giftcard.notes = d.notes;
                      this.giftcard.updatedAt = d.updatedAt;
                      this.giftcard.updatedBy = d.updatedBy;
                      this.giftcard.deleted = d.deleted;
                      this.giftcard.giftCardTypeId = d.giftCardTypeId;
                      this.giftcard.customerId = d.customerId;
                  },
                  d => {
                      this._flashMessage.addMessage("Error", "Error in retrieving gift card. Please refresh the page.", false, "danger", 2500, 2);
                  }
              );
      });
  }

  ngOnDestroy(){
      this.sub.unsubscribe();
  }

  cancel() {

  }

  private onSubmitValidation() {
      this.onSubmitErrors = [];
      if (this.editGiftCardForm.controls["issueDate"].invalid)
        this.onSubmitErrors.push("The issue date is not valid.");

      if (this.editGiftCardForm.controls["expiryDate"].invalid)
        this.onSubmitErrors.push("The expiry date is not valid.");

      if (this.editGiftCardForm.controls["amount"].invalid) 
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
          this._giftcardService.put(this.giftcard.id, this.giftcard)
              .subscribe(
                  d => {
                      this._flashMessage.addMessage("", "Gift card successfully updated.", true, "success", 2500, 2);
                      this._router.navigate(["/giftcards/list/", this.giftcard.customerId]);
                  },
                  d => {
                      this._flashMessage.addMessage("Error", "Unable to add the gift card. Please contact support if this recurring.", false, "danger", 2500, 2);
                      this.waiting = false;
                  },
                  () => {
                      this.waiting = false;
                  }
              );
      }
        
  }


}
