import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';
 

@Component({
  selector: 'orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
  providers: [OrderService]
})
export class OrdersListComponent implements OnInit, OnDestroy {

  customerId: number;
  sub;

  constructor(private _activatedRoute:ActivatedRoute) { }

  ngOnInit() {
      this.sub = this._activatedRoute.params.subscribe(params => {
          this.customerId = +params["id"];
      });

      
  }

  test($event){
      console.log($event);
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
