import { Component, OnInit } from '@angular/core';
import { GiftCardService } from '../giftcard.service';

@Component({
  selector: 'giftcard-edit',
  templateUrl: './giftcard-edit.component.html',
  styleUrls: ['./giftcard-edit.component.css'],
  providers: [GiftCardService]
})
export class GiftCardEditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
