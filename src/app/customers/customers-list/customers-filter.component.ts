import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {ICustomer} from '../icustomer';
import { RolesService } from '../../shared/roles.service';
import { AuthService } from '../../account/auth.service';
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
    providers: [ 
        //RolesService
    ]
})

export class CustomersFilterComponent implements OnInit {

    exp: string = "";
    showDeleted: boolean = false;
    @Input() source = [];
    @Output('on-change') change = new EventEmitter();

    isManager: boolean = false;
        
    constructor(private _roles: AuthService){

    }

    ngOnInit(){
        this.showDeleted = Settings.customers.showDeletedCustomers;
        this.isManager = this._roles.isManager();
    }

    // todo: more fields may need to be taken into account
    onChange(){
        Settings.customers.showDeletedCustomers = this.showDeleted;
        this.exp = this.exp.toLowerCase();
        // let subset = this.source.filter(x =>
        //     x.name.toLowerCase().indexOf(this.exp) !== -1
        //     || x.cell.toLowerCase().indexOf(this.exp) !== -1
        //     || x.work.toLowerCase().indexOf(this.exp) !== -1
        //     || x.home.toLowerCase().indexOf(this.exp) !== -1
        //     || x.otherPhone.toLowerCase().indexOf(this.exp) !== -1
        // );
        let subset = this.source.filter(x => 
            x.name.toLowerCase().indexOf(this.exp) !== -1
            || this.phoneFilter(x, this.exp)
        );

        if (!this.showDeleted){
            subset = subset.filter(x => !x.deleted);
        }
        this.change.emit({
            result: subset
        });
        return;
    }

    private phoneFilter(x, exp): boolean
    {
        let c,w,h,o : boolean = false;
        if (x.cell && x.cell.toLowerCase().indexOf(exp) !== -1)
            c = true;
        else 
            c = false;

        if (x.work && x.work.toLowerCase().indexOf(exp) !== -1)
            w = true;
        else 
            w = false;

        if (x.home && x.home.toLowerCase().indexOf(exp) !== -1)
            h = true;
        else 
            h = false;    

        if (x.otherPhone && x.otherPhone.toLowerCase().indexOf(exp) !== -1)
            o = true;
        else 
            o = false;
        
        return c || w || o || h;
    }

}