import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CityService } from './city.service';

@Component({
  selector: 'city-select',
  templateUrl: './city-select.component.html',
  styleUrls: ['./city-select.component.css'],
  providers: [CityService]
})
export class CitySelectComponent implements OnInit {
  cities;
  selectedValue: number;
  @Input() allowNone = true;
  @Input() defaultValue = 0;
  @Output('on-select') change = new EventEmitter();

  constructor(private _cityService:CityService) { }

  ngOnInit() {
      this.cities = this._cityService.getCities();
      this.selectedValue = this.defaultValue;
  }

  onSelect(value){
      this.change.emit({
          value: value
      });
  }

}
