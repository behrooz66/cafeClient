import {FormControl} from '@angular/forms';
import {AccountService} from '../account.service';
import {SignupComponent}  from './signup.component';



export class CustomValidators {

    constructor(private _accountService:AccountService){
    }

    static invalidEmail(control: FormControl){
        if (control.value.indexOf('@') == -1 
            || control.value.indexOf('.') == -1
            || control.value.length < 5 ) {
            return {invalidEmail : true }
        }
        else {
            return null;
        }
    }

    emailAlreadyRegistered(control: FormControl){
        return new Promise((resolve, reject) => {
            this._accountService.emailAlreadyRegistered("X")
                .subscribe(data => {
                    if (data.email === "Sincere@april.biz")
                        resolve({ emailAlreadyRegistered : true})
                    resolve(null)
                });
        });
    }
}