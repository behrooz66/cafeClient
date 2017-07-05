import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReportService } from '../../report.service';
import { GiftcardTypeService } from '../../../shared/giftcard-type/giftcard-type.service';
import { CityService } from '../../../shared/city-select/city.service';
import { FlashMessageService } from '../../../shared/flash-message/flash-message.service';
import { Settings } from '../../../settings';
import * as moment from 'moment';
import * as L from 'leaflet';
import 'leaflet.markercluster';

@Component({
  selector: 'report-giftcard-records-map',
  templateUrl: './report-giftcard-records-map.component.html',
  styleUrls: ['./report-giftcard-records-map.component.css'],
    providers: [
      ReportService,
      GiftcardTypeService,
      CityService
  ]
})
export class ReportGiftcardRecordsMapComponent implements OnInit {

  data = [];
  unmappable: number;
  issueDateFrom: string;
  issueDateTo: string;
  expiryDateFrom: string;
  expiryDateTo: string;
  amountFrom: number;
  amountTo: number;
  typeId: number = 0;
  includeDeleted: boolean = false;

  mode: string;
  giftCardTypesMode: string;
  giftCardTypes = [];

  mymap;
  showMap: boolean = false;

    constructor(private _report: ReportService,
              private _flash: FlashMessageService,
              private _cityService: CityService,
              private _gt: GiftcardTypeService) { }

  ngOnInit()
  {
      this.getGiftCardTypes();
  }

  refresh() 
  {
      this.unmappable = 0;
      this.mode = "loading";
      this.showMap = false;
      this._report.getGiftCardsRecords(this.issueDateFrom, this.issueDateTo, this.expiryDateFrom, this.expiryDateTo,
                                        this.amountFrom, this.amountTo, this.typeId, this.includeDeleted)
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
                    this.mymap = L.map('map3');
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
                    Gift Card: <b>${e.giftCardType}</b><br/>
                    Amount: <b>$${e.amount}</b><br/>
                    `;

            let x = L.marker([e.lat, e.lon]).bindPopup(a);
            markerClusters.addLayer(x);
          }
      });

      this.mymap.addLayer(markerClusters);
  }

  private getGiftCardTypes() 
  {
      this.giftCardTypesMode = "loading";
      this._gt.getTypes()
          .subscribe(
              d => {
                  this.giftCardTypes = d;
                  this.giftCardTypesMode = "success";
              },
              d => {
                  this._flash.addMessage("Error", "Error in retrieving gift card types.", true, "danger", 2500, 2);
                  this.giftCardTypesMode = "error";
              }
          );
  }

  private convertToCsv(data: any[]) {
      let str = "Id,Customer,Gift Card Type,Card Number,Issue Date,Expiry Date,Amount,Notes,Deleted,Last Updated At, Last Updated By\r\n";
      data.forEach(e => {
         str += e.id + "," + e.customer + "," + e.giftCardType + "," + e.number + "," + e.issueDate + "," + e.expiryDate 
                + "," + e.amount + "," + e.notes + "," + e.deleted + "," 
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
      a.download = 'gift cards.csv';
      a.click();
  }


}
