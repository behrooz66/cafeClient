import { Component, OnInit } from '@angular/core';
import { GiftCardService } from '../giftcard.service';

@Component({
  selector: 'giftcard-add',
  templateUrl: './giftcard-add.component.html',
  styleUrls: ['./giftcard-add.component.css'],
  providers: [GiftCardService]
})
export class GiftCardAddComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
