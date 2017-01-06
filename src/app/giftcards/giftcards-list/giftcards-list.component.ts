import { Component, OnInit } from '@angular/core';
import { GiftCardService } from '../giftcard.service';

@Component({
  selector: 'giftcards-list',
  templateUrl: './giftcards-list.component.html',
  styleUrls: ['./giftcards-list.component.css'],
  providers: [GiftCardService]
})
export class GiftCardsListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
