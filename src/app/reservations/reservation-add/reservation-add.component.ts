import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReservationService } from '../reservation.service';
import { ActivatedRoute, Router} from '@angular/router';
import { Reservation } from '../ireservation';
import { ModalComponent } from '../../shared/modal/modal.component';
import { FlashMessageService } from '../../shared/flash-message/flash-message.service';
import { FlashMessage } from '../../shared/flash-message/flash-message';

import { NewReservationValidators } from './new-reservation-validators';
import * as moment from 'moment';

@Component({
  selector: 'reservation-add',
  templateUrl: './reservation-add.component.html',
  styleUrls: ['./reservation-add.component.css'],
  providers: [ReservationService]
})
export class ReservationAddComponent implements OnInit, OnDestroy{

  sub;
  customerId: number = 0;
  reservation = new Reservation();
  newReservationForm: FormGroup;

  onSubmitErrors: string[] = [];

  @ViewChild('mOnSumbitValidation') mOnSumbitValidation;
  @ViewChild('mWait') mWait;

  constructor(private _fb: FormBuilder,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _flashMessage: FlashMessageService,
              private _reservationService: ReservationService) 
  {
        this.newReservationForm = this._fb.group({
            numberOfPeople: ['', [Validators.compose([Validators.required, NewReservationValidators.numberOfPeopleInvalid] )], ],
            date: ['', [Validators.compose([Validators.required, NewReservationValidators.dateInvalid] )]],
            time: ['', Validators.required],
            table: ['', , ],
            notes: ['', , ],
            revenue: ['',[Validators.compose([NewReservationValidators.revenueInvalid] )],],
            reservationStatusId:['', Validators.required],
        });
  }

  ngOnInit() {
      this.sub = this._activatedRoute.params.subscribe(params => {
          this.customerId = +params["customerId"];
          this.reservation.customerId = this.customerId;
      });
      this.reservation.date = moment().add(1, "days").format("YYYY-MM-DD").toString();
      this.reservation.time = "18:30";
      this.reservation.reservationStatusId = 1;
      this.reservation.revenue = 0;
      this.reservation.numberOfPeople = 2;
  }

  ngOnDestroy() {
      this.sub.unsubscribe();
  }

  cancel() {
      
  }

  private onSubmitValidation() {
      this.onSubmitErrors = [];
      if (this.newReservationForm.controls["date"].invalid)
        this.onSubmitErrors.push("The date is not valid.");

      if (this.newReservationForm.controls["revenue"].invalid) 
        this.onSubmitErrors.push("The revenue is not valid.");
    
      if (!this.newReservationForm.controls["numberOfPeople"])
        this.onSubmitErrors.push("Number of people is not valid.");
      
      if (this.onSubmitErrors.length > 0)
        return true;
      return false;
  }

  submit() {
      if (this.onSubmitValidation()){
          this.mOnSumbitValidation.open();
      }
      else {
          this.mWait.open();
          this._reservationService.post(this.reservation)
              .subscribe(d => {
                  this._flashMessage.addMessage("", "Reservation successfully added.", true, "success", 2500, 2);
                  this._router.navigate(["/reservations/list/", this.reservation.customerId]);
              }, 
              d => {
                  this._flashMessage.addMessage("Error", "Unable to add the reservation. Please contact support if this recurring.", false, "danger", 2500, 2);
                  this.mWait.close();
              },
              () => {
                  this.mWait.close();
              });
      }
  }

}
