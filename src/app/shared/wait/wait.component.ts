import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wait',
  templateUrl: './wait.component.html',
  styleUrls: ['./wait.component.css']
})
export class WaitComponent implements OnInit {

  @Input() visible:boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
