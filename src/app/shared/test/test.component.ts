import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers:[
      { 
        provide: NG_VALUE_ACCESSOR,
        useExisting: TestComponent,
        multi: true
      }
  ]
})
export class TestComponent implements OnInit, ControlValueAccessor {

  @Input() value:string = "";

  constructor() { }

  ngOnInit() {
  }

  writeValue(value: any) {
      if (value !== undefined)
        this.value = value;
  }

  registerOnChange(fn) {
      this.value = fn;
  }

  registerOnTouched(fn) {

  }



}
