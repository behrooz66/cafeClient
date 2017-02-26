import { FormControl } from '@angular/forms';

export class NewCustomerValidators {
    
    static emailInvalid(control: FormControl) {
        if (control.value.indexOf("@") < 0 
            || control.value.indexOf(".") < 0
            || control.value.length < 5)
        return { emailInvalid : true}
        return null;
    } 
}