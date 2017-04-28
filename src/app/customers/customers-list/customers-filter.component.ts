import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {ICustomer} from '../icustomer';
import { RolesService } from '../../shared/roles.service';
import { Settings } from '../../settings';

@Component({
    selector: 'customers-filter',
    template: `
        <div *ngIf="isManager" class="row">
            <div class="col-sm-12 col-xs-12">
                <div class="input-group">
                <span class="input-group-addon"> 
                    <input type="checkbox" [(ngModel)]="showDeleted" (change)="onChange()">
                    Show deleted
                </span>
                <input class="form-control form-inline" type="text" [(ngModel)]="exp" (input)="onChange()" placeholder="Search by name or phone number..." />
                </div>
            </div>
        </div>
        <input *ngIf="!isManager" class="form-control form-inline" type="text" [(ngModel)]="exp" 
                    (input)="onChange()" placeholder="Search by name or phone number..." />
    `,
    providers: [ RolesService]
})

export class CustomersFilterComponent implements OnInit {

    exp: string = "";
    showDeleted: boolean = false;
    @Input() source = [];
    @Output('on-change') change = new EventEmitter();

    isManager: boolean = false;
        
    constructor(private _roles: RolesService){

    }

    ngOnInit(){
        this.showDeleted = Settings.showDeletedCustomers;
        this.isManager = this._roles.isManager();
        console.log(this.isManager);
    }

    // todo: more fields may need to be taken into account
    onChange(){
        Settings.showDeletedCustomers = this.showDeleted;
        this.exp = this.exp.toLowerCase();
        let subset = this.source.filter(x =>
            x.name.toLowerCase().indexOf(this.exp) != -1
            || x.cell.toLowerCase().indexOf(this.exp) != -1
        );
        if (!this.showDeleted){
            subset = subset.filter(x => !x.deleted);
        }
        this.change.emit({
            result: subset
        });
        return;
    }

}