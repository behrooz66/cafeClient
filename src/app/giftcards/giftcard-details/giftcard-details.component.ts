import { Component, OnInit } from '@angular/core';
import { GiftCardService } from '../giftcard.service';

@Component({
  selector: 'giftcard-details',
  templateUrl: './giftcard-details.component.html',
  styleUrls: ['./giftcard-details.component.css'],
  providers: [GiftCardService]
})
export class GiftCardDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
