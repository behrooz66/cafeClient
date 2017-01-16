import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProvinceService } from './province.service';

@Component({
  selector: 'province-select',
  templateUrl: './province-select.component.html',
  styleUrls: ['./province-select.component.css'],
  providers: [ProvinceService]
})
export class ProvinceSelectComponent implements OnInit {

  provinces;
  selectedValue: number;
  @Input() allowNone = true;
  @Input() defaultValue = 0;
  @Output('on-select') change = new EventEmitter();

  constructor(private _provinceService:ProvinceService) { }

  ngOnInit() {
      this.provinces = this._provinceService.getProvinces();
      this.selectedValue = this.defaultValue;
  }

  onSelect(value){
      this.change.emit({
          value: value
      });
  }

}
