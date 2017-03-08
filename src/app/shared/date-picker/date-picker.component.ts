import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  years: number[] = [];
  days: number[] = [];
  months: string[] = [];

  @Input() startYear: number = 2010;
  @Input() endYear: number = 2020;
  @Input() year: number = this.years[0];
  @Input() month: number = 1;
  @Input() day: number = 1;

  @Output('on-change') change = new EventEmitter();


  constructor() { }

  ngOnInit() {
      for (let i=this.startYear; i<=this.endYear; i++) {
          this.years.push(i);
      }

      

  }



  onYearChange(value) {
      this.resetDays();
      this.emitDate();
  }

  onMonthChange(value){
      this.resetDays();
      this.emitDate();
  }

  onDayChange(value) {
      this.emitDate();
  }


  private emitDate(){
      let month: string = this.month.toString();
      let day: string = this.day.toString();
      if (+this.month < 10)
          month = "0" + month;
      if (+this.day < 10)
          day = "0" + day;
      
      let date = this.year + "-" + month + "-" + day;
      this.change.emit(date);
  }

  private resetDays(){
      this.days = [];
      let numberOfDays = 0;
      if (+this.month === 1 || +this.month === 3 || +this.month === 5
        || +this.month === 7 || +this.month === 8 || +this.month === 10 || +this.month === 12)
        numberOfDays = 31;
      
      else if (+this.month === 4 || +this.month === 6 || +this.month === 9 || +this.month === 11)
        numberOfDays = 30;

      else if (+this.month === 2)
        if (this.isLeapYear(this.year))
          numberOfDays = 29;
        else
          numberOfDays = 28;

      for (let i=1; i<=numberOfDays; i++) 
          this.days.push(i);
  }

  private isLeapYear(year: number):boolean {
      let x: boolean = (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
      return x  
  }

}
