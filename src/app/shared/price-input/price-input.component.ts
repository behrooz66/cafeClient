import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'price-input',
  templateUrl: './price-input.component.html',
  styleUrls: ['./price-input.component.css'],
  providers:[
      {
          provide: NG_VALUE_ACCESSOR,
          useExisting: PriceInputComponent,
          multi: true
      }
  ]
})
export class PriceInputComponent implements OnInit, ControlValueAccessor {

  @Input() price: number = 0;
  @Input() min: number = 0;
  @Input() max: number = 100000;
  @Input() required: boolean = false;

  isValid: boolean = true;

  onChange: (_: any) => {};
  onTouched: () => {}

  constructor() { }

  ngOnInit() {
      
  }

  writeValue(value: any) {
        if (value !== undefined)
            this.price = +value;
  }

  registerOnChange(fn) {
        this.onChange = fn;
  }

  registerOnTouched(fn) {
        this.onTouched = fn;
  }

  changed() {
      if (this.price < this.min)
          this.price = this.min;
      if (this.price > this.max)
          this.price = this.max;
      if (this.required && !this.price)
          this.price = this.min;

      this.onChange(+this.price);
  }

  private onKeyDown(e) {
      if (e.keyCode === 8 || e.keyCode === 9 || e.keyCode === 37 || e.keyCode === 39)
          return;
      if ((e.keyCode < 48 || e.keyCode > 57) && e.keyCode !== 190)
         e.preventDefault();
  }



}
