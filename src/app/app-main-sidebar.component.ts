import { Component, OnInit } from '@angular/core';
import { FlashMessageService } from './shared/flash-message/flash-message.service';
//** TRIALS */
import {AuthService} from './account/auth.service';

@Component({
    selector: 'app-main-sidebar',
    templateUrl: './app-main-sidebar.component.html',
    providers: []
})

export class AppMainSidebarComponent implements OnInit{

    isLoggedIn: boolean = false;
    isManager: boolean = false;
    constructor(private _auth: AuthService,
                private _flash: FlashMessageService){}

    ngOnInit()
    {
        this._auth.isUserLoggedIn()
            .subscribe(
                d => {
                    if (d)
                    {
                        this.isLoggedIn = true;
                        this.isManager = this._auth.isManager();
                        console.log("manager: ", this.isManager);
                    }
                    else {
                        console.log("fuck!");
                        this.isLoggedIn = false;    
                        this.isManager = false;
                    }
                },
                d => {
                    this._flash.addMessage("Error", "An error has happened in authentication.", true, "danger", 3500, 2);
                },
                () => {
                    
                }
            );
    }

}