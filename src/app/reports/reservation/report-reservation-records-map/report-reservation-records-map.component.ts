import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReportService } from '../../report.service';
import { ReservationStatusesService } from '../../../shared/reservation-statuses/reservation-statuses.service';
import { CityService } from '../../../shared/city-select/city.service';
import { FlashMessageService } from '../../../shared/flash-message/flash-message.service';
import { FileDownloaderService } from '../../../shared/file-downloader.service';
import { Settings } from '../../../settings';
//import { Chart } from 'chart.js';
import * as moment from 'moment';
import * as L from 'leaflet';
import 'leaflet.markercluster';

@Component({
  selector: 'report-reservation-records-map',
  templateUrl: './report-reservation-records-map.component.html',
  styleUrls: ['./report-reservation-records-map.component.css'],
  providers: [
      ReportService,
      ReservationStatusesService,
      CityService,
      FileDownloaderService
  ]
})
export class ReportReservationRecordsMapComponent implements OnInit {

  data = [];
  unmappable: number;
  dateFrom: string;
  dateTo: string;
  statusId: number = 0;
  includeDeleted: boolean = false;

  mode: string;
  reservationStatusesMode: string;
  reservationStatuses = [];

  mymap;
  showMap: boolean = false;

  //@ViewChild('mapPlaceHolder') mapPlaceHolder2: ElementRef;

  constructor(private _report: ReportService,
              private _flash: FlashMessageService,
              private _cityService: CityService,
              private _rs: ReservationStatusesService,
              private _file: FileDownloaderService) { }

  ngOnInit() 
  {
      this.getReservationStatuses();
  }

  refresh() 
  {
      this.unmappable = 0;
      this.mode = "loading";
      this.showMap = false;
      this._report.getReservationsRecords(this.dateFrom, this.dateTo, this.statusId, this.includeDeleted)
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
      setTimeout( () => {
          this.renderMap();
      }, 1000);
  }

  download()
  {
      let csv = this.convertToCsv(this.data);
      //this.downloadCsv(csv);
      this._file.saveCsv(csv, 'reservations');
  }

  public renderMap()
  {
      this.mapInitialization()
          .subscribe(
                d => {
                    this.mymap = L.map('map2');
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
                    Reservation: <b>${e.reservationStatus}</b><br/>
                    Recorded Revenue: <b>$${e.revenue}</b><br/>
                    `;

            let x = L.marker([e.lat, e.lon]).bindPopup(a);
            markerClusters.addLayer(x);
          }
      });
      this.mymap.addLayer(markerClusters);
  }

  private getReservationStatuses()
  {
      this.reservationStatusesMode = "loading";
      this._rs.getStatuses()
          .subscribe(
              d => {
                  this.reservationStatuses = d;
                  this.reservationStatusesMode = "success";
              },
              d => {
                  this._flash.addMessage("Error", "Error in retrieving reservation statuses.", true, "danger", 2500, 2);
                  this.reservationStatusesMode = "success";
              }
          );
  }

  private convertToCsv(data: any[]) {
      let str = "Id,Customer,Reservation Status,Date,Time,Recorded Revenue,Notes,Deleted,Last Updated At, Last Updated By\r\n";
      data.forEach(e => {
         str += e.id + "," + e.customer + "," + e.reservationStatus + "," + e.date + "," + e.time + "," + e.revenue + "," + e.notes + "," + e.deleted + "," 
                + e.updatedAt + "," + e.updatedBy + "\r\n";
      });
      return str;
  }

//   private downloadCsv(csvString: string) 
//   {
//       let a = document.createElement("a");
//       a.setAttribute('style', 'display:none');
//       document.body.appendChild(a);
//       let blob = new Blob([csvString], {type: 'text/csv'});
//       let url = window.URL.createObjectURL(blob);
//       a.href = url;
//       a.download = 'reservations.csv';
//       a.click();
//   }

}
