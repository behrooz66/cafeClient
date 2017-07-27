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
          path: "./assets/icons/edit.png"
      },
      {
          type: "person-delete",
          path: "./assets/icons/user_delete.png"
      },
      {
          type: "order-add",
          path: "./assets/icons/order_add.png"
      },
      {
          type: "giftcard-add",
          path: "./assets/icons/giftcard_add.png"
      },
      {
          type: "reservation-add",
          path: "./assets/icons/reservation_add.png"
      },
      {
          type: "home",
          path: "./assets/icons/home.png"
      },
      {
          type: "phone",
          path: "./assets/icons/phone.png"
      },
      {
          type: "undo",
          path: "./assets/icons/undo.png"
      },
      {
          type: "history",
          path: "./assets/icons/history.png"
      },
      {
          type: "delete",
          path: "./assets/icons/delete.png"
      },
      {
          type: "refresh",
          path: "./assets/icons/refresh.png"
      },
      {
          type: "add",
          path: "./assets/icons/add.png"
      },
      {
          type: "list",
          path: "./assets/icons/list.png"
      },
      {
          type: "back",
          path: "./assets/icons/back.png"
      },
      {
          type: "sheet",
          path: "./assets/icons/sheet.png"
      },
      {
          type: "map",
          path: "./assets/icons/map.png"
      },
      {
          type: "play",
          path: "./assets/icons/play.png"
      },
      {
          type: "report",
          path: "./assets/icons/report.png"
      },
      {
          type: "power",
          path: "./assets/icons/power.png"
      },
      {
          type: "block",
          path: "./assets/icons/block.png"
      },
      {
          type: "key",
          path: "./assets/icons/key.png"
      },
      {
          type: "ok",
          path: "./assets/icons/ok.png"
      },
      {
          type: "login",
          path: "./assets/icons/login.png"
      },
      {
          type: "logout",
          path: "./assets/icons/logout.png"
      },
      {
          type: "customers",
          path: "./assets/icons/customers.png"
      },
      {
          type: "reports",
          path: "./assets/icons/reports.png"
      },
      {
          type: "control",
          path: "./assets/icons/control.png"
      },
      {
          type: "eye",
          path: "./assets/icons/eye.png"
      },
      {
          type: "users",
          path: "./assets/icons/users.png"
      },
      {
          type: "home2",
          path: "./assets/icons/home2.png"
      },
      {
          type: "key2",
          path: "./assets/icons/key2.png"
      },
      {
          type: "mail",
          path: "./assets/icons/mail.png"
      },
      {
          type: "todo",
          path: "./assets/icons/todo.png"
      },
      {
          type: "reply",
          path: "./assets/icons/reply.png"
      },
      {
          type: "compose",
          path: "./assets/icons/compose.png"
      },
      {
          type: "sent",
          path: "./assets/icons/sent.png"
      },
      {
          type: "circle",
          path: "./assets/icons/circle.png"
      },
      {
          type: "sad",
          path: "./assets/icons/sad.png"
      },
      {
          type: "happy",
          path: "./assets/icons/happy.png"
      },
      {
          type: "angry",
          path: "./assets/icons/angry.png"
      }
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
