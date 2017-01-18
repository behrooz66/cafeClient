import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FlashMessageService } from './shared/flash-message/flash-message.service';
import { FlashMessage } from './shared/flash-message/flash-message';

@Component({
    selector: 'app-messages-placeholder',
    template: `
        <div *ngFor="let f of flashMessages" class="alert" 
                [class.alert-success] = "f.style=== 'success'"
                [class.alert-warning] = "f.style=== 'warning'"
                [class.alert-danger] = "f.style=== 'danger'"

                [class.msg-small]="f.size === 1"
                [class.msg-medium]="f.size === 2"
                [class.msg-large]="f.size === 3"
            >
                <strong>{{f.title}} <i *ngIf="!f.autoClose" class="pull-right glyphicon glyphicon-remove" style="cursor:pointer;"
                    (click)="onRemove(f.id);"></i></strong>
                <p>{{f.body}}</p> 
            </div>
    `,
    styles: [
        `
           .msg-small {
                border:2px solid black;
                max-width:250px;
            }

            .msg-medium {
                border:2px solid black;
                max-width:450px;
            }

            .msg-large {
                border:2px solid black;
                max-width:800px;
            }
        `
    ]
})

export class AppMessagesPlaceholder {

    @Input() flashMessages:FlashMessage[] = [];
    @Output('on-remove') remove = new EventEmitter();

    onRemove(id: number){
        this.remove.emit(id);
    }

}