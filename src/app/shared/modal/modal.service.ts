import { Injectable } from '@angular/core';
import { ModalComponent } from './modal.component';

@Injectable()
export class ModalService {

  constructor() { }

  show():Promise<any>{
    
      return new Promise((resolve, reject) => {
          resolve("kir!");
      });
  }

}
