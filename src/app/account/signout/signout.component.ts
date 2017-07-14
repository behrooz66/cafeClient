import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() 
  {
      localStorage.clear();
      setTimeout(() => {
          this._router.navigate(['/account/signin']);
      }, 3000);
  }

}
