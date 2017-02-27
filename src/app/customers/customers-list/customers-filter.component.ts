import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ICustomer} from '../icustomer';

@Component({
    selector: 'customers-filter',
    template: `
        <input class="form-control" type="text" [(ngModel)]="exp" (input)="onChange()" />
    `
})

export class CustomersFilterComponent {

    exp: string = "";
    @Input() source = [];
    @Output('on-change') change = new EventEmitter();
        
    // todo: more fields may need to be taken into account
    onChange(){
        console.log("exp: ", this.exp);
        console.log("source: ", this.source);
        this.exp = this.exp.toLowerCase();
        let subset = this.source.filter(x =>
            x.name.toLowerCase().indexOf(this.exp) != -1
            || x.cell.toLowerCase().indexOf(this.exp) != -1
        );
        this.change.emit({
            result: subset
        });
        return;
    }

}