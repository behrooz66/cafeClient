import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  constructor(private _router: Router,
              private _auth: AuthService) { }

  ngOnInit() 
  {
      this._auth.logout();
      setTimeout(() => {
          this._router.navigate(['/account/signin']);
      }, 3000);
  }

}
