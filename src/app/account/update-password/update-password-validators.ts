import { FormControl } from '@angular/forms';

export class UpdatePasswordValidators {

    static tooShort(c: FormControl){
        if (c.value.length < 6)
            return {
                tooShort: true
            }
        return null;
    }

    
}