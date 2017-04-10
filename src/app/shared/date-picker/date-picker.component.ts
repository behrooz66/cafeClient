import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class DatePickerComponent implements OnInit {

  arr;
  monthName: string = "";
  year: number = 0;
  years: number[][] = [];
  months: string[] = [];
  monthIndex: number = 0;
  view: string = "calendar";  // and months, and years...
  hidden: boolean = true;

  @Input() defaultDate = "";
  @Output('change') change = new EventEmitter();

  DATE:string = "";

  constructor(private _eref:ElementRef) { }

  onClick(event) {
     if (!this._eref.nativeElement.contains(event.target)) // or some similar check
       this.onBlur();
  }

  ngOnInit() {
      this.make(moment().toDate());
      this.monthIndex = moment().month();
  }

  setDate(day){
      if (day < 10) day = "0" + day;
      let m = + this.monthIndex+1;
      let mm:string = m.toString();
      if (m < 10) mm = "0" + mm;
      this.DATE = this.year +"-" + mm + "-" + day;
      this.hidden = true;
      this.onChange();
  }

  make(date: Date) {
      this.arr = this.getMonthArray(date);
      this.monthName = moment.months(moment(date).month());
      this.year = moment(date).year();
  }

  private getMonthArray(date: Date) {
      let arr:number[][];
      arr = [];
      for (let i=0; i<6; i++) {
          arr[i] = [];
      }

      let daysInMonth = moment(date).daysInMonth();
      let startIndex = this.getFirstDayIndex(date);

      let count = 0;

      for (let i=0; i < 6; i++) {
          for (let j=0; j < 7; j++) {
              if (i==0 && j < startIndex) {
                  arr[i][j]=0;
                  continue;
              }
              if (i>=4 && count >= daysInMonth) {
                  arr[i][j]=0;
                  continue;
              }
              arr[i][j] = ++count;
          }
      }
      return arr;
  }

  private getFirstDayIndex(date: Date){
      let newDate = new Date(date.getFullYear(), date.getMonth(), 0);
      let index = moment(newDate).day()+1;
      return index;
  }

  private next(){
      this.monthIndex++;
      let td = new Date(this.year, this.monthIndex);
      let d = moment(td).toDate();
      this.make(d);
  }

  private prev(){
      this.monthIndex--;
      let td = new Date(this.year, this.monthIndex);
      let d = moment(td).toDate();
      this.make(d);
  }

  private monthsView(){
      this.view = "months";
      this.months[0] = "Jan";
      this.months[1] = "Feb";
      this.months[2] = "Mar";
      this.months[3] = "Apr";
      this.months[4] = "May";
      this.months[5] = "Jun";
      this.months[6] = "Jul";
      this.months[7] = "Aug";
      this.months[8] = "Sep";
      this.months[9] = "Oct";
      this.months[10] = "Nov";
      this.months[11] = "Dec";
  }

  private yearsView(){
      this.view = "years";
      for (let i=0; i<3; i++)
          this.years[i] = [];
      
      let count = 6;
      for (let i=0; i<3; i++) {
          for (let j=0; j<4; j++) {
              this.years[i][j] = Math.abs((--count) - this.year);
          }
      }
      console.log(this.years);
  }

  private calendarView(){
      this.view = "calendar";
  }

  private setYear(val: number) {
      let diff = val - moment().year();
      this.make(moment(new Date(moment().year(), this.monthIndex)).add(diff, 'years').toDate());
      this.view = "calendar";
  }

  private setMonth(index: number) {
      let d = new Date(this.year, index);
      this.monthIndex = index;
      this.make(moment(d).toDate());
      this.view = "calendar";
  }

  private onFocus(){
      this.hidden = false;
  }

  private onBlur(){
      this.hidden = true;
  }

  private onChange(){
      this.change.emit(this.DATE);
  }

}
