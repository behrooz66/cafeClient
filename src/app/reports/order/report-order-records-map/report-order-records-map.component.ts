import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../../report.service';
import { OrderTypesService } from '../../../shared/order-types/order-types.service';
import { FlashMessageService } from '../../../shared/flash-message/flash-message.service';
import { Settings } from '../../../settings';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import * as L from 'leaflet';


@Component({
  selector: 'report-order-records-map',
  templateUrl: './report-order-records-map.component.html',
  styleUrls: ['./report-order-records-map.component.css'],
  providers: [
      ReportService,
      OrderTypesService
  ]
})
export class ReportOrderRecordsMapComponent implements OnInit {

  data = [];
  dateFrom: string;
  dateTo: string;
  priceFrom: number;
  priceTo: number;
  typeId: number = 0;
  includeDeleted: boolean = false;
  
  mode: string;
  orderTypesMode: string;
  orderTypes = [];

  mymap;
  showMap: boolean = false;

  constructor(private _report: ReportService,
              private _flash: FlashMessageService,
              private _ot: OrderTypesService) { }

  ngOnInit() {
      this.getOrderTypes();
  }

  refresh() {
      this.mode = "loading";
      this.showMap = false;
      this._report.getOrderRecords(this.dateFrom, this.dateTo, this.typeId, this.priceFrom, this.priceTo, this.includeDeleted)
          .subscribe(
              d => {
                  this.data = d;
                  this.mode = "success";
              },
              d => {
                  this._flash.addMessage("Error", "Error in retrieving the records.", true, "danger", 2500, 2);
                  this.mode = "error";
              }
          );
  }

  map() {
      this.showMap = true;
      this.mapInitialization();     
      this.addMarkers();
  }

  private mapInitialization()
  {
      this.mymap = L.map('map');
      this.mymap.setView([53.901205, -122.748332], 13);
      //let x = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
      let x = L.tileLayer('http://144.217.81.75/hot/{z}/{x}/{y}.png');
      x.addTo(this.mymap);
  }

  private addMarkers() 
  {
      this.data.forEach(e => {
          L.marker([e.lat, e.lon])
              .addTo(this.mymap);
      });
  }

  private getOrderTypes() {
      this.orderTypesMode = "loading";
      this._ot.getTypes()
          .subscribe(
              d => {
                  this.orderTypes = d;
                  this.orderTypesMode = "success";
              },
              d => {
                  this._flash.addMessage("Error", "Error in retrieving order types.", true, "danger", 2500, 2);
                  this.orderTypesMode = "error";
              }
          );
  }

}
