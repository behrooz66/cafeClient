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
    @Input() source: ICustomer[];
    @Output('on-change') change = new EventEmitter();
        
    // todo: more fields may need to be taken into account
    onChange(){
        this.exp = this.exp.toLowerCase();
        let subset:ICustomer[] = this.source.filter(x =>
            x.name.toLowerCase().indexOf(this.exp) != -1
            || x.name.toLowerCase().indexOf(this.exp) != -1
        );
        this.change.emit({
            result: subset
        });
        return;
    }

}