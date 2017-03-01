import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  visible = false;
  
  @Input() size: number = 3;
  @Input() canEscape: boolean = false;
  @Input() hasHeader: boolean = false;
  @Input() style: string = "default";
  //@Input() hasFooter: boolean = false;
  @Input() type: string = "dialog"; // dialog vs confirm vs block
  @Output('on-open') show = new EventEmitter();
  @Output('on-close') hide = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  open()
  {
    this.visible = true;
  }

  close(){
    this.visible = false;
    this.hide.emit({
        result: false
    })
  }

  confirm(){
    this.visible = false;
    this.hide.emit({
        result: true
    });
  }
}
