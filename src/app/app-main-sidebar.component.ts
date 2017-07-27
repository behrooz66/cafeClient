import { Component, OnInit } from '@angular/core';
import { FlashMessageService } from './shared/flash-message/flash-message.service';
//** TRIALS */
import {AuthService} from './account/auth.service';
import { MessagesService } from './messages/messages.service';
import { ReservationService } from './reservations/reservation.service';
import * as moment from 'moment';
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'app-main-sidebar',
    templateUrl: './app-main-sidebar.component.html',
    providers: [
        //MessagesService
    ]
})

export class AppMainSidebarComponent implements OnInit{

    isLoggedIn: boolean = false;
    isManager: boolean = false;

    newMessages: number = 0;
    reservationsForToday: number = 0;

    constructor(private _auth: AuthService,
                private _flash: FlashMessageService,
                private _msg: MessagesService,
                private _reservationService: ReservationService){}

    ngOnInit()
    {
        this._auth.isUserLoggedIn()
            .subscribe(
                d => {
                    if (d)
                    {
                        this.isLoggedIn = true;
                        this.isManager = this._auth.isManager();
                        this.getNewMessageCount();
                    }
                    else {
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
        
        // gets triggerd if the message count is manipulated in messages section by the user.
        this._msg.isCountChanged()
            .subscribe(
                d => {
                    this.getNewMessageCount();
                }
            )

        // initiates the timer to peridically check for new messages
        this.checkForMessages();

        // initiates the timer to peridically check for new reservations
        this.getReservationsForToday();
        this.checkForReservations();

        
    }

    getNewMessageCount()
    {
        this._msg.getNewMessagesCount()
            .subscribe(
                d => {
                    this.newMessages = +d;
                }
            );
    }

    checkForMessages(){
        Observable.timer(3 * 60 * 1000, 5 * 60 * 1000).subscribe(
            d => {
                this._msg.getNewMessagesCount()
                    .subscribe(
                        x => {
                            if (this.newMessages < +x)
                                this._flash.addMessage("Message Received", "You have unread message(s) in your inbox.", true, "success", 2500, 2);
                            this.newMessages = +x;
                        }
                    );
            }
        );
    }

    getReservationsForToday()
    {
        this._reservationService.getReservationsByRestaurant(moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'))
                        .subscribe(
                            d => {
                                this.reservationsForToday = d.length;
                            }
                        );
    }

    checkForReservations()
    {
        Observable.timer(3 * 60 * 1000, 6 * 60 * 1000)
            .subscribe(
                d => {
                    this._reservationService.getReservationsByRestaurant(moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'))
                        .subscribe(
                            d => {
                                if (this.reservationsForToday < d.length)
                                    this._flash.addMessage("New Reservation", "New reservation for today", true, "success", 2500, 2);
                                this.reservationsForToday = d.length;
                            }
                        );
                }
            );
    }
}