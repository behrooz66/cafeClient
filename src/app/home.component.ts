import {Component, OnInit, ViewChild} from '@angular/core';
import { FlashMessageService } from './shared/flash-message/flash-message.service';
//import { GeocoderService } from './shared/geocoder.service';
//import {ModalService} from './shared/modal/modal.service';


@Component({
    selector: 'home',
    template: `
        <a [routerLink]="['reservations/by/date']">Res!</a>
        <modal #m [size]=2 [type]="'confirm'" [canEscape]=true>
            <div class="content-head">
                Confirmation
            </div>
            <div class="content-body">
                Are you really sure?
            </div>
        </modal>
        <button (click)="show(m);">asd</button>
    `,
    //providers: [ModalService]
})

export class HomeComponent implements OnInit {

    constructor() {

    }

    show(m){
        m.open();
    }

    ngOnInit(){
     
    }

}