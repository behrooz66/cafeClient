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
  mode: string = "loading";
  selectedValue: number;
  @Input() allowNone = true;
  @Input() defaultValue = 0;
  @Output('on-select') change = new EventEmitter();

  constructor(private _countryService:CountryService) { }

  ngOnInit() {
      this.mode = "loading";
      this._countryService.getCountries()
            .subscribe(d => {
                this.countries = d;
                this.selectedValue = this.defaultValue;
                this.onSelect(this.selectedValue);
                this.mode = "success";
            }, 
            d => {
                this.mode = "error";
            });
  }

  onSelect(value){
      this.change.emit({
          value: value,
          title: this.countries.filter(x => x.id == value)[0].name
      });
  }
}
