import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReservationStatusesService } from './reservation-statuses.service';

@Component({
  selector: 'reservation-statuses',
  templateUrl: './reservation-statuses.component.html',
  styleUrls: ['./reservation-statuses.component.css'],
  providers: [ 
    ReservationStatusesService,
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: ReservationStatusesComponent,
        multi: true
    } ]
})
export class ReservationStatusesComponent implements OnInit, ControlValueAccessor {

  mode: string = "";
  statuses: any[] = [];
  statusId: number = 0;
  @Input() allowNone: boolean = false;

  onChange: (_:any) => {}
  onTouched: () => {}

  constructor(private _statuses:ReservationStatusesService) { }

  ngOnInit() {

      this.mode = "loading";
      this._statuses.getStatuses()
          .subscribe(
              d => {
                  this.statuses = d;
                  this.mode = "success";
              },
              d => {
                  this.mode = "fail";
              }
      );
  }

  writeValue(value:any) {
      if (value !== undefined)
         this.statusId = +value;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  changed(value) {
      this.onChange(+value);
  }

}
