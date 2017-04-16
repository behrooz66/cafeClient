import { FormControl } from '@angular/forms';

export class NewOrderValidators {
    
    static dateInvalid(control: FormControl) {
        if (control.value.length === 0) 
            return null;
        
        if (control.value.length != 10) {
            return {
                dateInvalid: true
            }
        }

        if (control.value && control.value.toString().match(/[a-z]/i)){
            return {
                dateInvalid: true
            }
        }

        return null;
    } 

    static priceInvalid(control: FormControl) {
        if (control.value && control.value.toString().match(/[a-z]/i))
            return {
                priceInvalid: true
            }
        return null;
    }
}