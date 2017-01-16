import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { CountryService } from './country.service';
@Component({
  selector: 'country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.css'],
  providers: [CountryService]
})
export class CountrySelectComponent implements OnInit {

  countries;
  selectedValue: number;
  @Input() allowNone = true;
  @Input() defaultValue = 0;
  @Output('on-select') change = new EventEmitter();

  constructor(private _countryService:CountryService) { }

  ngOnInit() {
      this.countries = this._countryService.getCountries();
      this.selectedValue = this.defaultValue;
  }

  onSelect(value){
      this.change.emit({
          value: value
      });
  }
}
