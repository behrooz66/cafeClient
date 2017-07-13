import { FormControl } from '@angular/forms';
import { AdminService } from '../admin.service';


export class NewUserValidators {

    
    static usernameTaken(c: FormControl, _admin: AdminService) {
        return new Promise( (resolve, reject) => {
            _admin.usernameTaken(c.value).subscribe(
                d => {
                    if (d.usernameExists === true) {
                        resolve({usernameTaken: true})
                    }
                    else 
                        resolve(null);
                })
        });
    }
}