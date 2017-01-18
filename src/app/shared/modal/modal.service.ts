import { Injectable } from '@angular/core';
import { ModalComponent } from './modal.component';

@Injectable()
export class ModalService {

  constructor() { }

  show(){
      console.log("hit");
      let m = new ModalComponent();
      m.open();
  }

}
