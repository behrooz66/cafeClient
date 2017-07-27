import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReportService } from '../../report.service';
import { OrderTypesService } from '../../../shared/order-types/order-types.service';
import { CityService } from '../../../shared/city-select/city.service';
import { FlashMessageService } from '../../../shared/flash-message/flash-message.service';
import { Settings } from '../../../settings';
import * as moment from 'moment';
import * as L from 'leaflet';
import 'leaflet.markercluster';


@Component({
  selector: 'report-order-records-map',
  templateUrl: './report-order-records-map.component.html',
  styleUrls: ['./report-order-records-map.component.css'],
  providers: [
      ReportService,
      OrderTypesService,
      CityService
  ]
})
export class ReportOrderRecordsMapComponent implements OnInit {

  data = [];
  unmappable: number; // number of records that cannot be mapped.
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
              private _cityService: CityService,
              private _ot: OrderTypesService) { }

  ngOnInit() 
  {
      this.getOrderTypes();
  }

  refresh() 
  {
      this.unmappable = 0;
      this.mode = "loading";
      this.showMap = false;
      this._report.getOrderRecords(this.dateFrom, this.dateTo, this.typeId, this.priceFrom, this.priceTo, this.includeDeleted)
          .subscribe(
              d => {
                  this.data = d;
                  this.mode = "success";
                  this.data.forEach(r => {
                      if (r.noAddress)
                          this.unmappable++;
                  });
              },
              d => {
                  this._flash.addMessage("Error", "Error in retrieving the records.", true, "danger", 2500, 2);
                  this.mode = "error";
              }
          );
  }

  map() 
  {
      this.showMap = true;
      setTimeout(() => {
        this.renderMap();
      }, 1000);
  }

  download() 
  {
      let csv = this.convertToCsv(this.data);
      this.downloadCsv(csv);
  }

  public renderMap(){
      this.mapInitialization()
          .subscribe(
                d => {
                    this.mymap = L.map('map');
                    this.mymap.fitBounds([
                        [d.nwLat, d.nwLon], [d.seLat, d.seLon]
                    ]);;
                    let x = L.tileLayer(Settings.map.tileServerAddress);
                    x.addTo(this.mymap);
                    this.addMarkers();
                },
                d => {
                    this._flash.addMessage("Error", "Mapping failed.", true, "danger", 2500, 2);
                },
                () => {}
          );
  }

  public mapInitialization()
  {
      let cityId = +localStorage.getItem("bdCityId");
      return this._cityService.getCity(cityId);
  }

  public addMarkers() 
  {
      var markerClusters = L.markerClusterGroup();
      this.data.forEach(e => {
          if (e.lat && e.lon){
            let a = `Customer: <b>${e.customer}</b> <br/>
                    Order: <b>${e.orderType}</b><br/>
                    Price: <b>$${e.price}</b><br/>
                    `;

            let x = L.marker([e.lat, e.lon]).bindPopup(a);
            markerClusters.addLayer(x);
          }
      });

      this.mymap.addLayer(markerClusters);
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

  private convertToCsv(data: any[]) {
      let str = "Id,Customer,Order Type,Date,Price,Notes,Deleted,Last Updated At, Last Updated By\r\n";
      data.forEach(e => {
         str += e.id + "," + e.customer + "," + e.orderType + "," + e.date + "," + e.price + "," + e.notes + "," + e.deleted + "," 
                + e.updatedAt + "," + e.updatedBy + "\r\n";
      });
      return str;
  }

  private downloadCsv(csvString: string) 
  {
      let a = document.createElement("a");
      a.setAttribute('style', 'display:none');
      document.body.appendChild(a);
      let blob = new Blob([csvString], {type: 'text/csv'});
      let url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'orders.csv';
      a.click();
  }

}
