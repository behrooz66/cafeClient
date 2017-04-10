import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderTypesService } from './order-types.service';

@Component({
  selector: 'order-types',
  templateUrl: './order-types.component.html',
  styleUrls: ['./order-types.component.css'],
  providers: [OrderTypesService]
})
export class OrderTypesComponent implements OnInit {

  orderTypes:any[] = [];
  mode: string = "";

  @Input() allowNone = false;
  @Input() defaultId = 0;
  @Output('on-change') change = new EventEmitter();

  constructor(private _orderTypes: OrderTypesService) { }

  ngOnInit() {
      this.mode = "loading";
      this._orderTypes.getTypes().subscribe(
          d => {
              this.orderTypes = d;
              this.mode = "success";
          },
          d => {
              console.log("error: ", d);
              this.mode = "error";
          },
          () => {
              // todo: anything here?!
          }
      );
  }
  
  onChange(value){
      this.change.emit(value);
  }

}
