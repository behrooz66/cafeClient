import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ProvinceService } from './province.service';
import { Settings } from '../../settings';

@Component({
  selector: 'province-select',
  templateUrl: './province-select.component.html',
  styleUrls: ['./province-select.component.css'],
  providers: [ProvinceService]
})
export class ProvinceSelectComponent implements OnInit, OnChanges {

  provinces = [];
  mode: string = "loading";
  selectedValue: number;
  @Input() allowNone = true;
  @Input() countryId = 0;
  @Input() defaultValue = 0;
  @Output('on-select') change = new EventEmitter();

  constructor(private _provinceService:ProvinceService) { }

  ngOnInit() {
      this.update();
  }

  ngOnChanges(){
      this.update();
  }

  onSelect(value){
      this.change.emit({
          value: value,
          title: this.provinces.filter(x => x.id == value)[0].name
      });
  }

  update(){
      this.mode = "loading";
      this._provinceService.getProvinces(this.countryId)
            .subscribe(d => {
                    this.provinces = d;
                    this.selectedValue = this.defaultValue;
                    try {
                        this.onSelect(this.selectedValue);
                    }
                    catch(e){
                        this.defaultValue = this.provinces[0].id;
                    }
                    this.mode = "success";
            },
            d => {
                this.mode = "error";
            });
  }

}
