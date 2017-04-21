import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
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
export class TimePickerComponent implements OnInit, ControlValueAccessor, OnChanges {

  hours:string[] = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  minutes:string[] = ["00", "15", "30", "45"];
  ampm:string[] = ["PM", "AM"];

  time: string = "";

  hh:string = "06";
  mm:string = "30";
  ap:string = "PM";
  @Input() default:string = "18:30";
//  @Output('on-change') change = new EventEmitter();

  onChange: (_:any) => {}
  onTouched: () => {}

  constructor() { }

  ngOnInit() {

  }


 
  ngOnChanges(changes){
      if (changes.default.currentValue){
            let h:number = Number(changes.default.currentValue.substr(0,2));
            if (h > 12) {
                this.ap = "PM";
                this.hh = (h - 12).toString();
                if (this.hh.length === 1) this.hh = "0" + this.hh;
            }
            this.mm = this.default.substr(3,2);
      }
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
