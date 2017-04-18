import { Injectable } from '@angular/core';
import { Settings } from '../../settings';
import { HttpAuthService } from '../http-auth.service';

@Injectable()
export class ReservationStatusesService {
    
    constructor(private _authService:HttpAuthService) {

    }

    getStatuses(){
        return this._authService.get(Settings.apiBase+"reservation/statuses")
            .map(r => r.json());
    }

}