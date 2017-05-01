import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {

  constructor() { }

  @Input() type: string;
  @Input() size: number;
  width:number;
  height: number;
  path: string;

  iconTypes: any[] = [
      {
          type: "edit",
          path: "../../../assets/icons/edit.png"
      },
      {
          type: "person-delete",
          path: "../../../assets/icons/user_delete.png"
      },
      {
          type: "order-add",
          path: "../../../assets/icons/order_add.png"
      },
      {
          type: "giftcard-add",
          path: "../../../assets/icons/giftcard_add.png"
      },
      {
          type: "reservation-add",
          path: "../../../assets/icons/reservation_add.png"
      },
      {
          type: "home",
          path: "../../../assets/icons/home.png"
      },
      {
          type: "phone",
          path: "../../../assets/icons/phone.png"
      },
      {
          type: "undo",
          path: "../../../assets/icons/undo.png"
      },
      {
          type: "history",
          path: "../../../assets/icons/history.png"
      },
      {
          type: "delete",
          path: "../../../assets/icons/delete.png"
      },
      {
          type: "refresh",
          path: "../../../assets/icons/refresh.png"
      },
      {
          type: "add",
          path: "../../../assets/icons/add.png"
      },
      {
          type: "list",
          path: "../../../assets/icons/list.png"
      },
  ];

  ngOnInit() {
      if (this.size === 1) {
          this.height = 15;
          this.width = 15;
      }
      else if (this.size === 2) {
          this.height = 25;
          this.width = 25;
      }
      else if (this.size === 3) {
          this.height = 40;
          this.width = 40;
      }
      this.path = this.iconTypes.filter(
          i => i.type === this.type
      )[0].path;
  }

}
