import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReservationService } from '../reservation.service';
import { ActivatedRoute, Router} from '@angular/router';
import { Reservation } from '../ireservation';
import { ModalComponent } from '../../shared/modal/modal.component';
import { FlashMessageService } from '../../shared/flash-message/flash-message.service';
import { FlashMessage } from '../../shared/flash-message/flash-message';

import { EditReservationValidators } from './edit-reservation-validators';
import * as moment from 'moment';

@Component({
  selector: 'reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.css'],
  providers: [ReservationService]
})

export class ReservationEditComponent implements OnInit, OnDestroy {


  sub;
  customerId: number = 0;
  reservation = new Reservation();
  editReservationForm: FormGroup;

  onSubmitErrors: string[] = [];

  @ViewChild('mOnSumbitValidation') mOnSumbitValidation;
  waiting: boolean = false;

  constructor(private _fb: FormBuilder,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _flashMessage: FlashMessageService,
              private _reservationService: ReservationService) 
  {
      this.editReservationForm = this._fb.group({
            numberOfPeople: [this.reservation.numberOfPeople, [Validators.compose([Validators.required, EditReservationValidators.numberOfPeopleInvalid] )], ],
            date: [this.reservation.date, [Validators.compose([Validators.required, EditReservationValidators.dateInvalid] )]],
            time: [this.reservation.time, Validators.required],
            table: [this.reservation.table, , ],
            notes: [this.reservation.notes, , ],
            revenue: [this.reservation.revenue,[Validators.compose([EditReservationValidators.revenueInvalid] )],],
            reservationStatusId:[this.reservation.reservationStatusId, Validators.required],
        });
  }

  ngOnInit() {
      this.sub = this._activatedRoute.params.subscribe(params => {
          let id = +params["id"];
          this._reservationService.getReservation(id)
              .subscribe(
                  d => {
                      this.reservation.id = id;
                      this.reservation.customerId = d.customerId;
                      this.reservation.date = d.date.substr(0,10);
                      this.reservation.notes = d.notes;
                      this.reservation.numberOfPeople = d.numberOfPeople;
                      this.reservation.reservationStatusId = d.reservationStatusId;
                      this.reservation.revenue = d.revenue;
                      this.reservation.table = d.table;
                      this.reservation.time = d.time;
                      this.reservation.updatedAt = d.updatedAt;
                      this.reservation.updatedBy = d.updatedBy;
                  },
                  d => {
                      this._flashMessage.addMessage("Error", "Error in retrieving reservation. Please refresh the page.", false, "danger", 2500, 2);
                  }
              );
      });
  }

  ngOnDestroy() {
      this.sub.unsubscribe();
  }

  cancel() {
      
  }

  private onSubmitValidation() {
      this.onSubmitErrors = [];
      if (this.editReservationForm.controls["date"].invalid)
        this.onSubmitErrors.push("The date is not valid.");

      if (this.editReservationForm.controls["revenue"].invalid) 
        this.onSubmitErrors.push("The revenue is not valid.");
    
      if (!this.editReservationForm.controls["numberOfPeople"])
        this.onSubmitErrors.push("Number of people is not valid.");
      
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
          this._reservationService.put(this.reservation.id, this.reservation)
              .subscribe(
                  d => {
                      this._flashMessage.addMessage("", "Reservation successfully updated.", true, "success", 2500, 2);
                      this._router.navigate(["/reservations/list/", this.reservation.customerId]);
                  },
                  d => {
                      this._flashMessage.addMessage("Error", "Unable to add the reservation. Please contact support if this recurring.", false, "danger", 2500, 2);
                      this.waiting = false;
                  },
                  () => {
                      this.waiting = false;
                  }
              );
      }
  }


}
