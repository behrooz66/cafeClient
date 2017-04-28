import { Injectable } from '@angular/core';

@Injectable()
export class RolesService {

    public getRole(): string {
        let r = localStorage.getItem("bdRole"); 
        return r;
    }   

    public isManager() {
        let r = localStorage.getItem("bdRole"); 
        if (r === "Manager")
            return true;
        return false;
    }

    public isEmployee() {
        let r = localStorage.getItem("bdRole"); 
        if (r === "Employee")
            return true;
        return false;
    }

    public isAdmin() {
        let r = localStorage.getItem("bdRole"); 
        if (r === "Admin")
            return true;
        return false;
    }
}