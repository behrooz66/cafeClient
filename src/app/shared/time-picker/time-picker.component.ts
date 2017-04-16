import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent implements OnInit {

  hours:string[] = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  minutes:string[] = ["00", "15", "30", "45"];
  ampm:string[] = ["PM", "AM"];

  @Input() hh:string = "06";
  @Input() mm:string = "30";
  @Input() ap:string = "PM";
  @Output('on-change') change = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.onChange();
  }

  onChange(){
      let time = this.hh + ":" + this.mm + " " + this.ap;
      this.change.emit(time);
      console.log(time);
  }

}
