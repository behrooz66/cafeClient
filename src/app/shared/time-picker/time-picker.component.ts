import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css'],
  providers: [
      {
          provide: NG_VALUE_ACCESSOR,
          useExisting: TimePickerComponent,
          multi: true
      }
  ]
})
export class TimePickerComponent implements OnInit, ControlValueAccessor {

  hours:string[] = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  minutes:string[] = ["00", "15", "30", "45"];
  ampm:string[] = ["PM", "AM"];

  time: string = "";

  @Input() hh:string = "06";
  @Input() mm:string = "30";
  @Input() ap:string = "PM";
  @Output('on-change') change = new EventEmitter();

  onChange: (_:any) => {}
  onTouched: () => {}

  constructor() { }

  ngOnInit() {
    
  }

  changed() {
      let h:number = Number(this.hh);
      let H:string = h.toString();
      if (this.ap === "PM"){
         h += +12;
         H = h.toString();
      }
      if (H.length === 1)
        H = "0" + H;
      let T = H + ":" + this.mm;
      this.onChange(T);
  }

  writeValue(value:any) {
      if (value !== undefined)
         this.time = value;
  }

  registerOnChange(fn){
      this.onChange = fn;
  }

  registerOnTouched(fn){
    this.onTouched = fn;
  }

}
