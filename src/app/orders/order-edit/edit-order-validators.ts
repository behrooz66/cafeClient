import { FormControl } from '@angular/forms';

export class EditOrderValidators {
    
    static dateInvalid(control: FormControl) {
        if (!control.value) 
            return {
                dateInvalid: true
            };
        
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