import {Component, OnInit} from '@angular/core';
//import { GeocoderService } from './shared/geocoder.service';

@Component({
    selector: 'home',
    template: `
        <modal [style]="'danger'" [hasHeader]=true [hasFooter]=true [size]=1> 
            <div class="content-head">Behrooz :)</div>
            <div class="content-body">are you sure?!</div>
            <div class="content-footer">controls...</div>
        </modal>
    `,
    providers: []
})

export class HomeComponent implements OnInit {
    
    constructor() {}

    show(){
        console.log('ks');
        
    }

    ngOnInit(){

    }

}