import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.css'],
  providers:[
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: MonthPickerComponent,
        multi: true
    }
  ]
})
export class MonthPickerComponent implements OnInit, AfterViewInit {
  @Input() date: string = "";

  year: number;
  month: string;
  year_month: string;

  mode:string = "loading";
  years: number[] = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018];
  months = [
    {
      value: '01',
      title: 'January'
    },
    {
      value: '02',
      title: 'February'
    },
    {
      value: '03',
      title: 'March'
    },
    {
      value: '04',
      title: 'April'
    },
    {
      value: '05',
      title: 'May'
    },
    {
      value: '06',
      title: 'June'
    },
    {
      value: '07',
      title: 'July'
    },
    {
      value: '08',
      title: 'August'
    },
    {
      value: '09',
      title: 'September'
    },
    {
      value: '10',
      title: 'November'
    },
    {
      value: '11',
      title: 'October'
    },
    {
      value: '12',
      title: 'December'
    },
  ];

  onChange: (_: any) => {};
  onTouched: () => {};

  constructor() { }

  ngOnInit() {
      this.year = 2017;
      this.month = "01";
      if (this.date.length === 7) {
          this.year = +this.date.substr(0, 4);
          this.month = this.date.substr(5, 2);
      }
      
      this.mode = "success";
  }

  ngAfterViewInit(){
      this.changed(this.year.toString() + '-' + this.month)
  }

  // NG-Modeling
  writeValue(value: any) {
     if (value !== undefined){
        this.date = value;
     }
  }

  registerOnChange(fn){
      this.onChange = fn;
  }

  registerOnTouched(fn: () => any) {
      this.onTouched = fn;
  }

  changed(value) {
      this.onChange(value);
  }
  // END NG-Modeling



}
