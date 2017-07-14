import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UpdatePasswordValidators } from './update-password-validators';
import { AdminService } from '../../admin/admin.service';
import { FlashMessageService } from '../../shared/flash-message/flash-message.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
  providers: [
      AdminService
  ]
})



export class UpdatePasswordComponent implements OnInit, OnDestroy
{
  sub;

  mustChangePassword: boolean = false;
  passwordChanged: boolean = false;

  model = {
      currentPassword: "",
      newPassword: "",
      repeatPassword: ""
  };

  form: FormGroup;

  @ViewChild('mWait') mWait;
  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router, 
              private _admin: AdminService,
              private _flash: FlashMessageService,
              private fb: FormBuilder) 
  { 
       this.form =  this.fb.group({
          currentPassword: ['', Validators.required, null],
          newPassword: ['', Validators.compose([Validators.required, UpdatePasswordValidators.tooShort]), null],
          repeatPassword: ['', Validators.compose([Validators.required, UpdatePasswordValidators.tooShort]), null]
       });
  }

  ngOnInit() {
    this.sub = this._activatedRoute.params.subscribe(
          params => {
              if (params["mustChangePassword"] === "True")
                  this.mustChangePassword = true;
              else  
                  this.mustChangePassword = false;
          }
      );
  }

  ngOnDestroy() 
  {
      this.sub.unsubscribe();
  }

  submit()
  {
      if (this.model.newPassword != this.model.repeatPassword){
          this._flash.addMessage("Error", "The 'new password' and the 'repeat new password' do not match", false, "danger", 2500, 2);
          return;
      }

      this.mWait.open();
      this._admin.updatePassword(this.model.currentPassword, this.model.newPassword)
          .subscribe(
              d => {
                  this.passwordChanged = true;
                  this._flash.addMessage("Success", "Password updated successfully.", true, "success", 2500, 2);
                  this.mWait.close();
                  setTimeout(() => {
                      this._router.navigate(['/customers']);
                  }, 2000);
              },
              d => {
                  if (d.status === 400)
                  {
                      this._flash.addMessage("Error", "Current password is wrong.", true, "danger", 3500, 2);
                  }
                  else {
                      this._flash.addMessage("Error", "Unable to update the password.", true, "danger", 2500, 2);
                  }
                  this.mWait.close();

                  this.model = {
                      currentPassword: "",
                      newPassword: "",
                      repeatPassword: ""
                  };
              }
          );
  }
  
}
