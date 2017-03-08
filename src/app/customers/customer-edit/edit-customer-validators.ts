import { FormControl } from '@angular/forms';

export class EditCustomerValidators {
    
    static emailInvalid(control: FormControl) {
        if (!control.value) return null;
        if (control.value.indexOf("@") < 0 
            || control.value.indexOf(".") < 0
            || control.value.length < 5)
        return { emailInvalid : true}
        return null;
    }
    
     
}