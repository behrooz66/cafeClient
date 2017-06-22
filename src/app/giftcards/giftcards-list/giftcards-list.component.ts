import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { GiftCardService } from '../giftcard.service';
import { ActivatedRoute } from '@angular/router';
import { FlashMessageService } from '../../shared/flash-message/flash-message.service';
import { FlashMessage } from '../../shared/flash-message/flash-message';
import { RecordService } from '../../shared/record.service';
import { GiftcardTypeService } from '../../shared/giftcard-type/giftcard-type.service';
import { Settings } from '../../settings';
import { GiftCard } from '../igiftcard';

@Component({
  selector: 'giftcards-list',
  templateUrl: './giftcards-list.component.html',
  styleUrls: ['./giftcards-list.component.css'],
  providers: [GiftCardService, RecordService, GiftcardTypeService]
})
export class GiftCardsListComponent implements OnInit, OnDestroy {

  customerId: number;
  giftcards: GiftCard[] = [];
  giftcardTypes: any[] = [];
  sub;

  showDeleted = Settings.giftcards.showDeletedGiftCards;

  @ViewChild('mWait') mWait;
  @ViewChild('mConfirmDelete') mConfirmDelete;
  @ViewChild('mConfirmPermanentDelete') mConfirmPermanentDelete;
  @ViewChild('mConfirmUndelete') mConfirmUndelete;

  filtersInfo = [
      {
          type: "date",
          field: "issueDate",
          from: "",
          to: ""
      },
      {
          type: "list",
          field: "giftCardType.type",
          selected: ""
      },
      {
          type: "number",
          field: "amount",
          from: null,
          to: null
      },
      {
          type: "date",
          field: "expiryDate",
          from: "",
          to: ""
      },
      {
          type: "text",
          field: "number",
          param: ""
      },
      {
          type: "boolean",
          field: "deleted",
          status: this.showDeleted
      }
  ];

  pageInfo = {
      pageSize: 5,
      index: 0
  };

  sortInfo = {};

  pageCards: any[] = [];
  pages: any[] = [];

  constructor(private _activatedRoute:ActivatedRoute,
              private _giftCardService: GiftCardService,
              private _flash: FlashMessageService,
              private _record: RecordService,
              private _giftCardTypes: GiftcardTypeService) { }

  showFilters = false;
  toggle() 
  {
      this.showFilters = !this.showFilters;
  }

  ngOnInit() {
      this.pageInfo.pageSize = Settings.giftcards.pageSize;
      this.sub = this._activatedRoute.params.subscribe(params => {
          this.customerId = +params["customerId"];
      });
      this.refresh();
  }

  refresh() {
      this.mWait.open();
      this._giftCardService.getGiftCardsByCustomer(this.customerId)
          .subscribe(
              d => {
                  this.giftcards = d;
                  this.mWait.close();
                  this.filterAndPage();
                  console.log(this.giftcards);
              },
              d => {
                  this.mWait.close();
                  this._flash.addMessage("Error", "Error in retrieving the gift cards.", false, "danger", 2500, 2);
              }
      );
      this._giftCardTypes.getTypes().subscribe(
          d => {
              this.giftcardTypes = d;
          },
          d => {
              this._flash.addMessage("Error", "Error in retrieving gift card types.", true, "danger", 2500, 2);
          }
      );      
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  delete(id)
  {
      this.mConfirmDelete.open();
      this.deleteCandidateId = id;
  }

  deleteCandidateId: number;
  private mConfirmDeleteClose($event) 
  {
      if ($event.result === true) {
        this._giftCardService.archive(this.deleteCandidateId)
            .subscribe(
                d => {
                    this.refresh();
                },
                d => {
                    this._flash.addMessage("Error", "Could not delete the gift card.", true, "danger", 3000, 2);
                }
            );
      }
  }

  deletePermanent(id){
      this.mConfirmPermanentDelete.open();
      this.deletePermanentCandidateId = id;
  }

  deletePermanentCandidateId: number;
  mConfirmDeletePermanentClose($event) {
    if ($event.result === true) {
        this._giftCardService.delete(this.deletePermanentCandidateId)
            .subscribe(
                d => {
                    this.refresh();
                },
                d => {
                    this._flash.addMessage("Error", "Could not delete the gift card.", true, "danger", 3000, 2);
                }
            );
    }
  }

  undelete(id){
      this.mConfirmUndelete.open();
      this.undeleteCandidateId = id;
  }

  undeleteCandidateId: number;
  mConfirmUndeleteClose($event) {
      if ($event.result === true) {
          this._giftCardService.unarchive(this.undeleteCandidateId)
              .subscribe(
                  d => {
                      this.refresh();
                  },
                  d => {
                      this._flash.addMessage("Error", "Could not perform the operation.", true, "danger", 3000, 2);
                  }
              );
      }
  }


  //*** FILTERS */
  applyFilters() {
      this.pageInfo.index = 0;
      this.filterAndPage();
  }

  filterAndPage(){
      this.mWait.open();
      console.log(this.filtersInfo);
      let x = this._record.getPageItems(this.giftcards, this.filtersInfo, this.sortInfo, this.pageInfo);
      this.pageCards = x.data;
      this.pages = new Array(x.numberOfPages);

      if (this.pageCards.length === 0 && this.pages.length !==0)
        this.setPage(this.pageInfo.index - 1);

      this.mWait.close();
  }

  clearFilters() {
      // todo: adjust this.
      this.filtersInfo[0]["from"] = null;
      this.filtersInfo[0]["to"] = null;
      this.filtersInfo[1]["selected"] = "";
      this.filtersInfo[2]["from"] = null;
      this.filtersInfo[2]["to"] = null;
      this.filtersInfo[3]["from"] = null;
      this.filtersInfo[3]["to"] = null;
      this.filtersInfo[4]["from"] = null;
      this.filtersInfo[4]["to"] = null;
      this.applyFilters();
  }

  showDeletedChange(){
      this.mWait.open();
      Settings.giftcards.showDeletedGiftCards = this.showDeleted;
      
      // todo: adjust this
      this.filtersInfo[5]["status"] = this.showDeleted;
      this.filterAndPage();
      this.mWait.close();
  }


  //*** PAGING  */
  private setPage(i) {
      this.pageInfo.index = i;
      this.filterAndPage();
  }

  private firstPage(){
      this.pageInfo.index = 0;
      this.filterAndPage();
  }

  private lastPage(){
      this.pageInfo.index = this.pages.length - 1;
      this.filterAndPage();
  }

  private nextPage() {
      if (this.pageInfo.index < this.pages.length - 1)
      {
          this.pageInfo.index ++;
          this.filterAndPage();
      }
  }

  private prevPage() {
      if (this.pageInfo.index > 0)
      {
          this.pageInfo.index--;
          this.filterAndPage();
      }
  }

  pageSizeChange(){
      Settings.giftcards.pageSize = this.pageInfo.pageSize;
  }

}
