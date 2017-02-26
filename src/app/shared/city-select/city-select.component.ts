import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { CityService } from './city.service';

@Component({
  selector: 'city-select',
  templateUrl: './city-select.component.html',
  styleUrls: ['./city-select.component.css'],
  providers: [CityService]
})
export class CitySelectComponent implements OnInit, OnChanges {
  cities = {
      data: [],
      mode: "loading",
      selectedValue: 0
  };

  provinces = {
      data: [],
      mode: "loading",
      selectedValue: 0
  };
  
  countries = {
      data: [],
      mode: "loading",
      selectedValue: 0
  };

  @Input() allowNone = true;
  @Input() countryId = 0;
  @Input() provinceId = 0;
  @Input() cityId = 0;
  @Output('on-country-change') countryChange = new EventEmitter();
  @Output('on-province-change') provinceChange = new EventEmitter();
  @Output('on-city-change') cityChange = new EventEmitter();

  constructor(private _cityService:CityService) { }

  ngOnInit() {
      //this.update();
      this.initial();
  }

  ngOnChanges(){
      //this.update();
  }

  initial(){
      this.updateCountries();
      if (this.countryId == 0) {
          this.provinces.mode = "waiting";
          this.cities.mode = "waiting";
      }
      if (this.provinceId != 0) {
          this.updateProvinces();
          this.updateCities();
      }
  }

  onCountryChange(value){
      this.countryId = value;
      this.updateProvinces();
      this.cityId = 0;
      this.countryChange.emit({
          id: value,
          title: this.countries.data.filter(x => x.id == value)[0].name
      });
  }

  onProvinceChange(value) {
      this.updateCities();
      this.provinceId = value;
  }

  onCityChange(value) {
      this.cityId = value;
  }

  updateCountries() {
      this._cityService.getCountries().subscribe(
          d => {
              this.countries.data = d;
              this.countries.selectedValue = this.countryId;
              this.countries.mode = "success";
          },
          d => {
              console.log("countries not found");
              this.countries.mode = "error";
          }
      );
  }

  updateProvinces() {
       this._cityService.getProvinces(this.countryId).subscribe(
          d => {
              this.provinces.data = d;
              this.provinces.selectedValue = this.provinceId;
              this.provinces.mode = "success";
          },
          d => {
              console.log("provinces not found");
              this.provinces.mode = "error";
          });
  }

  updateCities() {
      this._cityService.getCities(this.provinceId).subscribe(
          d => {
              this.cities.data = d;
              this.cities.selectedValue = this.cityId;
              this.cities.mode = "success";
          },
          d => {
              console.log("cities not found");
              this.cities.mode = "error";
          }
      )
  }

  // onSelect(value){
  //     this.change.emit({
  //       value: value,
  //       title: this.cities.filter(x => x.id == value)[0].name
  //     });
  // }

  // update(){
  //     this.mode = "loading";
  //     this._cityService.getCities(this.provinceId)
  //                      .subscribe(d => {
  //                         this.cities = d;
  //                         this.selectedValue = this.defaultValue;
  //                         console.log("selected value:", this.selectedValue);
  //                         try {
  //                           this.onSelect(this.selectedValue);
  //                         }
  //                         catch(e){
  //                           this.defaultValue = this.cities[0].id;
  //                           this.onSelect(this.selectedValue);
  //                         }
  //                         this.mode = "success";
  //                      },
  //                      d => {
  //                         this.mode = "error";
  //                      });
  // }

}
